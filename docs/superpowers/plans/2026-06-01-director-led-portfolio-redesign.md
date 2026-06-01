# Director-Led Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert MINEH4O into a mobile-first director portfolio that establishes MV and AIGC credibility quickly, retains Traditional Chinese context and moves full archives into dedicated routes.

**Architecture:** Replace the homepage's full-screen archive stack with a curated, normal-scroll homepage composed from small focused preview components. Preserve existing archive components and mount them on secondary routes so content is not deleted. Move navigation from page-index events to route and anchor links. Keep animation deliberately limited to hero fade, restrained text entrance, one-time metric count-up and carousel interactions.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, existing custom hooks and CSS variables, Vercel deployment.

---

## Preflight: Preserve Existing Uncommitted Hero Work

The repository currently contains an uncommitted edit in `src/components/Hero.tsx`: the mobile reach counter was changed from `500` to `5`, and the mobile content top padding was reduced from `3.5rem` to `3rem`. Before implementation, save this as a dedicated commit so redesign work is reviewable and reversible.

### Task 1: Commit the existing Hero adjustment

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Inspect the current diff**

Run:
```bash
git diff -- src/components/Hero.tsx
```
Expected: two changed lines: `500 → 5` and `3.5rem → 3rem`.

- [ ] **Step 2: Commit the existing adjustment without changing it**

Run:
```bash
git add src/components/Hero.tsx
git commit -m "fix(hero): align mobile reach label and spacing"
```
Expected: one commit containing only the pre-existing Hero diff.

---

## File Structure

Create focused homepage units:

```text
src/data/home.ts                         curated homepage content and metrics
src/components/home/SectionHeading.tsx  English heading + quiet Traditional Chinese subtitle
src/components/home/SelectedWorks.tsx   6–8 curated work cards
src/components/home/TrustStrip.tsx       one-time social-proof counters
src/components/home/AigcLabPreview.tsx   selected AI studies and LAB CTA
src/components/home/PhotoInterlude.tsx   3–5 image editorial carousel
src/components/home/AcademyPreview.tsx   free notes and coming-soon course CTA
src/components/home/AboutPreview.tsx     concise biography
src/components/home/HomeContact.tsx      compact contact CTA
src/components/Hero.tsx                  simplified director hero
src/components/Navbar.tsx                route and anchor navigation
src/app/page.tsx                         curated homepage composition
src/app/works/page.tsx                   complete video archive route
src/app/photo/page.tsx                   complete photo archive route
src/app/lab/page.tsx                     AIGC and development experiments route
src/app/academy/page.tsx                 Academy landing route
src/app/about/page.tsx                   full biography route
src/app/contact/page.tsx                 contact route
```

Existing archive files remain intact and reusable:
- `src/components/WorkVideo.tsx`
- `src/components/WorkPhotography.tsx`
- `src/components/WorkAIGC.tsx`
- `src/components/WorkProjects.tsx`
- `src/components/About.tsx`
- `src/components/Contact.tsx`

---

### Task 2: Add curated homepage data

**Files:**
- Create: `src/data/home.ts`

- [ ] **Step 1: Create typed homepage data**

Create `src/data/home.ts`:

