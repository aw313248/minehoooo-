# Field Notes v2 Vertical Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a preview-only Field Notes v2 slice with corrected route ownership, security, metadata, mobile behavior, and an upgraded cinematic editorial interface.

**Architecture:** The root layout becomes a thin global shell while homepage-only experience and schema move behind the home route. Field Notes gets route-owned metadata and structured data, a redesigned index, and targeted improvements to the shared editorial article template. Security remains isolated in the roadbook route and global response headers.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, CSS-in-JSX, next/image, Vercel preview.

---

### Task 1: Isolate the work and capture the contract

**Files:**
- Create: `docs/superpowers/specs/2026-08-16-field-notes-v2-vertical-slice-design.md`
- Create: `docs/superpowers/plans/2026-08-16-field-notes-v2-vertical-slice.md`

- [x] Create `codex/field-notes-v2` in a separate worktree based on `origin/main`.
- [x] Record visual, mobile, performance, security, SEO, QA, and preview-only acceptance criteria.
- [ ] Commit the two control documents before implementation.

### Task 2: Make route ownership explicit

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/components/home/HomeExperience.tsx`
- Create: `src/components/seo/HomeStructuredData.tsx`
- Modify: `src/app/field-notes/layout.tsx`

- [ ] Move the existing client homepage tree, `IntroScreen`, and `CustomCursor` into `HomeExperience` without changing homepage behavior.
- [ ] Move homepage-only Person, WebSite, ProfilePage, FAQPage, and VideoObject data into `HomeStructuredData` and render it from `/` only.
- [ ] Remove the root canonical and assign the homepage canonical from `src/app/page.tsx`.
- [ ] Assign `https://minehoooo.xyz/field-notes` as the Field Notes canonical and add CollectionPage/ItemList structured data based on `fieldNotes`.
- [ ] Build and inspect rendered HTML to prove that `/field-notes` contains neither IntroScreen markup nor homepage schema.

### Task 3: Secure the digest endpoint and response baseline

**Files:**
- Modify: `src/app/api/roadbook/suggest/route.ts`
- Modify: `next.config.ts`

- [ ] Require a configured `ROADBOOK_DIGEST_KEY` before servicing `region=all`.
- [ ] Compare the provided credential without logging or returning it; use 503, 401, and 200 for missing configuration, invalid credentials, and valid credentials.
- [ ] Add non-breaking baseline headers: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and frame isolation.
- [ ] Run the local server with test Redis stubs or unavailable Redis and exercise the unauthenticated branches with `curl`; inspect source control for secret leakage.
- [ ] Leave enforcement CSP out of this slice unless browser verification proves every current inline dependency works.

### Task 4: Build the Field Notes v2 index

**Files:**
- Modify: `src/app/field-notes/page.tsx`
- Optionally create: `src/components/field-notes/FieldNotesIndex.tsx`

- [ ] Preserve the current three content groups and data source.
- [ ] Implement a cinematic featured story, field index metadata, and editorial note list with stable media ratios.
- [ ] Keep filtering keyboard accessible with `aria-pressed` or valid tabs, 44px targets, and a 390px horizontal rail.
- [ ] Move affiliate promotion below the first editorial decision and keep it visually subordinate.
- [ ] Use responsive `next/image` sizes, graceful empty/loading states, and `prefers-reduced-motion` fallbacks.

### Task 5: Mature the AI crime article template

**Files:**
- Modify: `src/components/field-notes/editorial/EditorialTemplate.tsx`
- Modify only if required: `src/app/field-notes/[slug]/articles/ai-crime-film.tsx`
- Modify: `src/app/field-notes/[slug]/page.tsx`

- [ ] Keep the approved AI crime article facts and block sequence intact.
- [ ] Rework the first viewport hierarchy so the four-actions premise, proof, issue, and reading commitment are immediately legible.
- [ ] Make navigation, chapter controls, media controls, and sticky UI safe at 390/430px and with device safe areas.
- [ ] Make reveal content visible by default and enhancement-driven; respect `prefers-reduced-motion`.
- [ ] Gate video work by viewport, posters, and preload policy; remove unnecessary transform work on mobile.
- [ ] Add Article structured data using existing Field Note fields and canonical URL.

### Task 6: Integrate gates and verify

**Files:**
- Modify only the files named by the validated findings above.

- [ ] Apply Visual Director KEEP/CHANGE/DELETE decisions; reject changes that dilute the homepage visual language or prioritize promotion over content.
- [ ] Apply Mobile/Performance P0 findings and record any P1 deferrals.
- [ ] Run `npm run lint` and `npm run build`; distinguish new failures from pre-existing warnings.
- [ ] Start the production build locally and capture desktop, 390x844, and 430x932 screenshots for both routes.
- [ ] Check horizontal overflow, target sizes, focus states, reduced motion, sticky/safe-area behavior, images, and videos.
- [ ] Fetch route HTML and verify canonical/schema ownership. Exercise digest endpoint auth outcomes.
- [ ] Self-refute by checking the homepage still has its intro/schema and an unrelated Field Note still renders.

### Task 7: Publish a safe review surface

**Files:**
- No production files beyond prior tasks.

- [ ] Commit the verified implementation on `codex/field-notes-v2`.
- [ ] Deploy with a preview-only Vercel command; do not use `--prod`, merge `main`, or promote the deployment.
- [ ] Open the preview routes and confirm HTTP 200 plus canonical/schema output.
- [ ] Report the branch, commit, preview URLs, measured checks, and anything not verified. Production remains unchanged.
