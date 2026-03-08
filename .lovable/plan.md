

# Plan: Optimize Print PDF — Avoid Print Page & Consolidate Content

## Two Issues to Fix

### 1. Avoid opening a separate page
Instead of `window.open('/print')`, we'll render the print content as a **hidden div** on the same page and use `window.print()` with `@media print` CSS that hides the landing page and shows only the print layout. This avoids opening a new tab entirely.

### 2. Consolidate pages to eliminate empty space
Current layout wastes space because each section forces a full A4 page (`min-height: 1123px`) even when content is short. The fix:

- **Merge Hero + Metrics** into Page 1 — Hero content is compact, metrics fit below it
- **Keep About** as Page 2 (text + chart fills it well)
- **Keep Tech Stack** as Page 3 (already dense)
- **Merge Projects** — fit 2 projects per page instead of 1 per page (projects are compact enough)
- **Keep Philosophy + Contact** as last page

Remove `min-height: 1123px` from `.page` and instead use `page-break-inside: avoid` on section blocks, letting the browser's print engine handle pagination naturally. Only use explicit `page-break-after: always` where a hard break is truly needed.

### Changes

**1. `src/app/pages/PrintPage.tsx`**
- Remove `min-height: 1123px` from `.page` class
- Merge Hero + Metrics into a single page block
- Render projects 2 per page (use `page-break-inside: avoid` on each project card)
- Remove forced `page-break-after: always` from every section; use `page-break-inside: avoid` instead
- Keep hard page breaks only between major groups: after Hero+Metrics, after About, after Stack, after all Projects

**2. `src/app/pages/LandingPage.tsx`**
- Import and render `PrintPage` as a hidden div (`display: none` on screen, visible on print)
- Add `@media print` CSS: hide `.landing-content`, show `.print-content`

**3. `src/app/components/HeroSection.tsx` & `ContactSection.tsx`**
- Replace `window.open('/print', '_blank')` with `window.print()` directly

**4. `src/app/routes.tsx`**
- Keep `/print` route as fallback but it's no longer the primary flow

