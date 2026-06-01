/**
 * Article body for `seedance-aerial`
 * Trigger word for IG/Threads bot: 飛天小女警
 */

export default function SeedanceAerialBody() {
  return (
    <div className="article-prose">
      <style>{`
        .article-prose { font-size: 15.5px; line-height: 1.85; color: rgba(255,255,255,0.88); }
        .article-prose p { margin: 0 0 1.1em; }
        .article-prose h2 { font-size: 1.35rem; line-height: 1.4; margin: 2.2em 0 .7em; padding-top: 1.2em; border-top: 1px solid rgba(255,255,255,0.08); color: #fff; font-weight: 500; }
        .article-prose h2:first-of-type { padding-top: 0; border-top: none; margin-top: 1em; }
        .article-prose ul { margin: 0 0 1.2em; padding-left: 1.4em; }
        .article-prose li { margin: .35em 0; }
        .article-prose strong { color: #fff; }
        .article-prose figure { margin: 1.6em 0; }
        .article-prose figcaption { font-size: .85rem; color: rgba(255,255,255,0.5); margin-top: .6em; text-align: center; }
        .article-prose .callout {
          border-left: 3px solid rgba(255,210,70,0.7);
          background: linear-gradient(90deg, rgba(255,210,70,0.07), transparent);
          padding: 1em 1.2em;
          margin: 1.4em 0;
          border-radius: 0 12px 12px 0;
          color: rgba(255,235,180,0.92);
          font-size: 14.5px;
        }
        .article-prose .callout strong { color: rgba(255,225,140,1); }
        .article-prose pre {
          background: #0a0a0a;
          color: rgba(255,255,255,0.92);
          padding: 1.2em 1.3em;
          border-radius: 12px;
          overflow-x: auto;
          font-size: 13.5px;
          line-height: 1.7;
          border: 1px solid rgba(255,255,255,0.08);
          margin: 1em 0 1.4em;
        }
        .article-prose pre code {
          font-family: "SF Mono", Menlo, Consolas, monospace;
          white-space: pre-wrap;
        }
        .article-prose .label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          margin: 1.4em 0 .5em;
        }
        .article-prose video {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 16px;
          background: #050505;
        }
      `}</style>

      <p>
        在 MINE，我們相信 AI 不是取代攝影，而是把「一個畫面的想像」變成「一段會動的鏡頭」。這篇用最常見的空拍題材示範：
        你只需要一張空拍遠景照，丟進 Seedance，配上對的 Prompt，就能生出一段平穩、有電影感的空拍運鏡。
        以下是我們實際在用的完整流程。
      </p>

      {/* Demo video */}
      <figure>
        <video src="/field-notes/seedance-demo.mp4" autoPlay muted loop playsInline />
        <figcaption>成品示範：從一張靜態空拍圖生成的鏡頭運動</figcaption>
      </figure>

      <h2>Step 1：準備一張空拍遠景圖</h2>
      <p>起始圖決定一切。一張適合動畫化的空拍遠景圖，通常有這三個特徵：</p>
      <ul>
        <li><strong>明確的前中後景層次</strong>（近的崖邊、中段的海灣、遠方的山）— 有層次，運鏡才有穿越的空間感</li>
        <li><strong>乾淨的地平線與天空</strong> — AI 比較不會在天空亂生雜物</li>
        <li><strong>足夠的解析度與細節</strong> — 圖糊，影片一定糊</li>
      </ul>

      <h2>Step 2：標出運鏡路徑（兩個一定要注意的重點）</h2>
      <p>決定好畫面後，我們會先在圖上「畫一條路徑線」，想像空拍機要怎麼飛、鏡頭怎麼移動。這一步有兩個地方一定要注意：</p>

      <div className="callout">
        <strong>⚠️ 重點 1：上傳前一定要去掉紅色畫筆路徑。</strong>
        <br />
        規劃時你可以在圖上畫線來想像運鏡，但真正上傳給 Seedance 的那張圖必須是乾淨的。因為這張圖會被當成影片的「起始幀」—— 圖上留著紅線，紅線就會被一起動畫進影片裡，整段就毀了。
      </div>

      <div className="callout">
        <strong>⚠️ 重點 2：畫面主色是紅色時，路徑改用其他顏色。</strong>
        <br />
        如果你的空拍畫面本身就以紅色為主（夕陽、紅土、楓紅⋯），規劃用的路徑線就別用紅色，改用藍、綠或黃。這樣你才分得清哪些是畫面、哪些是標記，事後也才擦得乾淨。
      </div>

      <h2>Step 3：寫 Seedance Prompt</h2>
      <p>空拍片的靈魂是「攝影機怎麼動」。我們寫 Prompt 的結構固定六層：</p>
      <ul>
        <li><strong>場景（WHERE）</strong>：在哪、什麼時間</li>
        <li><strong>攝影機運動（核心）</strong>：起始位置 → 怎麼移動 → 結束位置</li>
        <li><strong>動態元素</strong>：海浪、雲影、草浪 —— 讓畫面活起來</li>
        <li><strong>光線</strong>：時間與方向（黃金時刻、低角度光）</li>
        <li><strong>風格質感</strong>：寫實、電影調色</li>
        <li><strong>限制</strong>：不要文字、不要任何路徑線</li>
      </ul>
      <p>下面是一組可以直接用的範本，方括號 [ ] 的地方換成你自己的場景：</p>

      <p className="label">PROMPT — 貼進 Seedance / Higgsfield 用</p>
      <pre><code>{`Cinematic aerial drone shot over [a rugged coastline at golden hour]. The camera starts low near [the cliff edge], then smoothly rises and pushes forward, revealing [the wide bay and distant mountains] beyond. One continuous, stable gimbal flight. [Waves roll against the rocks, sea mist drifts, grass sways in the wind]. Warm low-angle sunlight, long soft shadows, light haze in the distance. Photorealistic, high dynamic range, filmic color grade. No text, no drawn lines, no colored brush strokes or path markers in frame.`}</code></pre>

      <p className="label">中文翻譯 — 你看懂用的</p>
      <pre><code>{`電影級空拍鏡頭，飛越〔黃金時刻的崎嶇海岸線〕。
鏡頭從〔崖邊附近的低空〕開始，平穩上升並向前推進，
揭露後方〔開闊海灣與遠方山脈〕。
一鏡到底、雲台穩定飛行。
〔海浪拍打礁石、海霧飄移、草被風吹動〕。
溫暖的低角度陽光、柔長的影子、遠方薄霧。
寫實、高動態範圍、電影感調色。
畫面中不要文字、不要任何畫筆線條、不要彩色路徑標記。`}</code></pre>

      <p>注意最後一句 — 我們把「不要路徑線」也寫進 Prompt 裡，當作雙重保險。</p>

      <h2>Step 4：生成時的實作小提醒</h2>
      <ul>
        <li>把<strong>乾淨的那張空拍圖</strong>上傳當起始幀（Image reference），Seedance 才會動畫你這個真實場景，而不是自己亂生</li>
        <li>一次生成上限 15 秒，空拍運鏡通常一鏡到底最穩</li>
        <li>同一組 Prompt 多跑幾版（3–5 版）再挑，剪輯時才有選擇</li>
        <li>一次只改一個變數（先改運鏡、再改光線），才知道是哪裡變好或變壞</li>
      </ul>

      <h2>附錄：空拍常用運鏡速查</h2>
      <ul>
        <li><strong>Push-in 推進</strong>：向主體前進，建立張力</li>
        <li><strong>Pull-back reveal 拉遠揭露</strong>：後退拉開，揭露全景</li>
        <li><strong>Orbit 環繞</strong>：繞著主體飛，強調立體與規模</li>
        <li><strong>Fly-over 飛越</strong>：低空掠過地形</li>
        <li><strong>Top-down descend 俯視下降</strong>：正上方往下，幾何感最強</li>
        <li><strong>Parallax tracking 視差跟拍</strong>：側向平移，前後景錯位移動</li>
      </ul>

      <p style={{ marginTop: "2em", fontSize: "14px", color: "rgba(255,255,255,0.55)" }}>
        未來只要有新的 AI 影像工具、Prompt 心法與實作教學，都會在這裡與 IG 同步更新。喜歡這篇的話，記得追蹤我們，別錯過下一篇。
      </p>
    </div>
  );
}