```ts
export interface HomeWork {
  title: string;
  artist: string;
  role: string;
  youtubeId?: string;
  image?: string;
  href: string;
}

export interface HomeStudy {
  title: string;
  zh: string;
  description: string;
  descriptionZh: string;
  href: string;
  image: string;
}

export const selectedWorks: HomeWork[] = [
  { title: "ALL FOOL'S DAY", artist: "Jon Chen 陳卓", role: "DIR · DP", youtubeId: "d9_EuYkmfzM", href: "/works#music-video" },
  { title: "LUMEN", artist: "Jon Chen 陳卓", role: "DIR · DP", youtubeId: "erQ9lR_rNik", href: "/works#music-video" },
  { title: "BRING ME YOUR LOVELY", artist: "Kolli (NN)", role: "DIR · DP · AI", youtubeId: "eI1O_9jBHU0", href: "/works#music-video" },
  { title: "我也是個人", artist: "梁承煜", role: "DIR · EDIT · COLOR", youtubeId: "xKo8NW2mBso", href: "/works#music-video" },
  { title: "沒有你的世界", artist: "Lil RAD & Coy6oi", role: "DP · COLOR", youtubeId: "XJSI9s3-wk0", href: "/works#music-video" },
  { title: "AI HYBRID STUDY", artist: "MINEH4O LAB", role: "AIGC · VISUAL DEV", image: "/reels/DWnqw4KEkmf.jpg", href: "/lab" },
];

export const trustMetrics = [
  { value: 5_000_000, suffix: "+", label: "PEAK MONTHLY CONTENT VIEWS", zh: "單月內容觀看高峰" },
  { value: 50, suffix: "+", label: "PRODUCTIONS", zh: "影像製作經驗" },
  { value: 7, suffix: " YEARS", label: "CREATING VISUAL STORIES", zh: "持續創作年資" },
];

export const photoInterlude = [
  "/photos/flat/如夢似幻-1.JPG",
  "/photos/outdoor/日系1.jpg",
  "/photos/event/20240323 JOYCE純愛俱樂部-04179.JPG",
  "/photos/park2/park2-1.jpg",
  "/photos/taichung-part2/petit-1.jpg",
];

export const aigcStudies: HomeStudy[] = [
  {
    title: "PHYSICS STUDY 01",
    zh: "物理模擬測試 01",
    description: "Water interaction, camera movement and AI-directed motion.",
    descriptionZh: "水體互動、鏡頭運動與 AI 動態控制測試。",
    image: "/reels/DWnqw4KEkmf.jpg",
    href: "https://www.instagram.com/p/DYTsX9YkjQB/",
  },
  {
    title: "AI HYBRID MV",
    zh: "實拍與生成影像混合製作",
    description: "Live-action cinematography rebuilt through generative image workflows.",
    descriptionZh: "將實拍攝影導入生成式影像流程，重組超現實視覺。",
    image: "/works/liang-chengyu-i-am-human/thumb.jpg",
    href: "/lab",
  },
];
```

- [ ] **Step 2: Run lint**

Run:
```bash
npm run lint
```
Expected: no new lint error from `src/data/home.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/data/home.ts
git commit -m "feat(home): add curated portfolio content data"
```

---

### Task 3: Build reusable homepage primitives

**Files:**
- Create: `src/components/home/SectionHeading.tsx`
- Create: `src/components/home/TrustStrip.tsx`

- [ ] **Step 1: Create bilingual section heading**

Create `src/components/home/SectionHeading.tsx`:

```tsx
export default function SectionHeading({ eyebrow, title, zh }: { eyebrow?: string; title: string; zh: string }) {
  return (
    <header className="mb-8 md:mb-12">
      {eyebrow && <p className="text-[10px] tracking-[0.28em] text-white/45 mb-3">{eyebrow}</p>}
      <h2 className="text-3xl md:text-5xl text-[#F5F5F2] tracking-[-0.04em]">{title}</h2>
      <p className="mt-2 text-xs tracking-[0.18em] text-white/45">{zh}</p>
    </header>
  );
}
```

- [ ] **Step 2: Create one-time count-up trust strip**

Create `src/components/home/TrustStrip.tsx` with an IntersectionObserver and requestAnimationFrame counter. Render `trustMetrics` from `src/data/home.ts`. Each metric must animate once when the strip enters the viewport and format numbers with `toLocaleString("en-US")`. The first value must display `5,000,000+`, not `5M+`.

- [ ] **Step 3: Run lint and commit**

```bash
npm run lint
git add src/components/home/SectionHeading.tsx src/components/home/TrustStrip.tsx
git commit -m "feat(home): add bilingual headings and trust metrics"
```
Expected: lint passes or only pre-existing warnings remain.

---

### Task 4: Simplify the Hero into a director-first entry point

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Preserve the full-bleed video implementation**

Keep:
- YouTube background video `d9_EuYkmfzM`
- Muted looping playback and poster fallback
- restrained fade-in
- optional subtle mobile parallax

Remove from rendered mobile and desktop Hero markup:
- three-column stat counters
- role history lists
- repeated decorative labels
- excess REC/status UI

- [ ] **Step 2: Render the approved hero copy and CTAs**

The visible copy must be:

```tsx
<p>OSCAR LAI</p>
<h1>DIRECTOR · DP · AIGC VISUAL CREATOR</h1>
<p>Music visuals, commercial films and AI-assisted storytelling.</p>
<p>導演 · 攝影指導 · AIGC 視覺創作</p>
<a href="#selected-works">VIEW SELECTED WORKS<span>精選作品</span></a>
<a href="/contact">LET'S WORK<span>合作洽詢</span></a>
```

Use a maximum of one restrained entrance animation for the text group. Avoid individual stagger animations for every word.

- [ ] **Step 3: Validate Hero manually**

