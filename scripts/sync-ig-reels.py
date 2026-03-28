#!/usr/bin/env python3
"""
sync-ig-reels.py
----------------
自動抓取 minehoooo IG 最新 Reels，更新 WorkVideo.tsx 的 igReelsData，
下載縮圖到 public/reels/，並輸出 changed=true 供 GitHub Actions 判斷是否 commit。

使用方式：
  python3 scripts/sync-ig-reels.py
  python3 scripts/sync-ig-reels.py --dry-run   # 只印出結果，不寫檔案
"""

import subprocess, json, sys, os, re, shutil
from pathlib import Path

# ── 設定 ────────────────────────────────────────────────────────────────────
IG_ACCOUNTS   = ["minehoooo.arw", "mlpon6"]   # 要監控的帳號
MAX_REELS     = 6                              # 作品集最多顯示幾則 Reels
PLAYLIST_URL  = "https://www.instagram.com/{account}/reels/"
REPO_ROOT     = Path(__file__).parent.parent
THUMB_DIR     = REPO_ROOT / "public" / "reels"
COMPONENT     = REPO_ROOT / "src" / "components" / "WorkVideo.tsx"
DRY_RUN       = "--dry-run" in sys.argv

# ── 工具函式 ────────────────────────────────────────────────────────────────
def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)

def yt_dlp(*args):
    return run(["python3", "-m", "yt_dlp", *args])

def get_reels_from_account(account):
    """用 yt-dlp 抓帳號 Reels 清單（只取 metadata，不下載影片）"""
    url = PLAYLIST_URL.format(account=account)
    r = yt_dlp(
        "--flat-playlist",
        "--print", '{"id":"%(id)s","title":"%(title)s","like_count":%(like_count)d,"comment_count":%(comment_count)d}',
        "--playlist-end", "20",
        "--no-warnings",
        url,
    )
    reels = []
    for line in r.stdout.strip().splitlines():
        line = line.strip()
        if not line or not line.startswith("{"):
            continue
        try:
            obj = json.loads(line)
            obj["account"] = account
            # like_count 可能是 None/-1（非公開數據），設為 0
            if not isinstance(obj.get("like_count"), int) or obj["like_count"] < 0:
                obj["like_count"] = 0
            reels.append(obj)
        except json.JSONDecodeError:
            continue
    return reels

def shorten_title(title: str) -> str:
    """把 yt-dlp 抓到的長標題截短為適合顯示的標籤（最多 12 字）"""
    # 去掉 hashtag
    title = re.sub(r'#\S+', '', title).strip()
    # 去掉純英文 + 符號行
    if re.match(r'^[\x00-\x7F\s]+$', title):
        return title[:18].strip() or "Reel"
    return title[:12].strip() or "Reel"

def download_thumbnail(code: str) -> bool:
    """下載單則 Reel 的縮圖到 public/reels/{code}.jpg，回傳是否成功"""
    dest = THUMB_DIR / f"{code}.jpg"
    if dest.exists():
        return True  # 已存在
    if DRY_RUN:
        print(f"  [dry-run] would download thumbnail: {code}")
        return True
    THUMB_DIR.mkdir(parents=True, exist_ok=True)
    tmp = THUMB_DIR / f"_tmp_{code}"
    r = yt_dlp(
        "--write-thumbnail",
        "--skip-download",
        "--convert-thumbnails", "jpg",
        "-o", str(tmp) + ".%(ext)s",
        f"https://www.instagram.com/p/{code}/",
    )
    # yt-dlp 會把檔名加副檔名
    for f in THUMB_DIR.glob(f"_tmp_{code}*"):
        shutil.move(str(f), str(dest))
        return True
    return False

def read_current_codes() -> list:
    """從 WorkVideo.tsx 讀出現有的 igReelsData code 清單"""
    text = COMPONENT.read_text()
    m = re.search(r'const igReelsData\s*=\s*\[(.*?)\];', text, re.DOTALL)
    if not m:
        return []
    block = m.group(1)
    return re.findall(r'code:\s*"([^"]+)"', block)

def write_component(new_reels: list):
    """把新的 igReelsData 陣列寫回 WorkVideo.tsx"""
    text = COMPONENT.read_text()

    lines = []
    for r in new_reels:
        lines.append(
            f'  {{ code: "{r["id"]}", label: "{shorten_title(r["title"])}", '
            f'likes: {r["like_count"]}, account: "{r["account"]}" }},'
        )
    new_block = "const igReelsData = [\n" + "\n".join(lines) + "\n];"

    text = re.sub(
        r'const igReelsData\s*=\s*\[.*?\];',
        new_block,
        text,
        flags=re.DOTALL,
    )
    if not DRY_RUN:
        COMPONENT.write_text(text)
    print("  Updated igReelsData in WorkVideo.tsx")

# ── 主流程 ──────────────────────────────────────────────────────────────────
def main():
    print("=== sync-ig-reels ===")
    print(f"Accounts: {IG_ACCOUNTS}")

    # 1. 抓所有帳號的 Reels
    all_reels = []
    for acct in IG_ACCOUNTS:
        print(f"\n→ Fetching {acct}...")
        reels = get_reels_from_account(acct)
        print(f"  Found {len(reels)} reels")
        all_reels.extend(reels)

    if not all_reels:
        print("\nNo reels found — possible rate limit or login required. Exiting.")
        # 輸出 changed=false 給 GitHub Actions
        if "GITHUB_OUTPUT" in os.environ:
            with open(os.environ["GITHUB_OUTPUT"], "a") as f:
                f.write("changed=false\n")
        sys.exit(0)

    # 2. 排序：按讚數 desc，取前 MAX_REELS
    all_reels.sort(key=lambda x: x.get("like_count", 0), reverse=True)
    top_reels = all_reels[:MAX_REELS]

    print(f"\nTop {MAX_REELS} reels by likes:")
    for r in top_reels:
        print(f"  {r['id']} | {r['like_count']} likes | {r['title'][:30]} | @{r['account']}")

    # 3. 比對現有清單
    current_codes = read_current_codes()
    new_codes     = [r["id"] for r in top_reels]
    changed = current_codes != new_codes

    print(f"\nCurrent codes: {current_codes}")
    print(f"New codes:     {new_codes}")
    print(f"Changed: {changed}")

    # 4. 下載新縮圖
    for r in top_reels:
        code = r["id"]
        if code not in current_codes:
            print(f"\n  Downloading thumbnail for new reel: {code}")
            ok = download_thumbnail(code)
            print(f"  {'OK' if ok else 'FAILED'}")
        else:
            # 確保縮圖存在
            download_thumbnail(code)

    # 5. 更新 component（若有變動）
    if changed:
        print("\nWriting updated igReelsData...")
        write_component(top_reels)
    else:
        print("\nNo changes needed.")

    # 6. 輸出結果給 GitHub Actions
    if "GITHUB_OUTPUT" in os.environ:
        with open(os.environ["GITHUB_OUTPUT"], "a") as f:
            f.write(f"changed={'true' if changed else 'false'}\n")

    print("\n=== done ===")

if __name__ == "__main__":
    main()
