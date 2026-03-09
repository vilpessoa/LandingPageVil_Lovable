import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const CAPTURE_WIDTH_PX = 1280;

export async function generatePDF(fileName?: string): Promise<void> {
  const element = document.querySelector(".landing-content") as HTMLElement;
  if (!element) throw new Error("Landing content not found");

  // Save scroll position and scroll to top
  const scrollY = window.scrollY;
  window.scrollTo(0, 0);

  // Wait for scroll + repaint
  await new Promise((r) => setTimeout(r, 300));

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#0F172A",
      width: CAPTURE_WIDTH_PX,
      windowWidth: CAPTURE_WIDTH_PX,
      logging: false,
    });

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pxPerMm = canvas.width / PAGE_WIDTH_MM;
    const pageHeightPx = PAGE_HEIGHT_MM * pxPerMm;
    const totalPages = Math.ceil(canvas.height / pageHeightPx);

    for (let i = 0; i < totalPages; i++) {
      if (i > 0) pdf.addPage();

      const srcY = i * pageHeightPx;
      const srcHeight = Math.min(pageHeightPx, canvas.height - srcY);

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.round(pageHeightPx);
      const ctx = pageCanvas.getContext("2d")!;

      // Fill background
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

    const safeName = (fileName || "Portfolio").replace(/\.pdf$/i, "");
    pdf.save(`${safeName}.pdf`);
  } finally {
    // Restore scroll position
    window.scrollTo(0, scrollY);
  }
}
