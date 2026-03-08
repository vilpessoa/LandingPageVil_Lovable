import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export async function generatePDF(): Promise<void> {
  // Create an off-screen iframe to render /print
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.top = "0";
  iframe.style.width = "794px";
  iframe.style.height = "1123px";
  iframe.style.border = "none";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  document.body.appendChild(iframe);

  try {
    // Load /print in the iframe
    await new Promise<void>((resolve, reject) => {
      iframe.onload = () => resolve();
      iframe.onerror = () => reject(new Error("Failed to load print page"));
      iframe.src = "/print";
    });

    // Wait for fonts and rendering
    await new Promise((r) => setTimeout(r, 2000));

    const printPage = iframe.contentDocument?.querySelector(".print-page") as HTMLElement;
    if (!printPage) throw new Error("Print page not found");

    // Get all section blocks
    const sections = printPage.querySelectorAll(".section-block");
    
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm

    // Capture the entire print page as one tall canvas
    const canvas = await html2canvas(printPage, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#0F172A",
      width: 794,
      windowWidth: 794,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const canvasAspect = canvas.height / canvas.width;
    const totalHeightMM = pageWidth * canvasAspect;

    // Split into A4 pages
    const totalPages = Math.ceil(totalHeightMM / pageHeight);

    for (let i = 0; i < totalPages; i++) {
      if (i > 0) pdf.addPage();

      // Calculate source crop for this page
      const srcY = (i * pageHeight / totalHeightMM) * canvas.height;
      const srcH = (pageHeight / totalHeightMM) * canvas.height;

      // Create a cropped canvas for this page
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.min(srcH, canvas.height - srcY);
      const ctx = pageCanvas.getContext("2d");
      if (!ctx) continue;

      // Fill background
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      ctx.drawImage(
        canvas,
        0, srcY, canvas.width, pageCanvas.height,
        0, 0, pageCanvas.width, pageCanvas.height
      );

      const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
      const pageImgHeight = (pageCanvas.height / pageCanvas.width) * pageWidth;

      pdf.addImage(pageImgData, "JPEG", 0, 0, pageWidth, pageImgHeight);
    }

    pdf.save("Vilcimar_Portfolio.pdf");
  } finally {
    document.body.removeChild(iframe);
  }
}
