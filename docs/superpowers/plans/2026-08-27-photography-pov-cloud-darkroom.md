# Photography POV Cloud Darkroom Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an isolated, mobile-first scroll prototype that moves from a curtain reveal into a five-work camera selector without changing the live homepage Hero, About, or Photography section.

**Architecture:** Add a dedicated `/concepts/photography-pov` route backed by one focused client component, one CSS module, and one small typed data file. The approved generated still is a temporary visual layer; real portfolio images and HTML copy form the content layer so SeaArt assets can replace the still later without changing interaction code.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, CSS Modules, existing static assets

---

## File structure

- Create `src/app/concepts/photography-pov/page.tsx` — route metadata and prototype entry
- Create `src/app/concepts/photography-pov/photography-pov.module.css` — responsive composition, sticky scroll stages, transitions, reduced motion
- Create `src/components/concepts/PhotographyPovPrototype.tsx` — scroll progress, stage selection, keyboard and click interaction
- Create `src/data/photographyPov.ts` — five real portfolio selections and labels
- Add `public/concepts/photography-pov/world-placeholder-v1.png` — approved temporary world frame

The production homepage files remain unchanged in this plan

### Task 1: Add the approved temporary world asset and typed work data

**Files:**
- Add: `public/concepts/photography-pov/world-placeholder-v1.png`
- Create: `src/data/photographyPov.ts`

- [ ] **Step 1: Copy the approved concept frame without deleting its generated source**

Copy:

```text
/Users/minehoooo/.codex/generated_images/019fb120-0b4c-7be0-97a1-a01c9a15d394/exec-a86b40e5-1c40-4f35-8edf-34048fe181e6.png
```

To:

```text
public/concepts/photography-pov/world-placeholder-v1.png
```

- [ ] **Step 2: Add exactly five real work records**

Create `src/data/photographyPov.ts` with this public interface and values:

```ts
export interface PhotographyPovWork {
  id: string;
  index: string;
  title: string;
  meta: string;
  image: string;
  href: string;
}

export const photographyPovWorks: PhotographyPovWork[] = [
  {
    id: "joyce",
    index: "01",
    title: "JOYCE 純愛俱樂部",
    meta: "SPECIAL SESSION · 2024",
    image: "/photos/event/20240323%20JOYCE%E7%B4%94%E6%84%9B%E4%BF%B1%E6%A8%82%E9%83%A8-00672.JPG",
    href: "/?section=photo",
  },
  {
    id: "fine-art",
    index: "02",
    title: "平面攝影精選",
    meta: "FINE ART PHOTOGRAPHY",
    image: "/photos/flat/%E5%A6%82%E5%A4%A2%E4%BC%BC%E5%B9%BB-1.JPG",
    href: "/?section=photo",
  },
  {
    id: "outdoor",
    index: "03",
    title: "戶外人像",
    meta: "OUTDOOR PORTRAIT",
    image: "/photos/outdoor/%E6%97%A5%E7%B3%BB1.jpg",
    href: "/?section=photo",
  },
  {
    id: "park2",
    index: "04",
    title: "PARK2 國際親吻日",
    meta: "CAMPAIGN PHOTOGRAPHY · 2025",
    image: "/photos/park2/park2-1.jpg",
    href: "/?section=photo",
  },
  {
    id: "wedding",
    index: "05",
    title: "婚禮紀實",
    meta: "WEDDING DOCUMENTARY · 2024",
    image: "/photos/wedding/wedding-1.jpg",
    href: "/?section=photo",
  },
];
```

- [ ] **Step 3: Verify all six assets exist**

Run a file-existence check for the placeholder and five referenced portfolio images

Expected: six paths reported, zero missing paths

- [ ] **Step 4: Commit**

```bash
git add public/concepts/photography-pov/world-placeholder-v1.png src/data/photographyPov.ts
git commit -m "feat: add photography POV prototype assets"
```

### Task 2: Build the mobile-first scroll interaction

**Files:**
- Create: `src/components/concepts/PhotographyPovPrototype.tsx`
- Create: `src/app/concepts/photography-pov/photography-pov.module.css`

- [ ] **Step 1: Implement one sticky scene with six narrative beats**

The component must:

- use a single `section` with a tall scroll track and sticky `100svh` scene
- calculate normalized progress from the section bounding box in a requestAnimationFrame-throttled scroll handler
- derive the active work from five equal intervals after the reveal beats
- render the world placeholder as a decorative background
- render the current real portfolio image in a camera-screen portal
- rotate a CSS dial by `activeIndex * 36deg`
- expose five 44px minimum buttons for direct work selection
- accept ArrowUp, ArrowDown, ArrowLeft, and ArrowRight while the prototype is focused
- link the expanded selected work back to `/?section=photo`

Use this stage model:

