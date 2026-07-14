/* Review Package generator — walkthrough videos, fullpage screenshots,
   route report, console/network error collection, HTML snapshot, assets manifest.

   Site mechanics (from src/components/PageScroll.tsx):
   - Homepage = 8 fullscreen sections in a position:fixed wrapper; wheel scrolls the
     current section's inner div, flips page at boundary (950ms pageDip transition)
   - `navto` CustomEvent jumps to a section index; ArrowDown/Up flips pages
   - Other routes (/field-notes, articles) scroll a normal overflow container */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'https://minehoooo.vercel.app';
const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const FIELD_NOTES = ['seedance-aerial', 'wulu-concept-film', 'ai-crime-film', 'kino-iphone-guide', 'vienna-griechenbeisl', 'guruwalk'];
const WORKS = ["liang-chengyu-i-am-human","liang-chengyu-keep-moving-forward","chen-zhuo-all-fools-day","chen-zhuo-lumen","chen-zhuo-aperture","chen-zhuo-deprived","bring-me-your-lovely","tiang-remember-to-be-happy","lil-rad-no-you","lil-rad-love-me-not","lil-rad-loving-after-all","say-it","tedxnthu-2025","cpbl-all-star-taiwolf-2025","66-central-deep-love","dalow-badass-dance","house-rules","taichung-how-long","taichung-228","taichung-aigc-train","toy-story-aigc","miles-morales-aigc","going-down-aigc","sweet-potato-ball-aigc","children-need-superheroes","lil-rad-knew-it-earlier","her-slope"];
const ALL_ROUTES = ['/', '/video', '/works', '/field-notes', '/tools/higgsfield-seedance',
  ...FIELD_NOTES.map(s => `/field-notes/${s}`), ...WORKS.map(s => `/works/${s}`)];

const report = { generatedAt: new Date().toISOString(), base: BASE, routes: [], consoleErrors: {}, failedRequests: {}, notFound: [], responses: [] };

function attachCollectors(page, key) {
  report.consoleErrors[key] = report.consoleErrors[key] || [];
  report.failedRequests[key] = report.failedRequests[key] || [];
  page.on('console', msg => {
    if (msg.type() === 'error') report.consoleErrors[key].push(msg.text().slice(0, 500));
  });
  page.on('requestfailed', req => {
    report.failedRequests[key].push({ url: req.url().slice(0, 300), error: req.failure()?.errorText });
  });
  page.on('response', res => {
    try {
      const len = Number(res.headers()['content-length'] || 0);
      report.responses.push({ url: res.url(), status: res.status(), bytes: len, type: res.request().resourceType() });
      if (res.status() === 404) report.notFound.push({ page: key, url: res.url() });
    } catch {}
  });
}

// ── helpers ──────────────────────────────────────────────────────────────

// Homepage section wrapper divs = children of the fixed-inset container
const HOME_SECTIONS = `(() => {
  const wrap = [...document.querySelectorAll('div')].find(d => {
    const s = d.getAttribute('style') || '';
    return s.includes('fixed') && s.includes('inset') && s.includes('hidden');
  });
  return wrap ? [...wrap.children].filter(c => c.tagName === 'DIV') : [];
})`;

async function trackPageIndex(page) {
  await page.evaluate(() => {
    window.__page = 0;
    window.addEventListener('pagechange', e => { window.__page = e.detail; });
  });
}

async function navtoSection(page, i) {
  await page.evaluate(idx => window.dispatchEvent(new CustomEvent('navto', { detail: idx })), i);
  await page.waitForTimeout(1500); // 950ms transition + settle
}

// Real input gesture — wheel on desktop, touch on mobile emulation
async function makeGesture(page) {
  const cdp = await page.context().newCDPSession(page);
  const vp = page.viewportSize();
  return async (dy = 800) => {
    await cdp.send('Input.synthesizeScrollGesture', {
      x: Math.floor(vp.width / 2), y: Math.floor(vp.height / 2),
      xDistance: 0, yDistance: -dy, speed: 1500, preventFling: true,
    });
  };
}

