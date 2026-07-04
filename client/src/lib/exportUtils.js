/**
 * Export utilities for startup reports.
 * Stage 8 — Export System.
 *
 * PDF export uses the browser's native print dialog (no extra library needed).
 * Markdown export generates a clean .md file.
 * Both are client-side only — no server round-trip required.
 */

// ---------- Markdown Export ----------

function score(val, max = 100) {
  return val != null ? `${val}/${max}` : "—";
}

function list(arr = []) {
  return arr.map((i) => `- ${typeof i === "string" ? i : i.t || JSON.stringify(i)}`).join("\n");
}

export function buildMarkdown(project, report) {
  const v = report?.validation;
  const s = report?.swot;
  const c = report?.competitors;
  const lc = report?.leanCanvas;
  const m = report?.mvpPlan;
  const b = report?.branding;
  const r = report?.roadmap;

  const sections = [];

  sections.push(`# ${project?.title || "Startup"} — Report\n`);
  sections.push(`**Industry:** ${project?.industry || "—"}  `);
  sections.push(`**Stage:** ${project?.stage || "—"}  `);
  sections.push(`**Score:** ${score(project?.startupScore)}\n`);

  if (v) {
    sections.push(`---\n## Idea Validation\n`);
    sections.push(`**Score:** ${score(v.score)}  \n**Potential:** ${v.potential}  \n**Summary:** ${v.summary}\n`);
    if (v.problem) sections.push(`### Problem\n${v.problem}\n`);
    if (v.solution) sections.push(`### Solution\n${v.solution}\n`);
    if (v.risks?.length) sections.push(`### Risks\n${list(v.risks)}\n`);
    if (v.opportunities?.length) sections.push(`### Opportunities\n${list(v.opportunities)}\n`);
  }

  if (s) {
    sections.push(`---\n## SWOT Analysis\n`);
    sections.push(`**Overall:** ${score(s.overall, 10)}\n`);
    if (s.strengths?.items?.length) sections.push(`### Strengths (${s.strengths.score}/10)\n${list(s.strengths.items)}\n`);
    if (s.weaknesses?.items?.length) sections.push(`### Weaknesses (${s.weaknesses.score}/10)\n${list(s.weaknesses.items)}\n`);
    if (s.opportunities?.items?.length) sections.push(`### Opportunities (${s.opportunities.score}/10)\n${list(s.opportunities.items)}\n`);
    if (s.threats?.items?.length) sections.push(`### Threats (${s.threats.score}/10)\n${list(s.threats.items)}\n`);
    if (s.takeaway) sections.push(`### Takeaway\n${s.takeaway}\n`);
  }

  if (c) {
    sections.push(`---\n## Competitor Analysis\n`);
    sections.push(`**Your Position:** ${c.position} — ${c.positionDetail}  \n**Advantage:** ${c.advantage}\n`);
    if (c.opportunities?.length) sections.push(`### Opportunities\n${c.opportunities.map((o) => `- **${o.title}:** ${o.desc}`).join("\n")}\n`);
    if (c.threats?.length) sections.push(`### Threats\n${c.threats.map((t) => `- **${t.title}:** ${t.desc}`).join("\n")}\n`);
    if (c.takeaway?.text) sections.push(`### Takeaway\n${c.takeaway.text}\n`);
  }

  if (lc?.blocks?.length) {
    sections.push(`---\n## Lean Canvas\n`);
    lc.blocks.forEach((block) => {
      if (block.highlight) sections.push(`### ${block.num}. ${block.title}\n${block.highlight}\n`);
      else if (block.items?.length) sections.push(`### ${block.num}. ${block.title}\n${list(block.items)}\n`);
    });
  }

  if (m) {
    sections.push(`---\n## MVP Plan\n`);
    sections.push(`**Score:** ${score(m.score?.value, 10)}  \n**Scope:** ${m.scopeRecommendation?.scope} — ${m.scopeRecommendation?.detail}\n`);
    if (m.features?.length) {
      sections.push(`### Core Features\n| Feature | Value | Effort |\n|---|---|---|\n`);
      m.features.forEach((f) => sections.push(`| ${f.feature} | ${f.value} | ${f.effort} |\n`));
      sections.push("\n");
    }
    if (m.nextSteps?.length) sections.push(`### Next Steps\n${list(m.nextSteps)}\n`);
  }

  if (b) {
    sections.push(`---\n## Branding\n`);
    if (b.names?.length) sections.push(`### Startup Names\n${b.names.join(", ")}\n`);
    if (b.taglines?.length) sections.push(`### Taglines\n${list(b.taglines)}\n`);
    if (b.voice) sections.push(`### Brand Voice\n${b.voice}\n`);
    if (b.positioningStatement) sections.push(`### Positioning Statement\n_${b.positioningStatement}_\n`);
    if (b.logoPrompt) sections.push(`### Logo Prompt\n> ${b.logoPrompt}\n`);
  }

  if (r?.phases?.length) {
    sections.push(`---\n## Launch Roadmap\n`);
    r.phases.forEach((p) => {
      sections.push(`### ${p.month}: ${p.title}\n`);
      sections.push(`${list(p.items)}\n`);
      if (p.milestone) sections.push(`**Milestone:** ${p.milestone}  \n`);
      if (p.kpi) sections.push(`**KPI:** ${p.kpi}\n`);
    });
    if (r.criticalPath?.length) sections.push(`### Critical Path\n${list(r.criticalPath)}\n`);
  }

  return sections.join("\n");
}

export function downloadMarkdown(project, report) {
  const md = buildMarkdown(project, report);
  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(project?.title || "startup").replace(/\s+/g, "-").toLowerCase()}-report.md`;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------- PDF Export ----------
// Opens the browser's print dialog with a styled printable page.
// No external PDF library needed.

export function downloadPDF(project, report) {
  const md = buildMarkdown(project, report);

  // Convert markdown to simple HTML for print
  const html = md
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/^---$/gm, "<hr>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/> (.+)/g, "<blockquote>$1</blockquote>")
    .replace(/\n\n/g, "<br>")
    .replace(/\| (.+) \|/g, (line) => {
      if (line.includes("---")) return "";
      const cells = line.split("|").filter(Boolean).map((c) => `<td>${c.trim()}</td>`).join("");
      return `<tr>${cells}</tr>`;
    });

  const win = window.open("", "_blank");
  win.document.write(`<!DOCTYPE html>
<html>
<head>
<title>${project?.title || "Startup"} Report</title>
<style>
  body { font-family: -apple-system, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #111; }
  h1 { font-size: 28px; border-bottom: 2px solid #7C3AED; padding-bottom: 8px; color: #7C3AED; }
  h2 { font-size: 20px; color: #6D28D9; margin-top: 32px; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
  h3 { font-size: 15px; color: #374151; margin-top: 20px; }
  li { margin: 4px 0; line-height: 1.6; }
  hr { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
  blockquote { border-left: 3px solid #7C3AED; margin: 12px 0; padding-left: 12px; color: #555; }
  table { border-collapse: collapse; width: 100%; }
  td { border: 1px solid #e5e7eb; padding: 6px 10px; font-size: 13px; }
  strong { color: #111; }
  @media print { body { margin: 20px; } }
</style>
</head>
<body>${html}</body>
</html>`);
  win.document.close();
  win.print();
}
