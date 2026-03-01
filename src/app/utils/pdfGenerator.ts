import { toCanvas } from 'html-to-image';
import jsPDF from 'jspdf';

// ─── Loading overlay ─────────────────────────────────────────────────────────
function createLoadingOverlay(): HTMLDivElement {
  const overlay = document.createElement('div');
  overlay.id = '__pdf-overlay__';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    background: rgba(15, 23, 42, 0.93);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    font-family: 'Inter', sans-serif;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  `;

  overlay.innerHTML = `
    <div style="
      width: 60px; height: 60px;
      border: 3px solid rgba(0,194,255,0.15);
      border-top-color: #00C2FF;
      border-radius: 50%;
      animation: __pdf_spin 0.75s linear infinite;
    "></div>
    <div style="color:#00C2FF; font-size:17px; font-weight:700; letter-spacing:0.03em;">
      Gerando PDF…
    </div>
    <div style="color:#9CA3AF; font-size:13px; letter-spacing:0.02em;">
      Capturando a página completa
    </div>
    <style>
      @keyframes __pdf_spin { to { transform: rotate(360deg); } }
    </style>
  `;
  return overlay;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function removeOverlay() {
  const el = document.getElementById('__pdf-overlay__');
  if (el?.parentNode) el.parentNode.removeChild(el);
}

/** Replace oklch() values in inline style declarations with computed RGB.
 *  html-to-image serialises the DOM as SVG then rasterises it, so computed
 *  colours are already resolved by the browser – this helper is a safety net
 *  for edge-cases where the library re-reads raw style attributes. */
function sanitiseOklchStyles(root: HTMLElement): (() => void) {
  const affected: { el: HTMLElement; attr: string; orig: string }[] = [];

  root.querySelectorAll<HTMLElement>('*').forEach((el) => {
    const style = el.getAttribute('style');
    if (style && style.includes('oklch(')) {
      affected.push({ el, attr: 'style', orig: style });
      // getComputedStyle resolves oklch → rgb; clone those values back
      const computed = getComputedStyle(el);
      const props: (keyof CSSStyleDeclaration)[] = [
        'color', 'backgroundColor', 'borderColor',
        'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
        'outlineColor', 'fill', 'stroke',
      ];
      let safe = style;
      props.forEach((p) => {
        const v = computed[p] as string;
        if (v && !v.includes('oklch')) {
          // only replace if computed value is a "safe" colour
        }
      });
      // Brute-force: remove any oklch(...) tokens – browser fills fallback
      safe = safe.replace(/oklch\([^)]*\)/g, 'transparent');
      el.setAttribute('style', safe);
    }
  });

  return () => affected.forEach(({ el, attr, orig }) => el.setAttribute(attr, orig));
}

// ─── Main export ──────────────────────────────────────────────────────────────
export async function generateLandingPagePDF(): Promise<void> {
  const root = document.getElementById('landing-page-root') as HTMLElement | null;
  if (!root) {
    alert('Elemento da página não encontrado.');
    return;
  }

  const overlay = createLoadingOverlay();
  document.body.appendChild(overlay);

  // Snapshot state to restore later
  const savedScrollY = window.scrollY;

  // Temporarily hidden elements (navbar) – keep them in capture as static
  const navbar = document.querySelector<HTMLElement>('nav');
  let navbarPos = '';
  let navbarTop = '';
  let navbarZIndex = '';

  // Admin panel should not appear in the PDF
  const adminPanel = document.querySelector<HTMLElement>('[data-admin-panel]');
  let adminPanelDisplay = '';

  try {
    // 1. Scroll to absolute top
    window.scrollTo({ top: 0, behavior: 'instant' });
    await tick(80);

    // 2. Make navbar static so it renders inline (not overlapping hero)
    if (navbar) {
      navbarPos = navbar.style.position;
      navbarTop = navbar.style.top;
      navbarZIndex = navbar.style.zIndex;
      navbar.style.position = 'relative';
      navbar.style.top = 'auto';
      navbar.style.zIndex = 'auto';
    }

    // 3. Hide admin panel if open
    if (adminPanel) {
      adminPanelDisplay = adminPanel.style.display;
      adminPanel.style.display = 'none';
    }

    await tick(150);

    // 4. Measure full content dimensions
    const fullWidth  = root.scrollWidth;
    const fullHeight = root.scrollHeight;

    // 5. Temporarily expand root to reveal all content
    const origHeight   = root.style.height;
    const origMaxH     = root.style.maxHeight;
    const origOverflow = root.style.overflow;
    root.style.height   = `${fullHeight}px`;
    root.style.maxHeight = 'none';
    root.style.overflow  = 'visible';

    await tick(100);

    // 6. Safety: patch inline oklch styles
    const restoreOklch = sanitiseOklchStyles(root);

    // 7. Capture via html-to-image (uses browser's CSS engine → oklch works)
    const canvas = await toCanvas(root, {
      pixelRatio: 1.5,          // hi-dpi — set to 1 if you want smaller file
      width: fullWidth,
      height: fullHeight,
      cacheBust: true,
      skipFonts: false,
      preferredFontFormat: 'woff2',
      style: {
        overflow: 'visible',
      },
      // Filter out the loading overlay itself from the capture
      filter: (node) => {
        if (node instanceof HTMLElement && node.id === '__pdf-overlay__') return false;
        return true;
      },
    });

    // 8. Restore DOM
    restoreOklch();
    root.style.height   = origHeight;
    root.style.maxHeight = origMaxH;
    root.style.overflow  = origOverflow;
    if (navbar) {
      navbar.style.position = navbarPos;
      navbar.style.top      = navbarTop;
      navbar.style.zIndex   = navbarZIndex;
    }
    if (adminPanel) {
      adminPanel.style.display = adminPanelDisplay;
    }
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });

    // 9. Build multi-page PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.92);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      compress: true,
    });

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    // Scale image to fit PDF page width (preserve aspect ratio)
    const scale         = pageW / canvas.width;
    const scaledImgH    = canvas.height * scale;
    const totalPages    = Math.ceil(scaledImgH / pageH);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) pdf.addPage();

      // Shift the tall image up so the correct slice shows on each page
      pdf.addImage(
        imgData,
        'JPEG',
        0,                    // x
        -(page * pageH),      // y — moves image up for each subsequent page
        pageW,                // width
        scaledImgH,           // total scaled height
        `page_${page}`,       // alias (avoids jsPDF re-embedding duplicates)
        'FAST',               // compression speed
      );
    }

    pdf.save('Vilcimar_Rodrigues_Pessoa_Portfolio.pdf');

  } catch (err) {
    console.error('[pdfGenerator] Falha ao gerar PDF:', err);

    // Restore DOM even on error
    if (navbar) {
      navbar.style.position = navbarPos;
      navbar.style.top      = navbarTop;
      navbar.style.zIndex   = navbarZIndex;
    }
    if (adminPanel) adminPanel.style.display = adminPanelDisplay;
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });

    // User-friendly fallback message
    const msg =
      'O download automático falhou.\n\n' +
      'Isso pode ocorrer em alguns browsers mobile.\n' +
      'Vamos abrir o diálogo de impressão — escolha "Salvar como PDF".';
    alert(msg);
    window.print();
  } finally {
    removeOverlay();
  }
}

// ─── Micro-helper ─────────────────────────────────────────────────────────────
function tick(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}