Run:
```bash
npm run dev
```
Open `http://localhost:3000` at 390×844 and desktop width. Confirm:
- representative moving image is visible immediately
- identity and both CTAs are readable
- no stat counters appear in Hero
- no horizontal overflow

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "refactor(hero): focus landing viewport on director identity"
```

---

### Task 5: Build curated homepage preview sections

**Files:**
- Create: `src/components/home/SelectedWorks.tsx`
- Create: `src/components/home/AigcLabPreview.tsx`
- Create: `src/components/home/PhotoInterlude.tsx`
- Create: `src/components/home/AcademyPreview.tsx`
- Create: `src/components/home/AboutPreview.tsx`
- Create: `src/components/home/HomeContact.tsx`

- [ ] **Step 1: Create `SelectedWorks.tsx`**

Render `selectedWorks` as a mobile-first one-column and desktop two-column editorial grid. Use YouTube thumbnails for entries with `youtubeId`, and local images otherwise. Each card contains only title, artist and role. Add `id="selected-works"` and end with:

```tsx
<a href="/works">VIEW ALL WORKS →<span>完整作品庫</span></a>
```

- [ ] **Step 2: Create `AigcLabPreview.tsx`**

Render two `aigcStudies` cards with image, English title, quiet Chinese title, English description and Chinese description. End with `/lab` CTA:

```tsx
<a href="/lab">ENTER AIGC LAB →<span>查看 AI 影像實驗</span></a>
```

- [ ] **Step 3: Create `PhotoInterlude.tsx`**

Render the five `photoInterlude` images in a horizontally scrollable strip using `overflow-x-auto`, `scroll-snap-type: x mandatory` and cards sized to reveal a portion of the next card on mobile. End with `/photo` CTA:

```tsx
<a href="/photo">VIEW PHOTO ARCHIVE →<span>查看完整攝影集</span></a>
```

- [ ] **Step 4: Create `AcademyPreview.tsx`**

Render approved bilingual Academy copy and two CTAs:

```tsx
<a href="/academy#notes">FREE NOTES<span>免費筆記</span></a>
<a href="/academy#courses">COURSES — COMING SOON<span>課程籌備中</span></a>
```

- [ ] **Step 5: Create concise About and Contact previews**

`AboutPreview.tsx` must stay within 120 Traditional Chinese characters and link to `/about`. `HomeContact.tsx` must display email, Instagram, supported collaboration types and a `/contact` CTA.

- [ ] **Step 6: Run lint and commit**

```bash
npm run lint
git add src/components/home
git commit -m "feat(home): add curated director portfolio sections"
```

---

### Task 6: Compose the new homepage and remove archive stacking

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace full archive composition**

Replace imports and render order so `src/app/page.tsx` contains:

```tsx
<LangProvider>
  <Navbar />
  <main className="bg-[#090909]">
    <Hero />
    <SelectedWorks />
    <TrustStrip />
    <AigcLabPreview />
    <PhotoInterlude />
    <AcademyPreview />
    <AboutPreview />
    <HomeContact />
  </main>
</LangProvider>
```

Remove homepage mounting of `PageScroll`, `WorkPhotography`, `WorkVideo`, `WorkAIGC`, `WorkProjects`, `About`, `Contact`, `MobileNav`, `AudioPlayer`, `AutoPlay` and `VersionBadge`.

- [ ] **Step 2: Run lint and manually verify normal scrolling**

```bash
npm run lint
npm run dev
```
Expected:
- Homepage scrolls naturally rather than snapping through full-screen archives.
- Homepage shows no complete work archive.
- Each preview CTA leads to the intended route path, even before route pages are created.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "refactor(home): replace archive stack with curated landing page"
```

---

### Task 7: Replace event-based homepage navigation with route navigation

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Replace page-index links**

Use route links:

```ts
const links = [
  { label: "WORKS", zh: "作品", href: "/works" },
  { label: "AIGC LAB", zh: "AI 實驗", href: "/lab" },
  { label: "PHOTO", zh: "攝影", href: "/photo" },
  { label: "ACADEMY", zh: "教學", href: "/academy" },
  { label: "ABOUT", zh: "關於", href: "/about" },
];
```

Keep a standalone `/contact` CTA:

```tsx
<a href="/contact">LET'S WORK<span>合作洽詢</span></a>
```

On mobile, keep one menu trigger and render links inside a drawer. Remove `navto` custom-event logic from `Navbar.tsx`.

- [ ] **Step 2: Validate touch targets**

At mobile width, confirm drawer controls and links are at least 44px tall and no tiny pill navigation remains over the hero.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "refactor(nav): route visitors through focused portfolio sections"
```

---

### Task 8: Create secondary archive and ecosystem routes

**Files:**
- Create: `src/app/works/page.tsx`
- Create: `src/app/photo/page.tsx`
- Create: `src/app/lab/page.tsx`
- Create: `src/app/academy/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create archive route shells from existing components**

