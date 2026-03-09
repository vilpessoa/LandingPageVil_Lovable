

## Fix PDF text overlap — capture each section-block as a separate page

### Root Cause
The current `generatePDF.ts` captures the entire `.print-page` as one tall canvas and blindly slices it every 297mm. But the content doesn't align perfectly to A4 boundaries, so the slicer cuts through text, causing overlap between pages.

### Solution
Instead of capturing one giant canvas and slicing, **capture each `.section-block` individually** and place each on its own PDF page. This respects the natural page boundaries already defined in the PrintPage layout.

### Changes

**`src/app/utils/generatePDF.ts`** — Replace the single-canvas-slice approach:
1. After rendering, query all `.section-block` elements inside `.print-page`
2. Loop through each section-block, call `html2canvas` on each one individually
3. Add each captured canvas as a separate PDF page, scaling to fit A4 width (210mm) and positioning at top
4. If a section is taller than A4, fall back to slicing just that section
5. Remove the old full-canvas + slice logic entirely

**`src/app/pages/PrintPage.tsx`** — Ensure each logical page is a separate `.section-block`:
- The structure already has this correctly (Page 1: Hero+Metrics, Page 2: About+TechStack, Pages 3+: Project pairs, Last: Philosophy+Contact)
- Each has `page-break` class — no changes needed here

### Key code change (generatePDF.ts):
```typescript
const sections = printPage.querySelectorAll(".section-block");
for (let i = 0; i < sections.length; i++) {
  if (i > 0) pdf.addPage();
  const canvas = await html2canvas(sections[i] as HTMLElement, { scale: 2, ... });
  const imgWidth = PAGE_WIDTH_MM;
  const imgHeight = (canvas.height / canvas.width) * imgWidth;
  pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, imgWidth, imgHeight);
}
```

This eliminates all overlap issues since each section is captured and placed independently.

