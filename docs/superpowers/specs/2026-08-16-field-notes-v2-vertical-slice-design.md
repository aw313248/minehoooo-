# Field Notes v2 Vertical Slice Design

## Outcome

Upgrade `/field-notes` and `/field-notes/ai-crime-film` into one mature editorial system while preserving the portfolio homepage's black, cinematic, director-led character. The slice must feel faster and clearer on mobile, remove homepage-only behavior from non-home routes, fix the confirmed metadata and API security defects, and remain preview-only until explicit production approval.

## Creative direction

The system is **cinematic precision**: near-black surfaces, documentary images, restrained warm-white typography, technical monospace labels, and one deliberate amber signal color. It borrows Apple/DJI's hierarchy and product clarity, not their surface styling. The memorable device is a visible **field index**: issue number, discipline, reading time, and a direct promise of what the reader will learn.

The index is a browsing surface: dense enough to compare notes, but each card has one primary message and one clear next action. The article is a reading surface: a strong thesis in the first viewport, a compact chapter rail, media that loads only when useful, and explicit transitions from process to proof to next note.

## Architecture

- Keep the root layout limited to global fonts, global metadata defaults, analytics, and children.
- Render `IntroScreen`, `CustomCursor`, homepage preload/preconnect hints, and homepage structured data only on `/`.
- Give `/field-notes` its own canonical URL and collection metadata. Keep per-article canonical metadata in `generateMetadata`.
- Keep Field Notes data in `src/data/fieldNotes.ts`; the index consumes a small client filter rather than moving the full page shell into a client component.
- Reuse the existing block content for `ai-crime-film`, but mature the shared `EditorialTemplate` visual language and mobile behavior rather than forking the article.
- Require `ROADBOOK_DIGEST_KEY` for `region=all`; missing configuration is unavailable, and missing or incorrect credentials are unauthorized.

## Page design

### `/field-notes`

- First viewport: label, title, one-sentence promise, count, and a featured note with a cinematic still.
- Filters remain small and purposeful: All, AI, Travel. They are 44px touch targets and behave as a horizontal rail on narrow screens.
- Remaining notes use an editorial index: issue/date/category, strong title, short payoff, and a media frame with stable aspect ratio.
- Affiliate promotion cannot outrank the featured editorial content and moves after the first content decision.

### `/field-notes/ai-crime-film`

- First viewport explains the premise immediately: four actions shot at home became a crime film.
- Preserve the current source-backed block content and media; improve hierarchy, navigation, reduced-motion behavior, touch targets, safe areas, and media loading.
- Desktop TOC remains secondary. Mobile gets a compact chapter affordance without a permanent obstructive bar.
- Auto-playing loops are muted, `playsInline`, and viewport-gated. Non-hero videos are click-to-play with posters or metadata-only preload.

## Mobile and performance contract

- Validate at 390x844 and 430x932 in Chromium mobile emulation, plus Safari-specific CSS reasoning for `100svh`/`100dvh`, safe-area insets, sticky stacking, and video attributes.
- Interactive targets are at least 44px. No horizontal page overflow. Text remains readable without pinch zoom.
- Respect `prefers-reduced-motion`; decorative reveals cannot hide content when scripting or observers fail.
- The Field Notes index hero image has explicit responsive `sizes`; below-fold media is lazy. No homepage intro/cursor JavaScript appears on Field Notes routes.

## Security and SEO contract

- `region=all` returns 503 when the digest secret is absent, 401 for missing/incorrect credentials, and data only for a valid credential.
- Add only security headers that can be verified without breaking the existing site. Do not enforce a CSP until current inline script/style requirements are inventoried and tested.
- `/` owns Person, WebSite, ProfilePage, FAQPage, and portfolio VideoObject schema. `/field-notes` owns CollectionPage/ItemList schema. The article owns Article schema.
- Canonicals must be exactly `/`, `/field-notes`, and `/field-notes/ai-crime-film` for the three relevant pages.

## Proof

- `npm run lint` and `npm run build` complete with no new errors.
- Route-level HTML inspection confirms canonical and schema ownership.
- Local API requests prove all three digest-key states.
- Browser screenshots and interaction checks pass at desktop, 390px, and 430px; mobile and security work lines sign off.
- A Vercel preview URL is created from `codex/field-notes-v2`; production is unchanged.

## Scope boundary

This slice does not redesign the portfolio homepage, migrate every Field Note article, introduce search, add a CMS, or enforce CSP. Shared-template changes must not intentionally alter article content. Production promotion requires a separate explicit instruction.
