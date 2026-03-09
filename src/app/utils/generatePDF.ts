import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { createRoot } from "react-dom/client";
import { createElement } from "react";

const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const RENDER_WIDTH_PX = 794; // A4 width at ~96dpi

export async function generatePDF(fileName?: string): Promise<void> {
  // Dynamically import PrintPage and DataProvider to avoid circular deps
  const { PrintPage } = await import("../pages/PrintPage");
  const { DataProvider } = await import("../context/DataContext");

  // Create hidden container in the main DOM (not an iframe)
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = `${RENDER_WIDTH_PX}px`;
  container.style.zIndex = "-9999";
  container.style.opacity = "0";
  container.style.pointerEvents = "none";
  container.style.overflow = "hidden";
  document.body.appendChild(container);

  let root: ReturnType<typeof createRoot> | null = null;

  try {
    // Render PrintPage directly in the current document
    root = createRoot(container);
    root.render(
      createElement(DataProvider, null,
        createElement(PrintPage, { embedded: true })
      )
    );

    // Wait for fonts
    await document.fonts.ready;

    // Wait for React to render + images to load
    await new Promise<void>((resolve) => {
      let attempts = 0;
      const check = () => {
        const printPage = container.querySelector(".print-page");
        attempts++;
        if (printPage && printPage.children.length > 0 && attempts >= 3) {
          resolve();
        } else if (attempts > 30) {
          resolve(); // timeout after ~3s
        } else {
          requestAnimationFrame(check);
        }
      };
      requestAnimationFrame(check);
    });

    // Extra settle time for recharts SVGs and images
    await new Promise((r) => setTimeout(r, 1500));

    const printPage = container.querySelector(".print-page") as HTMLElement;
    if (!printPage) throw new Error("Print page not found");

    // Capture the entire print page as one large canvas
    const fullCanvas = await html2canvas(printPage, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#0F172A",
      width: RENDER_WIDTH_PX,
      windowWidth: RENDER_WIDTH_PX,
      logging: false,
      allowTaint: true,
    });

    // Calculate page slicing
    const pxPerMm = fullCanvas.width / PAGE_WIDTH_MM;
    const pageHeightPx = PAGE_HEIGHT_MM * pxPerMm;
    const totalPages = Math.ceil(fullCanvas.height / pageHeightPx);

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) pdf.addPage();

      // Calculate slice coordinates
      const srcY = page * pageHeightPx;
      const srcHeight = Math.min(pageHeightPx, fullCanvas.height - srcY);
      const destHeightMM = (srcHeight / pxPerMm);

      // Create a canvas for this page slice
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = fullCanvas.width;
      pageCanvas.height = Math.round(pageHeightPx); // always full page height
      const ctx = pageCanvas.getContext("2d")!;

      // Fill with background color first
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      // Draw the slice of the full canvas
      ctx.drawImage(
        fullCanvas,
        0, Math.round(srcY),                          // source x, y
        fullCanvas.width, Math.round(srcHeight),      // source w, h
        0, 0,                                          // dest x, y
        fullCanvas.width, Math.round(srcHeight)        // dest w, h
      );

      const imgData = pageCanvas.toDataURL("image/jpeg", 0.92);
      pdf.addImage(imgData, "JPEG", 0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM);
    }

    const safeName = (fileName || "Portfolio").replace(/\.pdf$/i, "");
    pdf.save(`${safeName}.pdf`);
  } finally {
    // Cleanup
    if (root) {
      root.unmount();
    }
    document.body.removeChild(container);
  }
}