Each route must include a simple back link and reuse existing components:

```tsx
// src/app/works/page.tsx
import WorkVideo from "@/components/WorkVideo";
export default function WorksPage() { return <main className="bg-black"><a href="/">← MINEH4O</a><WorkVideo /></main>; }
```

Use:
- `/photo` → `WorkPhotography`
- `/lab` → `WorkAIGC`, then `WorkProjects` under `OTHER EXPERIMENTS / 其他實驗`
- `/about` → `About`
- `/contact` → `Contact`

- [ ] **Step 2: Create Academy placeholder route**

Render a polished bilingual route with:
- `ACADEMY / AI 影像教學`
- short explanation of free notes, production breakdowns and upcoming courses
- six-part AI filmmaking course teaser
- `COURSES — COMING SOON / 課程籌備中`
- contact link for workshop collaboration

Do not add checkout or CMS.

- [ ] **Step 3: Validate all routes**

Run:
```bash
npm run lint
npm run dev
```
Visit:
```text
http://localhost:3000/
http://localhost:3000/works
http://localhost:3000/photo
http://localhost:3000/lab
http://localhost:3000/academy
http://localhost:3000/about
http://localhost:3000/contact
```
Expected: each route renders and contains a visible path back to `/`.

- [ ] **Step 4: Commit**

```bash
git add src/app
git commit -m "feat(routes): split archives lab academy and contact from homepage"
```

---

### Task 9: Polish mobile UX and remove template-like leftovers

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/home/*.tsx`

- [ ] **Step 1: Apply visual tokens**

Ensure consistent tokens:

```css
:root {
  --portfolio-bg: #090909;
  --portfolio-surface: #141414;
  --portfolio-text: #f5f5f2;
  --portfolio-muted: #8a8a86;
  --portfolio-accent: #c6a15b;
}
```

- [ ] **Step 2: Remove excess motion and decoration**

Inspect the homepage at 390×844 and desktop width. Remove remaining homepage-only repeated glow, REC/status decoration, dense tag clouds and simultaneous entrance animations. Preserve archive interactions on secondary pages.

- [ ] **Step 3: Verify accessibility basics**

Confirm:
- images have meaningful alt text
- interactive targets are at least 44px on mobile
- white and muted text remain readable against `#090909`
- focus styles are visible for keyboard navigation
- `prefers-reduced-motion` disables non-essential animation

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/components/Hero.tsx src/components/Navbar.tsx src/components/home
git commit -m "style(home): polish cinematic editorial portfolio experience"
```

---

### Task 10: Production verification and Vercel deployment

**Files:**
- Verify: all files modified above

- [ ] **Step 1: Run lint**

```bash
npm run lint
```
Expected: exit code 0 or only explicitly documented pre-existing warnings.

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: Next.js build completes without TypeScript, lint or route rendering errors.

- [ ] **Step 3: Check git status**

```bash
git status --short
```
Expected: no uncommitted source changes.

- [ ] **Step 4: Deploy**

```bash
vercel --prod
```
Expected: deployment aliases to `https://minehoooo.vercel.app`.

- [ ] **Step 5: Verify production**

Check at desktop and mobile width:
- `/` establishes Oscar as `DIRECTOR · DP · AIGC VISUAL CREATOR`
- Hero contains both CTAs and no stat grid
- trust strip displays `5,000,000+`
- homepage archive previews route correctly
- `/works`, `/photo`, `/lab`, `/academy`, `/about`, `/contact` load
- Instagram-originated mobile traffic can navigate without tiny controls or horizontal overflow

- [ ] **Step 6: Commit deployment metadata only if changed**

```bash
git status --short
```
If Vercel modified tracked metadata, review and commit only intentional files.

---

## Plan Self-Review

### Spec coverage
- Director-first positioning: Tasks 4, 6 and 9
- English-first with quiet Traditional Chinese subtitles: Tasks 3, 5, 7 and 8
- Curated homepage and archived content routes: Tasks 5, 6 and 8
- Trust metrics after work, with `5,000,000+`: Tasks 2 and 3
- AIGC LAB and Other Experiments split: Tasks 5 and 8
- Photography interlude and full photo archive: Tasks 5 and 8
- Academy preview and placeholder route: Tasks 5 and 8
- Reduced animation density: Tasks 4 and 9
- Mobile-first UX: Tasks 4, 5, 7, 9 and 10

### Deferred intentionally
- Paid checkout
- Academy CMS
- Automated AIGC publishing
- New hero asset production

### Pre-existing dirty state
- `src/components/Hero.tsx` must be committed separately in Task 1 before redesign edits.
