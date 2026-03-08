import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export async function generatePDF(): Promise<void> {
  const root = document.getElementById("portfolio-pdf-root");
  if (!root) {
    throw new Error("PDF root element not found");
  }

  // Temporarily make visible for capture
  const originalStyle = root.style.cssText;
  root.style.position = "absolute";
  root.style.left = "0";
  root.style.top = "0";
  root.style.zIndex = "-1";
  root.style.opacity = "1";

  const pages = root.querySelectorAll<HTMLElement>(".pdf-page");
  if (pages.length === 0) {
    root.style.cssText = originalStyle;
    throw new Error("No PDF pages found");
  }

  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pdfW = 595.28;
  const pdfH = 841.89;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      width: 595,
      height: 842,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
  }

  // Restore hidden state
  root.style.cssText = originalStyle;

  pdf.save("Vilcimar_Portfolio.pdf");
}
