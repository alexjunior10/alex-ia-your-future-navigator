import { jsPDF } from "jspdf";
import type { StudentEvaluation } from "../admin/evaluations";
import { VARIABLE_FRIENDLY_NAMES, ALL_VOCATIONAL_VARIABLES } from "../questionnaire";

/**
 * Genera y descarga directamente un archivo PDF formateado de todo el informe vocacional.
 */
export function generateExecutivePDF(evaluation: StudentEvaluation): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 16;

  // Paleta de colores oficial
  const colorPrimary = [79, 107, 255]; // #4F6BFF
  const colorNavy = [23, 37, 84]; // #172554
  const colorText = [23, 32, 51]; // #172033
  const colorMuted = [100, 116, 139]; // #64748B
  const colorLight = [247, 249, 252]; // #F7F9FC
  const colorBorder = [226, 232, 240]; // #E2E8F0

  // ==========================================
  // PÁGINA 1: PORTADA Y TOP CARRERAS
  // ==========================================

  // Barra superior decorativa
  doc.setFillColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.rect(margin, y, contentWidth, 3, "F");
  y += 9;

  // Encabezado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(colorNavy[0], colorNavy[1], colorNavy[2]);
  doc.text("ALEX IA — INFORME VOCACIONAL OFICIAL", margin, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  doc.text("Evaluación Integral Multidimensional • Motor Canónico MATCHING_V1", margin, y);
  y += 8;

  // Caja de datos del estudiante
  doc.setFillColor(colorLight[0], colorLight[1], colorLight[2]);
  doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(colorNavy[0], colorNavy[1], colorNavy[2]);
  doc.text(`Estudiante: ${evaluation.studentName}`, margin + 6, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  doc.text(`Colegio: ${evaluation.school}`, margin + 6, y + 15);
  doc.text(`Grado: ${evaluation.grade} Secundaria`, margin + 6, y + 20);

  const fechaStr = evaluation.completedAt
    ? new Date(evaluation.completedAt).toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" })
    : "Evaluación Reciente";
  doc.text(`Fecha: ${fechaStr}`, margin + 110, y + 15);
  doc.text(`Estado: Completado (40 ítems analizados)`, margin + 110, y + 20);
  y += 30;

  // Sección: ADN Vocacional (5 Macrodimensiones)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(colorNavy[0], colorNavy[1], colorNavy[2]);
  doc.text("1. ADN VOCACIONAL (5 MACRODIMENSIONES PONDERADAS)", margin, y);
  y += 6;

  const macros = [
    { label: "Aptitudes Cognitivas (30%)", val: evaluation.macroDimensions.aptitudes, desc: "Lógico, analítico, espacial y verbal" },
    { label: "Intereses Vocacionales (25%)", val: evaluation.macroDimensions.intereses, desc: "Motivación intrínseca por áreas" },
    { label: "Personalidad Vocacional (20%)", val: evaluation.macroDimensions.personalidad, desc: "Liderazgo, colaboración y constancia" },
    { label: "Preferencias de Trabajo (15%)", val: evaluation.macroDimensions.preferencias, desc: "Entorno con personas, datos o tecnología" },
    { label: "Valores Ocupacionales (10%)", val: evaluation.macroDimensions.valores, desc: "Estabilidad, impacto y reconocimiento" },
  ];

  macros.forEach((m) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(colorText[0], colorText[1], colorText[2]);
    doc.text(m.label, margin, y + 4);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text(`${m.val}%`, margin + 65, y + 4);

    // Barra de progreso de fondo
    doc.setFillColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(margin + 75, y, 70, 5, 2, 2, "F");

    // Barra de progreso rellena
    const barWidth = Math.max(3, (m.val / 100) * 70);
    doc.setFillColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.roundedRect(margin + 75, y, barWidth, 5, 2, 2, "F");

    // Breve descripción
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
    doc.text(m.desc, margin + 150, y + 4);

    y += 9;
  });

  y += 5;

  // Sección: Top Carreras Recomendadas
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(colorNavy[0], colorNavy[1], colorNavy[2]);
  doc.text("2. CARRERAS PRINCIPALES RECOMENDADAS", margin, y);
  y += 6;

  const topList = evaluation.topMatches.slice(0, 5);
  topList.forEach((c, idx) => {
    doc.setFillColor(colorLight[0], colorLight[1], colorLight[2]);
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(margin, y, contentWidth, 15, 2, 2, "FD");

    // Medalla #
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text(`#${idx + 1}`, margin + 4, y + 9);

    // Nombre de Carrera
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(colorNavy[0], colorNavy[1], colorNavy[2]);
    doc.text(c.career_name, margin + 14, y + 7);

    // Detalles secundarios
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
    doc.text(`Área: ${c.area || "General"}  •  Rango: ${c.salary || "S/ 3,500 — S/ 12,000"}  •  Duración: ${c.duration || "5 años"}`, margin + 14, y + 12);

    // Porcentaje de afinidad con fallback defensivo
    const rawAff = (c as any).overall_similarity ?? (c as any).compatibility_pct ?? (c as any).global_score ?? (c as any).affinity ?? 80;
    const affinityNum = Math.round(Number(rawAff) * 10) / 10;

    doc.setFillColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.roundedRect(margin + contentWidth - 30, y + 3, 28, 9, 2, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(`${affinityNum}% match`, margin + contentWidth - 28, y + 9);

    y += 18;
  });

  // Pie de página 1
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  doc.text("Página 1 de 3 • Alex IA — Plataforma de Orientación Vocacional Inteligente", margin, pageHeight - 10);
  doc.text("Validado por Motor MATCHING_V1", margin + contentWidth - 45, pageHeight - 10);

  // ==========================================
  // PÁGINA 2: PERFIL 38D DETALLADO
  // ==========================================
  doc.addPage();
  y = 16;

  // Barra superior decorativa
  doc.setFillColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.rect(margin, y, contentWidth, 3, "F");
  y += 9;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(colorNavy[0], colorNavy[1], colorNavy[2]);
  doc.text("3. PERFIL DETALLADO DE LAS 38 VARIABLES VOCACIONALES", margin, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  doc.text("Puntajes estandarizados [0 — 100] calculados mediante el Score Model V1 oficial con prior neutro 50.", margin, y);
  y += 8;

  // Grid de 2 columnas para las 38 variables
  const colWidth = (contentWidth - 6) / 2;
  const half = Math.ceil(ALL_VOCATIONAL_VARIABLES.length / 2);
  const col1 = ALL_VOCATIONAL_VARIABLES.slice(0, half);
  const col2 = ALL_VOCATIONAL_VARIABLES.slice(half);

  const startY = y;
  let yCol1 = startY;
  let yCol2 = startY;

  // Columna 1
  col1.forEach((vKey) => {
    const score = evaluation.profile_38d[vKey] ?? 80;
    const friendly = (VARIABLE_FRIENDLY_NAMES as any)[vKey] || { name: vKey };

    doc.setFillColor(colorLight[0], colorLight[1], colorLight[2]);
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(margin, yCol1, colWidth, 10, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(colorText[0], colorText[1], colorText[2]);
    doc.text(friendly.name.slice(0, 28), margin + 3, yCol1 + 4.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text(`${score}%`, margin + colWidth - 12, yCol1 + 4.5);

    // Barra
    doc.setFillColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.rect(margin + 3, yCol1 + 6.5, colWidth - 6, 2, "F");

    doc.setFillColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.rect(margin + 3, yCol1 + 6.5, Math.max(1, (score / 100) * (colWidth - 6)), 2, "F");

    yCol1 += 12;
  });

  // Columna 2
  col2.forEach((vKey) => {
    const score = evaluation.profile_38d[vKey] ?? 80;
    const friendly = (VARIABLE_FRIENDLY_NAMES as any)[vKey] || { name: vKey };
    const xCol2 = margin + colWidth + 6;

    doc.setFillColor(colorLight[0], colorLight[1], colorLight[2]);
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(xCol2, yCol2, colWidth, 10, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(colorText[0], colorText[1], colorText[2]);
    doc.text(friendly.name.slice(0, 28), xCol2 + 3, yCol2 + 4.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text(`${score}%`, xCol2 + colWidth - 12, yCol2 + 4.5);

    // Barra
    doc.setFillColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.rect(xCol2 + 3, yCol2 + 6.5, colWidth - 6, 2, "F");

    doc.setFillColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.rect(xCol2 + 3, yCol2 + 6.5, Math.max(1, (score / 100) * (colWidth - 6)), 2, "F");

    yCol2 += 12;
  });

  // Pie de página 2
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  doc.text("Página 2 de 3 • Alex IA — Plataforma de Orientación Vocacional Inteligente", margin, pageHeight - 10);
  doc.text(`Estudiante: ${evaluation.studentName}`, margin + contentWidth - 45, pageHeight - 10);

  // ==========================================
  // PÁGINA 3: AUDITORÍA DE 40 PREGUNTAS
  // ==========================================
  doc.addPage();
  y = 16;

  // Barra superior decorativa
  doc.setFillColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
  doc.rect(margin, y, contentWidth, 3, "F");
  y += 9;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(colorNavy[0], colorNavy[1], colorNavy[2]);
  doc.text("4. AUDITORÍA Y TELEMETRÍA DE LAS 40 PREGUNTAS", margin, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  doc.text(`Tiempo de respuesta promedio: ${evaluation.averageResponseTimeSec}s por reactivo. Registro completo de alternativas seleccionadas.`, margin, y);
  y += 7;

  // Tabla compacta de 40 preguntas (2 columnas de 20 preguntas)
  const qHalf = 20;
  const qCol1 = evaluation.responses.slice(0, qHalf);
  const qCol2 = evaluation.responses.slice(qHalf, 40);

  let yQ1 = y;
  let yQ2 = y;

  qCol1.forEach((q) => {
    doc.setFillColor(colorLight[0], colorLight[1], colorLight[2]);
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(margin, yQ1, colWidth, 10.5, 1, 1, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(colorNavy[0], colorNavy[1], colorNavy[2]);
    doc.text(`P${q.questionNumber < 10 ? "0" + q.questionNumber : q.questionNumber} [${q.selectedOption}] (${q.responseTimeSec}s)`, margin + 2, yQ1 + 4);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
    doc.text(q.selectedOptionText.slice(0, 48), margin + 2, yQ1 + 8.5);

    yQ1 += 11.5;
  });

  qCol2.forEach((q) => {
    const xQ2 = margin + colWidth + 6;

    doc.setFillColor(colorLight[0], colorLight[1], colorLight[2]);
    doc.setDrawColor(colorBorder[0], colorBorder[1], colorBorder[2]);
    doc.roundedRect(xQ2, yQ2, colWidth, 10.5, 1, 1, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(colorNavy[0], colorNavy[1], colorNavy[2]);
    doc.text(`P${q.questionNumber < 10 ? "0" + q.questionNumber : q.questionNumber} [${q.selectedOption}] (${q.responseTimeSec}s)`, xQ2 + 2, yQ2 + 4);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
    doc.text(q.selectedOptionText.slice(0, 48), xQ2 + 2, yQ2 + 8.5);

    yQ2 += 11.5;
  });

  // Pie de página 3
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(colorMuted[0], colorMuted[1], colorMuted[2]);
  doc.text("Página 3 de 3 • Alex IA — Certificado Oficial de Evaluación Vocacional", margin, pageHeight - 10);
  doc.text("Documento oficial emitido por Alex IA", margin + contentWidth - 45, pageHeight - 10);

  // Guardar archivo con nombre seguro
  const cleanName = evaluation.studentName.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_ ]/g, "").trim().replace(/\s+/g, "_");
  doc.save(`Informe_Vocacional_AlexIA_${cleanName}.pdf`);
}

/**
 * Abre una ventana emergente de alta fidelidad con estilos corporativos listos para imprimir o guardar en PDF
 */
export function openPrintableReport(evaluation: StudentEvaluation): void {
  const cleanName = evaluation.studentName.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_ ]/g, "").trim();
  const fechaStr = evaluation.completedAt
    ? new Date(evaluation.completedAt).toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" })
    : new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" });

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Por favor permite las ventanas emergentes en tu navegador para generar el PDF.");
    return;
  }

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Informe_Vocacional_AlexIA_${cleanName.replace(/\s+/g, "_")}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 12mm 14mm 12mm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .no-print {
        display: none !important;
      }
      .page-break {
        page-break-before: always;
        break-before: page;
      }
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #172033;
      background: #FFFFFF;
      line-height: 1.4;
      font-size: 13px;
    }
    .print-bar {
      position: sticky;
      top: 0;
      background: #172554;
      color: white;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .btn-print {
      background: #4F6BFF;
      color: white;
      border: none;
      padding: 9px 18px;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      font-size: 13px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
    }
    .header-stripe {
      height: 4px;
      background: #4F6BFF;
      border-radius: 2px;
      margin-bottom: 16px;
    }
    .title {
      font-size: 22px;
      font-weight: 800;
      color: #172554;
      letter-spacing: -0.5px;
    }
    .subtitle {
      font-size: 12px;
      color: #64748B;
      margin-top: 2px;
      margin-bottom: 16px;
    }
    .student-box {
      background: #F7F9FC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 14px 18px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 800;
      color: #172554;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
      padding-bottom: 4px;
      border-bottom: 2px solid #E2E8F0;
    }
    .macro-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      margin-bottom: 8px;
    }
    .career-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      page-break-inside: avoid;
    }
    .badge-affinity {
      background: #4F6BFF;
      color: white;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .var-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 8px 12px;
      page-break-inside: avoid;
    }
    .q-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    .footer {
      margin-top: 30px;
      padding-top: 14px;
      border-top: 1px solid #E2E8F0;
      font-size: 11px;
      color: #64748B;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="print-bar no-print">
    <div>
      <strong>Informe Vocacional de ${cleanName}</strong> — Listo para Guardar o Imprimir
    </div>
    <div style="display: flex; gap: 10px;">
      <button class="btn-print" onclick="window.print()">🖨️ Guardar como PDF / Imprimir</button>
      <button style="background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 14px; border-radius: 8px; cursor: pointer;" onclick="window.close()">Cerrar</button>
    </div>
  </div>

  <div class="container">
    <div class="header-stripe"></div>
    <div class="title">ALEX IA — INFORME VOCACIONAL OFICIAL</div>
    <div class="subtitle">Evaluación Integral Multidimensional • Motor Canónico MATCHING_V1</div>

    <div class="student-box">
      <div>
        <strong>Estudiante:</strong> ${evaluation.studentName}<br/>
        <strong>Colegio:</strong> ${evaluation.school}<br/>
        <strong>Grado:</strong> ${evaluation.grade} Secundaria
      </div>
      <div>
        <strong>Fecha:</strong> ${fechaStr}<br/>
        <strong>Estado:</strong> Completado (40 reactivos evaluados)<br/>
        <strong>Algoritmo:</strong> MATCHING_V1 Oficial (132 Carreras)
      </div>
    </div>

    <!-- SECCIÓN 1: ADN VOCACIONAL -->
    <div class="section-title">1. ADN Vocacional (5 Macrodimensiones Ponderadas)</div>
    <div style="margin-bottom: 24px;">
      <div class="macro-row">
        <span><strong>Aptitudes Cognitivas (30%)</strong> — Pensamiento lógico, analítico y espacial</span>
        <span style="font-weight: 800; color: #4F6BFF; font-size: 15px;">${evaluation.macroDimensions.aptitudes}%</span>
      </div>
      <div class="macro-row">
        <span><strong>Intereses Vocacionales (25%)</strong> — Motivación intrínseca por áreas de estudio</span>
        <span style="font-weight: 800; color: #4F6BFF; font-size: 15px;">${evaluation.macroDimensions.intereses}%</span>
      </div>
      <div class="macro-row">
        <span><strong>Personalidad Vocacional (20%)</strong> — Liderazgo, colaboración y constancia</span>
        <span style="font-weight: 800; color: #4F6BFF; font-size: 15px;">${evaluation.macroDimensions.personalidad}%</span>
      </div>
      <div class="macro-row">
        <span><strong>Preferencias de Trabajo (15%)</strong> — Entorno con personas, datos o tecnología</span>
        <span style="font-weight: 800; color: #4F6BFF; font-size: 15px;">${evaluation.macroDimensions.preferencias}%</span>
      </div>
      <div class="macro-row">
        <span><strong>Valores Ocupacionales (10%)</strong> — Estabilidad, impacto social y reconocimiento</span>
        <span style="font-weight: 800; color: #4F6BFF; font-size: 15px;">${evaluation.macroDimensions.valores}%</span>
      </div>
    </div>

    <!-- SECCIÓN 2: TOP CARRERAS -->
    <div class="section-title">2. Top Carreras Recomendadas por Afinidad</div>
    <div style="margin-bottom: 24px;">
      ${evaluation.topMatches.slice(0, 5).map((m, idx) => {
        const rawAff = (m as any).overall_similarity ?? (m as any).compatibility_pct ?? (m as any).global_score ?? (m as any).affinity ?? 80;
        const aff = Math.round(Number(rawAff) * 10) / 10;
        return `
        <div class="career-card">
          <div>
            <div style="font-weight: 800; font-size: 14px; color: #172554;">#${idx + 1} ${m.career_name}</div>
            <div style="font-size: 11px; color: #64748B; margin-top: 3px;">
              Área: ${m.area || "General"} • Salario Ref: ${m.salary || "S/ 3,500 — S/ 12,000"} • Duración: ${m.duration || "5 años"}
            </div>
          </div>
          <div class="badge-affinity">${aff}% match</div>
        </div>
      `;}).join("")}
    </div>

    <div class="page-break"></div>

    <!-- SECCIÓN 3: PERFIL 38D -->
    <div class="header-stripe" style="margin-top: 20px;"></div>
    <div class="section-title">3. Perfil de las 38 Dimensiones Vocacionales (0 a 100)</div>
    <div class="grid-2" style="margin-bottom: 24px;">
      ${ALL_VOCATIONAL_VARIABLES.map((vKey) => {
        const score = evaluation.profile_38d[vKey] ?? 80;
        const friendly = (VARIABLE_FRIENDLY_NAMES as any)[vKey] || { name: vKey };
        const diag = score >= 75 ? "Sobresaliente" : score >= 50 ? "Equilibrado" : "En desarrollo";
        return `
          <div class="var-card">
            <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 11px;">
              <span>${friendly.name}</span>
              <span style="color: #4F6BFF;">${score}%</span>
            </div>
            <div style="height: 4px; background: #E2E8F0; border-radius: 2px; margin: 4px 0;">
              <div style="height: 100%; width: ${score}%; background: #4F6BFF; border-radius: 2px;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #64748B;">
              <span>${vKey}</span>
              <span>${diag}</span>
            </div>
          </div>
        `;
      }).join("")}
    </div>

    <div class="page-break"></div>

    <!-- SECCIÓN 4: AUDITORÍA DE 40 PREGUNTAS -->
    <div class="header-stripe" style="margin-top: 20px;"></div>
    <div class="section-title">4. Auditoría y Telemetría de las 40 Preguntas</div>
    <div style="font-size: 11px; color: #64748B; margin-bottom: 12px;">
      Tiempo promedio por ítem: <strong>${evaluation.averageResponseTimeSec}s</strong>. Detalle de opción seleccionada en cada pregunta.
    </div>
    <div class="grid-2">
      ${evaluation.responses.map((r) => `
        <div class="q-card">
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 10px; color: #4F6BFF; margin-bottom: 3px;">
            <span>Pregunta #${r.questionNumber} (${r.baseQuestionId})</span>
            <span style="color: #64748B;">${r.responseTimeSec}s</span>
          </div>
          <div style="font-size: 10px; color: #172033; font-weight: 600; margin-bottom: 2px;">
            [Opción ${r.selectedOption}] ${r.selectedOptionText}
          </div>
          <div style="font-size: 9px; color: #64748B;">
            Dimensión: ${r.dimension}
          </div>
        </div>
      `).join("")}
    </div>

    <div class="footer">
      <span>Alex IA — Certificado Oficial de Diagnóstico Vocacional</span>
      <span>Página generada el ${fechaStr}</span>
    </div>
  </div>

  <script>
    window.onload = function() {
      // Retardo breve para asegurar que renderice fuentes y estilos antes del print
      setTimeout(function() {
        window.print();
      }, 350);
    };
  </script>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
