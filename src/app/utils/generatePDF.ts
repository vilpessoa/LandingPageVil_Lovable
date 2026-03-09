import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { createRoot } from "react-dom/client";
import { createElement } from "react";

const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const RENDER_WIDTH_PX = 794;

export async function generatePDF(fileName?: string): Promise<void> {
  const { PrintPage } = await import("../pages/PrintPage");
  const { DataProvider } = await import("../context/DataContext");

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
    root = createRoot(container);
    root.render(
      createElement(DataProvider, null,
        createElement(PrintPage, { embedded: true })
      )
    );

    await document.fonts.ready;

    // Wait for React to render
    await new Promise<void>((resolve) => {
      let attempts = 0;
      const check = () => {
        const printPage = container.querySelector(".print-page");
        attempts++;
        if (printPage && printPage.children.length > 0 && attempts >= 3) {
          resolve();
        } else if (attempts > 30) {
          resolve();
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

    // Capture each .section-block individually
    const sections = printPage.querySelectorAll(".section-block");
    if (!sections.length) throw new Error("No sections found");

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    for (let i = 0; i < sections.length; i++) {
      if (i > 0) pdf.addPage();

      const section = sections[i] as HTMLElement;

      const canvas = await html2canvas(section, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        width: RENDER_WIDTH_PX,
        windowWidth: RENDER_WIDTH_PX,
        logging: false,
        allowTaint: true,
      });

      const imgWidth = PAGE_WIDTH_MM;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;

      // If section fits in one page, place it at top with background fill
      if (imgHeight <= PAGE_HEIGHT_MM) {
        // Fill entire page with background color
        pdf.setFillColor(15, 23, 42); // #0F172A
        pdf.rect(0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM, "F");
        // Place section image at top
        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      } else {
        // Section is taller than one page — slice it
        const pxPerMm = canvas.width / PAGE_WIDTH_MM;
        const pageHeightPx = PAGE_HEIGHT_MM * pxPerMm;
        const totalSubPages = Math.ceil(canvas.height / pageHeightPx);

        for (let sp = 0; sp < totalSubPages; sp++) {
          if (sp > 0) pdf.addPage();

          const srcY = sp * pageHeightPx;
          const srcHeight = Math.min(pageHeightPx, canvas.height - srcY);

          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = Math.round(pageHeightPx);
          const ctx = pageCanvas.getContext("2d")!;

          // Fill with background
          ctx.fillStyle = "#0F172A";
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

          ctx.drawImage(
            canvas,
            0, Math.round(srcY),
            canvas.width, Math.round(srcHeight),
            0, 0,
            canvas.width, Math.round(srcHeight)
          );

          const imgData = pageCanvas.toDataURL("image/jpeg", 0.92);
          pdf.addImage(imgData, "JPEG", 0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM);
        }
      }
    }

    const safeName = (fileName || "Portfolio").replace(/\.pdf$/i, "");
    pdf.save(`${safeName}.pdf`);
  } finally {
    if (root) {
      root.unmount();
    }
    document.body.removeChild(container);
  }
}
