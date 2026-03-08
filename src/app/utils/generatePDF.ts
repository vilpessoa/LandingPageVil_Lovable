import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

const PX_PER_MM = 794 / 210; // 794px = 210mm (A4 width)
const PAGE_HEIGHT_MM = 297;
const PAGE_WIDTH_MM = 210;

export async function generatePDF(fileName?: string): Promise<void> {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.top = "0";
  iframe.style.width = "794px";
  iframe.style.height = "5000px"; // tall enough for all content
  iframe.style.border = "none";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  document.body.appendChild(iframe);

  try {
    await new Promise<void>((resolve, reject) => {
      iframe.onload = () => resolve();
      iframe.onerror = () => reject(new Error("Failed to load print page"));
      iframe.src = "/print";
    });

    // Wait for fonts and rendering
    await new Promise((r) => setTimeout(r, 2500));

    const printPage = iframe.contentDocument?.querySelector(".print-page") as HTMLElement;
    if (!printPage) throw new Error("Print page not found");

    const sections = Array.from(printPage.querySelectorAll(".section-block")) as HTMLElement[];
    if (sections.length === 0) throw new Error("No sections found");

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    // Capture each section individually
    const sectionCanvases: { canvas: HTMLCanvasElement; hasPageBreak: boolean }[] = [];

    for (const section of sections) {
      const canvas = await html2canvas(section, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0F172A",
        width: 794,
        windowWidth: 794,
        logging: false,
      });
      const hasPageBreak = section.classList.contains("page-break");
      sectionCanvases.push({ canvas, hasPageBreak });
    }

    // Group sections into pages
    let currentYMM = 0;
    let isFirstPage = true;

    for (let i = 0; i < sectionCanvases.length; i++) {
      const { canvas, hasPageBreak } = sectionCanvases[i];
      const sectionHeightMM = (canvas.height / canvas.width) * PAGE_WIDTH_MM;

      // Check if this section fits on the current page
      if (!isFirstPage && currentYMM + sectionHeightMM > PAGE_HEIGHT_MM + 1) {
        // Doesn't fit — start new page
        pdf.addPage();
        currentYMM = 0;
      }

      if (!isFirstPage && currentYMM === 0) {
        // We just added a page, no need to add another
      } else if (isFirstPage) {
        isFirstPage = false;
      }

      // Draw section on current page
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      pdf.addImage(imgData, "JPEG", 0, currentYMM, PAGE_WIDTH_MM, sectionHeightMM);

      currentYMM += sectionHeightMM;

      // If section has page-break, force new page for next section
      if (hasPageBreak && i < sectionCanvases.length - 1) {
        // Fill remaining space with background color
        if (currentYMM < PAGE_HEIGHT_MM) {
          pdf.setFillColor(15, 23, 42); // #0F172A
          pdf.rect(0, currentYMM, PAGE_WIDTH_MM, PAGE_HEIGHT_MM - currentYMM, "F");
        }
        pdf.addPage();
        currentYMM = 0;
      }
    }

    // Fill remaining space on last page
    if (currentYMM < PAGE_HEIGHT_MM && currentYMM > 0) {
      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, currentYMM, PAGE_WIDTH_MM, PAGE_HEIGHT_MM - currentYMM, "F");
    }

    const safeName = (fileName || "Portfolio").replace(/\.pdf$/i, "");
    pdf.save(`${safeName}.pdf`);
  } finally {
    document.body.removeChild(iframe);
  }
}
