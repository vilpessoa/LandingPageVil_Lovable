import { jsPDF } from "jspdf";
import type { SiteData } from "../context/DataContext";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const PAD_X = 44;
const PAD_Y = 46;
const CONTENT_W = PAGE_W - PAD_X * 2;

const COLORS = {
  bg: "#0F172A",
  bgAlt: "#111827",
  card: "#1F2937",
  text: "#F9FAFB",
  muted: "#9CA3AF",
  cyan: "#00C2FF",
  purple: "#7C3AED",
  green: "#10B981",
  amber: "#F59E0B",
};

const CHART_DATA = [20, 35, 52, 65, 78, 88, 95];
const IMPACT_DATA = [15, 30, 48, 62, 75, 85, 94];
const YEARS = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"];

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const n = parseInt(clean, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function setFill(pdf: jsPDF, hex: string) {
  const { r, g, b } = hexToRgb(hex);
  pdf.setFillColor(r, g, b);
}

function setStroke(pdf: jsPDF, hex: string) {
  const { r, g, b } = hexToRgb(hex);
  pdf.setDrawColor(r, g, b);
}

function setText(pdf: jsPDF, hex: string) {
  const { r, g, b } = hexToRgb(hex);
  pdf.setTextColor(r, g, b);
}

function drawBackground(pdf: jsPDF, alt = false) {
  setFill(pdf, alt ? COLORS.bgAlt : COLORS.bg);
  pdf.rect(0, 0, PAGE_W, PAGE_H, "F");
}

function drawFooter(pdf: jsPDF, page: number, total: number) {
  setStroke(pdf, "#374151");
  pdf.setLineWidth(0.5);
  pdf.line(PAD_X, PAGE_H - 30, PAGE_W - PAD_X, PAGE_H - 30);
  setText(pdf, COLORS.muted);
  pdf.setFont("courier", "normal");
  pdf.setFontSize(9);
  pdf.text(`Página ${page} de ${total}`, PAGE_W - PAD_X, PAGE_H - 18, { align: "right" });
}

function drawSectionHeader(pdf: jsPDF, label: string, title: string, accent = COLORS.cyan) {
  setText(pdf, accent);
  pdf.setFont("courier", "normal");
  pdf.setFontSize(9);
  pdf.text(label, PAD_X, PAD_Y);

  setText(pdf, COLORS.text);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.text(title, PAD_X, PAD_Y + 24);
}

function drawWrapped(pdf: jsPDF, text: string, x: number, y: number, width: number, size = 11, color = COLORS.muted, lineHeight = 1.5) {
  setText(pdf, color);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(size);
  const lines = pdf.splitTextToSize(text, width);
  pdf.text(lines, x, y);
  return y + lines.length * size * lineHeight;
}

function renderHero(pdf: jsPDF, data: SiteData) {
  const { personal } = data;
  drawBackground(pdf);

  setFill(pdf, "#0B2034");
  pdf.circle(PAGE_W - 80, 100, 80, "F");
  setFill(pdf, "#1E1B4B");
  pdf.circle(70, PAGE_H - 100, 60, "F");

  if (personal.available) {
    setFill(pdf, "#0B3140");
    pdf.roundedRect(PAD_X, 80, 185, 24, 12, 12, "F");
    setFill(pdf, COLORS.green);
    pdf.circle(PAD_X + 10, 92, 3, "F");
    setText(pdf, COLORS.cyan);
    pdf.setFont("courier", "normal");
    pdf.setFontSize(8);
    pdf.text("Disponível para novos projetos", PAD_X + 18, 95);
  }

  setText(pdf, COLORS.text);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(54);
  pdf.text(personal.firstName, PAD_X, 180);

  setText(pdf, COLORS.cyan);
  pdf.setFontSize(52);
  pdf.text(personal.lastName, PAD_X, 232);

  setStroke(pdf, COLORS.cyan);
  pdf.setLineWidth(2);
  pdf.line(PAD_X, 260, PAD_X + 38, 260);

  setText(pdf, COLORS.muted);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(17);
  pdf.text(personal.title, PAD_X + 50, 264);

  let y = drawWrapped(pdf, `${personal.subtitle}. ${personal.headline}`, PAD_X, 305, 390, 12, COLORS.muted, 1.6);

  setText(pdf, COLORS.text);
  pdf.setFontSize(11);
  y += 16;
  pdf.text(`✉ ${personal.email}`, PAD_X, y);
  pdf.text(`📍 ${personal.location}`, PAD_X + 220, y);

  const chartX = PAD_X + 30;
  const chartY = 520;
  const chartW = CONTENT_W - 60;
  const chartH = 170;

  setStroke(pdf, "#233043");
  pdf.setLineWidth(0.6);
  for (let i = 0; i <= 4; i++) {
    const gy = chartY + (i * chartH) / 4;
    pdf.line(chartX, gy, chartX + chartW, gy);
  }

  const step = chartW / (CHART_DATA.length - 1);
  setStroke(pdf, COLORS.cyan);
  pdf.setLineWidth(2);
  for (let i = 0; i < CHART_DATA.length - 1; i++) {
    const x1 = chartX + i * step;
    const y1 = chartY + chartH - (CHART_DATA[i] / 100) * chartH;
    const x2 = chartX + (i + 1) * step;
    const y2 = chartY + chartH - (CHART_DATA[i + 1] / 100) * chartH;
    pdf.line(x1, y1, x2, y2);
  }

  setStroke(pdf, COLORS.purple);
  pdf.setLineWidth(1.5);
  for (let i = 0; i < IMPACT_DATA.length - 1; i++) {
    const x1 = chartX + i * step;
    const y1 = chartY + chartH - (IMPACT_DATA[i] / 100) * chartH;
    const x2 = chartX + (i + 1) * step;
    const y2 = chartY + chartH - (IMPACT_DATA[i + 1] / 100) * chartH;
    pdf.line(x1, y1, x2, y2);
  }
}

function renderMetrics(pdf: jsPDF, data: SiteData) {
  drawBackground(pdf);
  drawSectionHeader(pdf, "// impacto mensurável", "Impacto em Números");

  const cardW = (CONTENT_W - 14) / 2;
  const cardH = 136;
  data.metrics.forEach((m, i) => {
    const x = PAD_X + (i % 2) * (cardW + 14);
    const y = 120 + Math.floor(i / 2) * (cardH + 14);

    setFill(pdf, COLORS.card);
    pdf.roundedRect(x, y, cardW, cardH, 10, 10, "F");
    setFill(pdf, m.color);
    pdf.rect(x, y, cardW, 3, "F");

    setText(pdf, m.color);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(32);
    pdf.text(`${m.prefix}${m.value}${m.suffix}`, x + 16, y + 52);

    setText(pdf, COLORS.text);
    pdf.setFontSize(13);
    pdf.text(m.label, x + 16, y + 76);

    drawWrapped(pdf, m.sublabel, x + 16, y + 95, cardW - 32, 10, COLORS.muted, 1.4);
  });
}

function renderAbout(pdf: jsPDF, data: SiteData) {
  const { about } = data;
  drawBackground(pdf, true);
  drawSectionHeader(pdf, "// sobre mim", "Mentalidade Analítica", COLORS.purple);

  let y = 120;
  y = drawWrapped(pdf, about.text1, PAD_X, y, CONTENT_W, 11, COLORS.muted, 1.6) + 8;
  y = drawWrapped(pdf, about.text2, PAD_X, y, CONTENT_W, 11, COLORS.muted, 1.6) + 12;

  about.highlights.forEach((h) => {
    setFill(pdf, COLORS.green);
    pdf.circle(PAD_X + 4, y - 3, 3, "F");
    drawWrapped(pdf, h, PAD_X + 14, y, CONTENT_W - 14, 10, "#D1D5DB", 1.4);
    y += 18;
  });

  const boxY = y + 10;
  const boxH = 260;
  setFill(pdf, COLORS.card);
  pdf.roundedRect(PAD_X, boxY, CONTENT_W, boxH, 10, 10, "F");

  setText(pdf, COLORS.muted);
  pdf.setFont("courier", "normal");
  pdf.setFontSize(8);
  pdf.text("analytics.growth.chart", PAD_X + 16, boxY + 20);

  setText(pdf, COLORS.text);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text(about.chartTitle, PAD_X + 16, boxY + 36);

  const cx = PAD_X + 16;
  const cy = boxY + 55;
  const cw = CONTENT_W - 32;
  const ch = 160;

  setStroke(pdf, "#324154");
  pdf.setLineWidth(0.5);
  for (let i = 0; i <= 4; i++) pdf.line(cx, cy + (i * ch) / 4, cx + cw, cy + (i * ch) / 4);

  const step = cw / (CHART_DATA.length - 1);
  setStroke(pdf, COLORS.cyan);
  pdf.setLineWidth(1.7);
  for (let i = 0; i < CHART_DATA.length - 1; i++) {
    pdf.line(cx + i * step, cy + ch - (CHART_DATA[i] / 100) * ch, cx + (i + 1) * step, cy + ch - (CHART_DATA[i + 1] / 100) * ch);
  }

  setStroke(pdf, COLORS.purple);
  pdf.setLineWidth(1.4);
  for (let i = 0; i < IMPACT_DATA.length - 1; i++) {
    pdf.line(cx + i * step, cy + ch - (IMPACT_DATA[i] / 100) * ch, cx + (i + 1) * step, cy + ch - (IMPACT_DATA[i + 1] / 100) * ch);
  }

  setText(pdf, COLORS.muted);
  pdf.setFont("courier", "normal");
  pdf.setFontSize(7);
  YEARS.forEach((year, i) => pdf.text(year, cx + i * step, cy + ch + 12, { align: "center" }));
}

function renderStack(pdf: jsPDF, data: SiteData) {
  drawBackground(pdf);
  drawSectionHeader(pdf, "// competências técnicas", "Stack Tecnológica");

  const colW = (CONTENT_W - 16) / 3;
  data.techStack.forEach((cat, i) => {
    const x = PAD_X + i * (colW + 8);
    const y = 120;

    setFill(pdf, COLORS.card);
    pdf.roundedRect(x, y, colW, 430, 10, 10, "F");

    setText(pdf, COLORS.text);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text(`${cat.icon} ${cat.title}`, x + 12, y + 24);

    setFill(pdf, cat.color);
    pdf.rect(x + 12, y + 30, 24, 2, "F");

    let yy = y + 56;
    cat.techs.forEach((tech) => {
      setText(pdf, "#D1D5DB");
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(tech.name, x + 12, yy);

      setText(pdf, cat.color);
      pdf.setFont("courier", "normal");
      pdf.text(`${tech.level}%`, x + colW - 12, yy, { align: "right" });

      setFill(pdf, "#374151");
      pdf.roundedRect(x + 12, yy + 6, colW - 24, 4, 2, 2, "F");
      setFill(pdf, cat.color);
      pdf.roundedRect(x + 12, yy + 6, ((colW - 24) * tech.level) / 100, 4, 2, 2, "F");
      yy += 30;
    });
  });

  setText(pdf, COLORS.muted);
  pdf.setFont("courier", "normal");
  pdf.setFontSize(8);
  pdf.text("TAMBÉM UTILIZO →", PAD_X, 590);

  let chipX = PAD_X;
  let chipY = 610;
  data.extraTechs.forEach((tech) => {
    const tw = pdf.getTextWidth(tech) + 18;
    if (chipX + tw > PAGE_W - PAD_X) {
      chipX = PAD_X;
      chipY += 22;
    }
    setFill(pdf, "#1E293B");
    pdf.roundedRect(chipX, chipY - 11, tw, 16, 4, 4, "F");
    setText(pdf, "#D1D5DB");
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text(tech, chipX + 9, chipY);
    chipX += tw + 6;
  });
}

function renderProjectPage(pdf: jsPDF, project: SiteData["projects"][number]) {
  drawBackground(pdf, true);
  drawSectionHeader(pdf, "// casos de sucesso", "Projeto Estratégico", COLORS.purple);

  setFill(pdf, COLORS.card);
  pdf.roundedRect(PAD_X, 120, CONTENT_W, 620, 12, 12, "F");
  setFill(pdf, project.tagColor);
  pdf.roundedRect(PAD_X + 16, 138, 110, 18, 4, 4, "F");

  setText(pdf, COLORS.bg);
  pdf.setFont("courier", "normal");
  pdf.setFontSize(7.5);
  pdf.text(project.tag, PAD_X + 71, 150, { align: "center" });

  setText(pdf, COLORS.text);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(21);
  pdf.text(project.title, PAD_X + 16, 182);

  setText(pdf, project.color);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text(project.subtitle, PAD_X + 16, 202);

  const colGap = 12;
  const colW = (CONTENT_W - colGap * 2 - 32) / 3;
  const baseY = 232;
  const sections = [
    { label: "PROBLEMA", color: COLORS.amber, text: project.problem },
    { label: "SOLUÇÃO", color: project.color, text: project.solution },
    { label: "RESULTADO", color: COLORS.green, text: project.result },
  ];

  sections.forEach((s, i) => {
    const x = PAD_X + 16 + i * (colW + colGap);
    setFill(pdf, s.color);
    pdf.rect(x, baseY - 8, 3, 12, "F");

    setText(pdf, s.color);
    pdf.setFont("courier", "normal");
    pdf.setFontSize(8);
    pdf.text(s.label, x + 8, baseY);

    drawWrapped(pdf, s.text, x, baseY + 18, colW, 9, COLORS.muted, 1.45);
  });

  setFill(pdf, "#111827");
  pdf.roundedRect(PAD_X + 16, 520, CONTENT_W - 32, 90, 8, 8, "F");
  const mW = (CONTENT_W - 32) / project.metrics.length;

  project.metrics.forEach((m, i) => {
    const mx = PAD_X + 16 + i * mW;
    setText(pdf, project.color);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(24);
    pdf.text(m.value, mx + mW / 2, 556, { align: "center" });
    drawWrapped(pdf, m.label, mx + 8, 576, mW - 16, 8, COLORS.muted, 1.35);
  });
}

function renderPhilosophyContact(pdf: jsPDF, data: SiteData) {
  const { philosophy, personal } = data;
  drawBackground(pdf);
  drawSectionHeader(pdf, "// filosofia de trabalho", "Data-Driven Thinking");

  setFill(pdf, COLORS.card);
  pdf.roundedRect(PAD_X, 120, CONTENT_W, 170, 12, 12, "F");

  setText(pdf, COLORS.cyan);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(54);
  pdf.text('"', PAD_X + 16, 162);

  setText(pdf, COLORS.text);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  const quoteLines = pdf.splitTextToSize(`"${philosophy.quote}"`, CONTENT_W - 48);
  pdf.text(quoteLines, PAD_X + 36, 165);

  setText(pdf, COLORS.muted);
  pdf.setFont("courier", "normal");
  pdf.setFontSize(10);
  pdf.text(`— ${philosophy.author}`, PAD_X + 36, 245);

  const boxY = 320;
  const boxW = (CONTENT_W - 16) / 3;
  philosophy.principles.forEach((p, i) => {
    const x = PAD_X + i * (boxW + 8);
    setFill(pdf, "#1E293B");
    pdf.roundedRect(x, boxY, boxW, 170, 10, 10, "F");

    setText(pdf, "#33556C");
    pdf.setFont("courier", "bold");
    pdf.setFontSize(24);
    pdf.text(p.number, x + 12, boxY + 28);

    setText(pdf, COLORS.text);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text(p.title, x + 12, boxY + 52);

    drawWrapped(pdf, p.desc, x + 12, boxY + 72, boxW - 24, 9, COLORS.muted, 1.45);
  });

  setStroke(pdf, "#374151");
  pdf.line(PAD_X, 548, PAGE_W - PAD_X, 548);

  setText(pdf, COLORS.cyan);
  pdf.setFont("courier", "normal");
  pdf.setFontSize(9);
  pdf.text("// vamos conversar", PAD_X, 570);

  setText(pdf, COLORS.text);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text("Pronto para transformar dados em decisões?", PAD_X, 602);

  setText(pdf, COLORS.muted);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text(`E-mail: ${personal.email}`, PAD_X, 636);
  pdf.text(`LinkedIn: ${personal.linkedinUrl}`, PAD_X, 656);
  pdf.text(`Localização: ${personal.location}`, PAD_X, 676);
}

export async function generatePDF(data: SiteData): Promise<void> {
  const totalPages = 5 + data.projects.length;
  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  let page = 1;
  renderHero(pdf, data);
  drawFooter(pdf, page, totalPages);

  pdf.addPage();
  page += 1;
  renderMetrics(pdf, data);
  drawFooter(pdf, page, totalPages);

  pdf.addPage();
  page += 1;
  renderAbout(pdf, data);
  drawFooter(pdf, page, totalPages);

  pdf.addPage();
  page += 1;
  renderStack(pdf, data);
  drawFooter(pdf, page, totalPages);

  for (const project of data.projects) {
    pdf.addPage();
    page += 1;
    renderProjectPage(pdf, project);
    drawFooter(pdf, page, totalPages);
  }

  pdf.addPage();
  page += 1;
  renderPhilosophyContact(pdf, data);
  drawFooter(pdf, page, totalPages);

  const blob = pdf.output("blob");
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = "Vilcimar_Portfolio.pdf";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
}
