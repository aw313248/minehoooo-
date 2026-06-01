# MINEH4O Portfolio Repositioning Design

Date: 2026-06-01
Status: Draft for user review

## 1. Objective
Rebuild MINEH4O from a generalist archive into a director-led commercial portfolio that converts visitors into collaboration inquiries while preserving Oscar Lai's wider creative ecosystem.

Primary position:
> Oscar Lai is a director and DP who combines live-action cinematography with AIGC to build artist worlds, music visuals and commercial films.

Commercial focus: music videos and artist visuals, commercial films, AIGC-assisted visual production.

## 2. Audience
Primary: artists, managers, labels, producers, brands and creative agencies. Secondary: AI filmmaking learners, collaborators and photography visitors.

## 3. Brand Strategy
Establish trust in order: credible director with taste; measurable reach and production experience; differentiated AIGC capability; wider experiments and educational work through dedicated subpages. AIGC is a differentiator, not a replacement for the director identity.

## 4. Language Strategy
Use English as dominant visual language. Add small Traditional Chinese labels beneath key headings and CTAs.

Examples:
```
SELECTED WORKS
精選作品

AIGC LAB
AI 影像實驗室

LET'S WORK
合作洽詢
```
Chinese labels are subordinate: smaller, quieter and lower contrast. Do not translate every paragraph line by line.

## 5. Site Architecture
Desktop navigation:
```
WORKS · AIGC LAB · PHOTO · ACADEMY · ABOUT                 LET'S WORK
```
Mobile: compact logo and one menu trigger.

Routes:
- `/` — director-led homepage
- `/works` — complete video and commercial archive
- `/photo` — complete photography archive
- `/lab` — AIGC studies, workflows and selected development experiments
- `/academy` — free notes, workshops and paid courses
- `/about` — expanded biography and credits
- `/contact` — collaboration inquiry information

## 6. Homepage Structure
The homepage is curated. It is not the complete archive.

### 6.1 Hero
- Full-bleed muted looping excerpt from strongest representative work, initially `All Fool's Day`
- Minimal cinematic overlay
- Copy:
```
OSCAR LAI
DIRECTOR · DP · AIGC VISUAL CREATOR
Music visuals, commercial films and AI-assisted storytelling.
導演 · 攝影指導 · AIGC 視覺創作
```
- CTAs: `VIEW SELECTED WORKS`, `LET'S WORK`
- Remove hero stat grid, excess micro-tags, template-like REC overlays and competing animations.
- Keep video fade-in, restrained typography entrance and optional subtle parallax if performant.

### 6.2 Selected Works
Display 6–8 curated projects: four MV or artist visual cases, one commercial film, one documentary/live case and two AIGC cases. Each card shows preview, title, artist/client and relevant role only. End with `VIEW ALL WORKS →` and small `完整作品庫`.

### 6.3 Trust Strip
Place after selected work. Animate once on entering viewport:
```
5,000,000+
PEAK MONTHLY CONTENT VIEWS
單月內容觀看高峰

50+
PRODUCTIONS
影像製作經驗

7 YEARS
CREATING VISUAL STORIES
持續創作年資
```
Confirm that `5,000,000+` accurately represents peak monthly content views before launch.

### 6.4 AIGC Lab Preview
Show 2–3 selected studies, including Higgsfield physics and water interaction. Each card includes short loop or poster, title, tool/technique and one-sentence intent. CTA: `ENTER AIGC LAB →` / `查看 AI 影像實驗`.

### 6.5 Photography Interlude
Photography is aesthetic proof, not primary service. Show 3–5 strongest photos in a horizontal editorial strip or carousel. CTA: `VIEW PHOTO ARCHIVE →` / `查看完整攝影集`.

### 6.6 Academy Preview
Reserve space for monetization:
```
ACADEMY
AI filmmaking workflows, prompt design and production breakdowns.
AI 影像製作流程、提示詞設計與實戰拆解。
```
CTAs: `FREE NOTES`, `COURSES — COMING SOON`.

### 6.7 About Preview
Limit homepage biography to 80–120 Chinese characters plus a short English version. Move education, tools and long biography to `/about`.

### 6.8 Contact
Keep email, Instagram, collaboration CTA and service categories only.

## 7. Secondary Pages
### `/works`
Complete archive grouped by Music Video, Commercial, Documentary / Live and Narrative. Use carousels or grids by density. Preserve playback.

### `/photo`
Complete photography archive with category selector, mobile-first swipe carousel, desktop 2–3 images per view and lightbox.

### `/lab`
Two subsections:
1. `AIGC LAB`: AI films, workflows, prompt/tool experiments, before/after comparisons.
2. `OTHER EXPERIMENTS`: CareCub and selected software builds.
Development projects must not appear in the homepage main conversion path.

### `/academy`
Free notes and public breakdowns for authority building; paid courses and workshops for monetization. Initial concept: six-part production-oriented AI filmmaking workflow course.

## 8. Animation System
Keep: hero video fade-in, minimal text reveal, one-time metric count-up, card hover/swipe feedback, lightbox transitions, restrained haptics and subtle parallax if performant.
Remove or reduce: simultaneous entrances, repeated glow, excess REC/status decorations and template-like motion.

## 9. Visual System
Cinematic, editorial and restrained.
- Background: `#090909`
- Elevated surface: `#141414`
- Primary text: `#F5F5F2`
- Secondary text: `#8A8A86`
- Accent: warm gold used sparingly

Use large display type for identity and section titles. Use monospaced tracked uppercase only as metadata. Increase chapter whitespace and reduce card metadata density.

## 10. Mobile Requirements
Instagram mobile traffic is primary. Strong image or video must be visible immediately. Use readable hero copy, one clear navigation trigger, touch targets at least 44px, next-card hints where helpful and no long text before work.

## 11. Migration Notes
- Simplify existing Hero.
- Move full photography carousel to `/photo`; homepage gets curated subset.
- Move full WorkVideo archive to `/works`; homepage gets curated cards.
- Use WorkAIGC as basis for `/lab`.
- Move WorkProjects into `/lab` under Other Experiments.
- Move full About to `/about`; homepage gets preview.
- Simplify Contact.

## 12. First Implementation Scope
Implement: homepage restructure, navigation update, curated sections, secondary route shells using existing content, trust strip, reduced animation density and Chinese subtitle treatment.

Defer: paid checkout, full Academy CMS, automated AI publishing, advanced analytics and production of new hero assets.

## 13. Acceptance Criteria
- Position understood within five seconds.
- First viewport contains moving image, identity and two CTAs.
- Homepage contains no full archives.
- Key headings and CTAs include quiet Traditional Chinese labels.
- Trust metrics appear after selected work and animate once.
- AIGC reads as a credible production differentiator.
- Photography supports rather than competes with director identity.
- Software projects and educational content have dedicated routes.