```ts
const REVEAL_END = 0.22;
const CAMERA_END = 0.38;
const SELECTOR_START = 0.4;
const SELECTOR_END = 0.88;

function workIndexFromProgress(progress: number, count: number) {
  const local = Math.max(0, Math.min(0.999, (progress - SELECTOR_START) / (SELECTOR_END - SELECTOR_START)));
  return Math.min(count - 1, Math.floor(local * count));
}
```

The camera portal is initially positioned over the temporary camera screen, then grows into a centered work card after `progress > SELECTOR_END`

- [ ] **Step 2: Implement the visual hierarchy in the CSS module**

Required mobile rules:

```css
.track { min-height: 620svh; background: #050505; }
.sticky { position: sticky; top: 0; height: 100svh; overflow: clip; }
.world { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.contentSafe { padding: max(24px, env(safe-area-inset-top)) 20px calc(88px + env(safe-area-inset-bottom)); }
```

Required visual hierarchy:

- one small eyebrow for `PHOTOGRAPHY POV`
- one short instruction that changes from `拉開窗簾` to `往下滑，轉動作品`
- the active title set in real HTML, not inside the image
- a restrained `01 / 05` counter
- no global grain layer inside the route
- no rounded glass dashboard cards

Required desktop rules at `min-width: 900px`:

- world image occupies the left 58 percent in a tall cinematic crop
- active work and copy occupy the right 42 percent
- the same progress and keyboard model remain active

- [ ] **Step 3: Add reduced-motion behavior**

Under `prefers-reduced-motion: reduce`:

- remove parallax, dial rotation transitions, and flash transition
- keep all text and work buttons visible
- make direct selection immediate

- [ ] **Step 4: Run lint on the new files**

Run:

```bash
npx eslint src/components/concepts/PhotographyPovPrototype.tsx src/data/photographyPov.ts
```

Expected: zero ESLint errors

- [ ] **Step 5: Commit**

```bash
git add src/components/concepts/PhotographyPovPrototype.tsx src/app/concepts/photography-pov/photography-pov.module.css
git commit -m "feat: build photography POV scroll prototype"
```

### Task 3: Add the isolated concept route

**Files:**
- Create: `src/app/concepts/photography-pov/page.tsx`

- [ ] **Step 1: Create route metadata and render the prototype**

```tsx
import type { Metadata } from "next";
import PhotographyPovPrototype from "@/components/concepts/PhotographyPovPrototype";

export const metadata: Metadata = {
  title: "Photography POV Concept — MINEH4O",
  description: "Mobile-first photography portfolio interaction concept",
  robots: { index: false, follow: false },
};

export default function PhotographyPovConceptPage() {
  return <PhotographyPovPrototype />;
}
```

- [ ] **Step 2: Verify the production homepage imports remain byte-for-byte unchanged**

Run:

```bash
git diff 6bb0c31 -- src/app/page.tsx src/components/Hero.tsx src/components/About.tsx src/components/WorkPhotography.tsx
```

Expected: no output

- [ ] **Step 3: Commit**

```bash
git add src/app/concepts/photography-pov/page.tsx
git commit -m "feat: expose photography POV concept route"
```

### Task 4: Build and rendered viewport QA

**Files:**
- Modify only if QA exposes a defect in the three new source files

- [ ] **Step 1: Run the production build**

Run:

```bash
npm run build
```

Expected: successful Next.js build with `/concepts/photography-pov` listed as a route

- [ ] **Step 2: Start the existing development server and load the exact route**

Check:

```text
http://localhost:3000/concepts/photography-pov
```

Expected: HTTP 200 and no runtime overlay

- [ ] **Step 3: Inspect the rendered mobile viewport at 390 × 844**

Confirm:

- initial prompt and curtain are visible
- vertical swipe advances the scene
- all five works appear in order
- counter and title remain inside the viewport
- the bottom 72px remains free of critical controls
- no horizontal overflow

- [ ] **Step 4: Inspect the rendered desktop viewport at 1440 × 900**

Confirm:

- world and work content use the two-column composition
- no stretched portrait image fills the entire width
- keyboard arrows change the selected work
- the selected card link is reachable

- [ ] **Step 5: Check reduced motion**

Emulate `prefers-reduced-motion: reduce`

Expected: all five direct-selection buttons work without parallax or dial tweening

- [ ] **Step 6: Self-refute the prototype**

Attempt a fast scroll, reverse scroll, viewport rotation, direct selection, and reload in the middle of the route

Expected: no blank frame, trapped scroll, duplicated work, or unreadable title

### Task 5: Publish the isolated prototype

- [ ] **Step 1: Push the clean prototype commits**

Push only after Tasks 1–4 pass

- [ ] **Step 2: Verify the Vercel deployment is READY**

Expected: deployment status `READY`

- [ ] **Step 3: Load the public concept URL**

Expected route:

```text
https://minehoooo.vercel.app/concepts/photography-pov
```

If the production alias is not updated for an isolated preview branch, return the verified Vercel preview URL instead

- [ ] **Step 4: Stop before homepage integration**

The user reviews the public concept first

Only after approval should a new plan replace `WorkPhotography` and remove the isolated prototype surface
