# Cinematic Upgrade — Phase 3: Compiled Spec

## External Library Decision
- 不新增任何套件（GSAP 不裝）。全部用 CSS transition/animation + 既有 React state
- framer-motion 已在依賴中但本案不需要 — 轉場由 PageScroll 的 state machine 驅動

## 1. PageScroll.tsx — 統一轉場
刪除 6-variant `getStyle`，改為單一文法：

```ts
// 出場 (offset<0): opacity 0, scale 1.035, 0.95s cubic-bezier(0.45,0,0.25,1)
// 進場前 (offset>0): opacity 0, scale 0.965
// 現行 (offset=0): opacity 1, scale 1, zIndex 20
// 非相鄰: opacity 0, pointerEvents none
```

黑幕 dip 層（新增，在 pages 之上、page-nav 之下）：
```tsx
<div key={page} aria-hidden style={{ position:"fixed", inset:0, zIndex:50,
  background:"#000", pointerEvents:"none",
  animation: mounted ? "pageDip 0.95s cubic-bezier(0.45,0,0.25,1)" : "none" }} />
```
```css
@keyframes pageDip { 0%{opacity:0} 42%{opacity:0.72} 100%{opacity:0} }
```
- `key={page}` 讓每次換頁重播動畫；首次 mount 用 ref 跳過（不要一進站就閃黑）

## 2. Hero.tsx — 放映開始
Letterbox（Desktop + Mobile 各自 section 內）：
```tsx
// 上下兩條，position absolute，z 30，background #000
// height: 11vh (desktop) / 8vh (mobile)
// open 條件: iframeReady && loaded，delay 0.4s
// transform: scaleY(1) → scaleY(0)，transform-origin 上條 top / 下條 bottom
// transition: transform 1.6s cubic-bezier(0.45,0,0.25,1) 0.4s
```
調色：iframe filter 由 `brightness(0.5) saturate(0.95)` 改為
`brightness(0.48) contrast(1.06) saturate(0.9)`（加一點對比＝更像調光後的畫面）

桌面滑鼠視差（HeroDesktop）：
```ts
// mousemove → nx,ny ∈ -1..1（rAF throttle）
// 影片 wrapper: translate(nx*14px, ny*14px)，transition transform 1s ease-out
// 內容層: translate(nx*-6px, ny*-6px)（反向＝深度）
// iframe wrapper 已有 inset -8% bleed，±14px 不會露邊
```

## 3. 全站 grain — page.tsx
```tsx
// PageScroll 之後兄弟節點，fixed inset-0，zIndex 90，pointerEvents none
// backgroundImage: 既有 SVG fractalNoise data-URI（同 Hero CTA 用的 tile）
// backgroundSize 140px，opacity 0.05，mixBlendMode "overlay"
// animation: grainShift 1.2s steps(10) infinite（keyframes 已存在於 globals.css）
```
- prefers-reduced-motion 由 globals.css 全域規則自動處理（動畫降為 0.01ms）

## 4. 不做的事（防混亂）
- 不引入 350vh scroll-scrub（推翻 paged shell）
- 不動各 section 內部構圖與既有互動
- 不新增第二種轉場、不新增新色彩

## 驗證清單（Phase 4）
- [ ] 換頁：任兩頁互切都是同一種 dip 溶接，無舊 clip-path 殘留
- [ ] 首次載入不閃黑幕
- [ ] Hero letterbox 開場一次、不重播；影片就緒前黑條蓋住 iframe 載入白閃
- [ ] 桌面滑鼠移動有視差、無露邊
- [ ] grain 全站可見但不干擾閱讀（4%）
- [ ] console 無錯誤
