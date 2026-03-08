

# Plan: Replace jsPDF with Print-to-PDF Approach

## Problem
The current jsPDF-based PDF generator produces garbled text (e.g., "Python" → "mython", "SQL" → "Sni") because jsPDF's built-in fonts lack proper glyph support. Charts are crude lines instead of the rich Recharts visuals on the site. The output looks nothing like the landing page.

## Solution
Replace the jsPDF approach with a **dedicated print page** (`/print`) that renders all landing page sections in a print-optimized layout. The download button opens this page in a new window and triggers `window.print()`, which uses the browser's native PDF engine — producing perfect text, colors, and layout.

This approach:
- Uses the **exact same data** from `DataContext`
- Renders the **same content** as the landing page (Hero, Metrics, About, Stack, Projects, Philosophy, Contact)
- Applies `@media print` and `@page` CSS for proper A4 pagination, dark background, no margins
- The browser's PDF renderer handles fonts, Unicode, and colors flawlessly

## Changes

### 1. Create `src/app/pages/PrintPage.tsx`
- A standalone page that renders all portfolio sections sequentially
- Each section wrapped in a container with `page-break-after: always` or `page-break-inside: avoid`
- Static rendering (no animations, no intersection observers, no hover states)
- Dark background (#0F172A / #111827) preserved via `-webkit-print-color-adjust: exact`
- Recharts charts rendered statically (they work in print since they're SVG)
- Auto-triggers `window.print()` after rendering, then closes the window

### 2. Add print route to `src/app/routes.tsx`
- Add `/print` route pointing to `PrintPage`

### 3. Update `HeroSection.tsx` and `ContactSection.tsx`
- Replace `generatePDF(data)` calls with `window.open('/print', '_blank')`
- Remove `generating` state and Loader2 spinner (print is instant)

### 4. Delete `src/app/utils/generatePDF.ts`
- No longer needed

### 5. Print CSS in `PrintPage.tsx`
- `@page { size: A4; margin: 0; }`
- `body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }`
- Force dark backgrounds to print (browsers strip backgrounds by default without this)
- Each section fills roughly one A4 page with proper breaks

## Page Structure
```text
Page 1: Hero (name, title, subtitle, availability badge, contact info)
Page 2: Metrics (4 cards in 2x2 grid)
Page 3: About (text + highlights + chart via Recharts SVG)
Page 4: Stack (3 columns with skill bars + extra techs)
Page 5+: Projects (1 per page, with problem/solution/result + metrics)
Last:   Philosophy (quote + principles) + Contact info
```

## Technical Details
- Recharts `<AreaChart>` renders as SVG which prints natively — no canvas conversion needed
- All text uses real browser fonts (Inter, Space Grotesk, JetBrains Mono) — no glyph issues
- `print-color-adjust: exact` forces dark backgrounds in print mode
- `window.print()` triggers after a short delay to ensure Recharts renders