// Smooth-scroll a normal route's overflow container via rAF
const FIND_SCROLLER = `(() => {
  const cands = [document.scrollingElement, ...document.querySelectorAll('div')].filter(Boolean);
  let best = document.scrollingElement, max = 0;
  for (const e of cands) {
    if (e.scrollHeight > e.clientHeight + 50 && e.clientHeight > 300) {
      const oy = e === document.scrollingElement ? 'auto' : getComputedStyle(e).overflowY;
      if (oy === 'auto' || oy === 'scroll') { if (e.scrollHeight > max) { max = e.scrollHeight; best = e; } }
    }
  }
  return best;
})`;

async function smoothScrollRoute(page, maxMs = 35000) {
  await page.evaluate(async ({ finder, maxMs }) => {
    const el = eval(finder)();
    const dist = el.scrollHeight - el.clientHeight - el.scrollTop;
    if (dist <= 0) return;
    const ms = Math.min(maxMs, Math.max(8000, dist / 0.5));
    const start = el.scrollTop, t0 = performance.now();
    await new Promise(res => {
      const step = t => {
        const p = Math.min((t - t0) / ms, 1);
        el.scrollTop = start + dist * p;
        p < 1 ? requestAnimationFrame(step) : res();
      };
      requestAnimationFrame(step);
    });
  }, { finder: FIND_SCROLLER, maxMs });
  await page.waitForTimeout(800);
}

async function tryHover(page, selector, n, pause) {
  try {
    const els = page.locator(selector);
    const count = Math.min(await els.count(), n);
    for (let i = 0; i < count; i++) {
      await els.nth(i).hover({ timeout: 2000 });
      await page.waitForTimeout(pause);
    }
  } catch {}
}

function contextOptions(mode, extra = {}) {
  const isMobile = mode === 'mobile';
  return {
    viewport: isMobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    ...(isMobile ? {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
      deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    } : {}),
    ...extra,
  };
}

// ── walkthrough video ────────────────────────────────────────────────────

