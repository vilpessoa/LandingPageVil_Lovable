

## Problem
The `<a download="...">` approach doesn't work reliably across all browsers and devices — especially on mobile and within iframe-based previews. The file either doesn't download or opens incorrectly.

## Solution
Create a helper function that uses `fetch()` + `Blob` + programmatic click to force a real download. This is the most reliable cross-platform approach.

### Changes

**1. Create `src/app/utils/downloadFile.ts`**
A utility function that:
- Fetches `/Vilcimar_Portfolio.pdf` as a blob
- Creates a temporary object URL
- Programmatically clicks a hidden `<a>` element with the `download` attribute
- Cleans up the object URL after download

**2. Update `HeroSection.tsx`**
- Replace the `<a href download>` with a `<button>` that calls the download utility on click

**3. Update `ContactSection.tsx`**
- Same change as HeroSection — use the download utility instead of native `<a download>`

This approach works on desktop, mobile (iOS Safari, Android Chrome), and inside iframe previews.