async function walkthrough(browser, mode) {
  const isMobile = mode === 'mobile';
  const viewport = contextOptions(mode).viewport;
  const ctx = await browser.newContext(contextOptions(mode, { recordVideo: { dir: path.join(OUT, `_video_${mode}`), size: viewport } }));
  const page = await ctx.newPage();
  attachCollectors(page, `${mode}:walkthrough`);
  const gesture = await makeGesture(page);

  // 1. Homepage — hero opening, then wheel/touch through the section theater
  await page.goto(BASE + '/', { waitUntil: 'load', timeout: 45000 });
  await trackPageIndex(page);
  await page.waitForTimeout(5000);
  if (!isMobile) await tryHover(page, 'header a, nav a', 5, 600);
  let lastIdx = 0, stuck = 0;
  for (let i = 0; i < 26; i++) {
    await gesture(isMobile ? 700 : 800);
    await page.waitForTimeout(1100);
    const idx = await page.evaluate(() => window.__page ?? 0);
    if (idx === lastIdx) { stuck++; } else { stuck = 0; lastIdx = idx; }
    if (stuck >= 5) { await page.keyboard.press('ArrowDown'); await page.waitForTimeout(1300); stuck = 0; }
    const done = await page.evaluate(sections => {
      const secs = eval(sections)();
      return (window.__page ?? 0) >= secs.length - 1;
    }, HOME_SECTIONS);
    if (done) { await page.waitForTimeout(1500); break; }
  }

  // 2. Field notes list
  await page.goto(BASE + '/field-notes', { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(2500);
  if (!isMobile) await tryHover(page, 'main a', 3, 700);
  await smoothScrollRoute(page, 15000);

  // 3. Latest article
  await page.goto(BASE + '/field-notes/ai-crime-film', { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(3000);
  await smoothScrollRoute(page, 35000);
  await page.waitForTimeout(1500);

  await ctx.close();
  const dir = path.join(OUT, `_video_${mode}`);
  const webm = fs.readdirSync(dir).find(f => f.endsWith('.webm'));
  fs.renameSync(path.join(dir, webm), path.join(OUT, `${mode}-walkthrough.webm`));
  fs.rmSync(dir, { recursive: true, force: true });
  console.log(`${mode} walkthrough recorded`);
}

// ── fullpage screenshot: navto each section, tile its inner scroll ───────

async function fullpageShot(browser, mode) {
  const ctx = await browser.newContext(contextOptions(mode));
  const page = await ctx.newPage();
  attachCollectors(page, `${mode}:fullpage`);
  await page.goto(BASE + '/', { waitUntil: 'load', timeout: 45000 });
  await trackPageIndex(page);
  await page.waitForTimeout(4500);

  const sectionCount = await page.evaluate(s => eval(s)().length, HOME_SECTIONS);
  const tileDir = path.join(OUT, `_tiles_${mode}`);
  fs.rmSync(tileDir, { recursive: true, force: true });
  fs.mkdirSync(tileDir, { recursive: true });
  const manifest = []; // { file, cropPx (CSS px to keep from bottom; 0 = full) }
  let t = 0;

  for (let s = 0; s < sectionCount; s++) {
    if (s > 0) await navtoSection(page, s);
    // lazy-load: sweep the section's inner scroll once, then return to top
    const dims = await page.evaluate(async ({ sections, idx }) => {
      const el = eval(sections)()[idx];
      for (let y = 0; y < el.scrollHeight; y += 600) { el.scrollTop = y; await new Promise(r => setTimeout(r, 100)); }
      el.scrollTop = 0;
      return { sh: el.scrollHeight, ch: el.clientHeight };
    }, { sections: HOME_SECTIONS, idx: s });
    await page.waitForTimeout(900);

    const steps = Math.max(1, Math.ceil(dims.sh / dims.ch));
    for (let i = 0; i < steps; i++) {
      const y = Math.min(i * dims.ch, dims.sh - dims.ch);
      await page.evaluate(({ sections, idx, y }) => { eval(sections)()[idx].scrollTop = y; }, { sections: HOME_SECTIONS, idx: s, y });
      await page.waitForTimeout(600);
      const file = `t${String(t++).padStart(3, '0')}.png`;
      await page.screenshot({ path: path.join(tileDir, file) });
      const isLast = i === steps - 1;
      const rem = dims.sh - (steps - 1) * dims.ch;
      manifest.push({ file, cropPx: isLast && steps > 1 && rem < dims.ch ? rem : 0 });
    }
  }
  fs.writeFileSync(path.join(tileDir, 'manifest.json'), JSON.stringify({ vh: contextOptions(mode).viewport.height, tiles: manifest }));

  if (mode === 'desktop') {
    // HTML snapshot + assets manifest (homepage, all sections visited)
    fs.writeFileSync(path.join(OUT, 'page.html'), await page.content());
    const assets = await page.evaluate(() => {
      const pick = (sel, attr) => [...document.querySelectorAll(sel)].map(e => e.getAttribute(attr)).filter(Boolean);
      return {
        images: pick('img', 'src'), imageSrcsets: pick('img', 'srcset').slice(0, 50),
        videos: pick('video source, video', 'src'), posters: pick('video', 'poster'),
        scripts: pick('script', 'src'), stylesheets: pick('link[rel="stylesheet"]', 'href'),
        preloads: pick('link[rel="preload"]', 'href'),
      };
    });
    fs.writeFileSync(path.join(OUT, 'assets-manifest.json'), JSON.stringify(assets, null, 2));
  }
  await ctx.close();
  console.log(`${mode} fullpage tiles captured (${t} tiles, ${sectionCount} sections)`);
}

async function routeStatus(browser) {
  const ctx = await browser.newContext();
  for (const route of ALL_ROUTES) {
    try {
      const res = await ctx.request.get(BASE + route, { timeout: 20000 });
      report.routes.push({ route, status: res.status() });
    } catch (e) {
      report.routes.push({ route, status: 'ERROR', error: String(e).slice(0, 200) });
    }
  }
  await ctx.close();
  console.log('route status done');
}

(async () => {
  const only = process.argv[3]; // "walkthrough" | "fullpage" | undefined = all
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  if (!only) await routeStatus(browser);
  if (only !== 'walkthrough') {
    await fullpageShot(browser, 'desktop');
    await fullpageShot(browser, 'mobile');
  }
  if (only !== 'fullpage') {
    await walkthrough(browser, 'desktop');
    await walkthrough(browser, 'mobile');
  }
  await browser.close();

  const seen = new Map();
  for (const r of report.responses) if (!seen.has(r.url) || seen.get(r.url).bytes < r.bytes) seen.set(r.url, r);
  report.responses = [...seen.values()].sort((a, b) => b.bytes - a.bytes).slice(0, 40);
  fs.writeFileSync(path.join(OUT, only ? `_raw-report-${only}.json` : '_raw-report.json'), JSON.stringify(report, null, 2));
  console.log('ALL DONE');
})().catch(e => { console.error(e); process.exit(1); });
