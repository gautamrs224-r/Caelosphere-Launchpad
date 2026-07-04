import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

let client = null;
function getClient() {
  if (!env.geminiApiKey) throw new Error("GEMINI_API_KEY is not set in your .env file.");
  if (!client) client = new GoogleGenAI({ apiKey: env.geminiApiKey });
  return client;
}

const MODEL = "gemini-2.5-flash";

async function generateJSON(prompt) {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: { responseMimeType: "application/json" },
  });
  const text = (response.text || "").trim().replace(/^```json\s*/i, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`Gemini returned invalid JSON: ${err.message}`);
  }
}

function projectSummary(project) {
  return `Startup name: ${project.title}
Tagline: ${project.tagline || "(none)"}
Description: ${project.description || "(none)"}
Industry: ${project.industry || "(not specified)"}
Stage: ${project.stage || "Idea Stage"}
Goals: ${(project.goals || []).join(", ") || "(none)"}`.trim();
}

export async function generateValidation(project) {
  return generateJSON(`You are a startup analyst. Return ONLY a JSON object — no markdown, no commentary.
{
  "score": <integer 0-100>,
  "potential": "<'High Potential'|'Moderate Potential'|'Needs Work'>",
  "deltaPts": <integer 5-15>,
  "summary": "<1-2 sentence overall assessment>",
  "metrics": [
    {"label": "Market Demand", "value": <0-100>, "color": "#22C55E"},
    {"label": "Problem-Solution Fit", "value": <0-100>, "color": "#3B82F6"},
    {"label": "Market Size", "value": <0-100>, "color": "#A855F7"},
    {"label": "Competition", "value": <0-100>, "color": "#F97316"},
    {"label": "Go-to-Market Fit", "value": <0-100>, "color": "#14B8A6"},
    {"label": "Financial Viability", "value": <0-100>, "color": "#F59E0B"}
  ],
  "insights": ["<insight>", "<insight>", "<insight>", "<insight>", "<insight>"],
  "drivers": [{"icon": "<emoji>", "label": "<name>", "impact": "<'High Impact'|'Medium Impact'|'Low Impact'>", "desc": "<1 sentence>"}],
  "problem": "<2-3 sentence problem statement>",
  "solution": "<2-3 sentence proposed solution>",
  "risks": ["<risk>", "<risk>", "<risk>"],
  "opportunities": ["<opportunity>", "<opportunity>", "<opportunity>"]
}
Startup: ${projectSummary(project)}`);
}

export async function generateCompetitors(project) {
  return generateJSON(`You are a market research analyst. Return ONLY a JSON object — no markdown, no commentary.
{
  "topAnalyzed": <integer 4-6>,
  "marketConcentration": "<'Low'|'Moderate'|'High'>",
  "hhiScore": <integer 500-3000>,
  "position": "<'Weak'|'Moderate'|'Strong'>",
  "positionDetail": "<short phrase>",
  "advantage": "<main competitive edge>",
  "advantageDetail": "<short phrase>",
  "positioning": [
    {"name": "${project.title}", "x": <0-100>, "y": <0-100>, "you": true},
    {"name": "<competitor>", "x": <0-100>, "y": <0-100>}
  ],
  "competitors": ["<name>", "<name>", "<name>", "<name>"],
  "featureRows": [{"feature": "<feature>", "values": [<true/false for you first, then each competitor>]}],
  "opportunities": [{"title": "<title>", "desc": "<1 sentence>"}],
  "threats": [{"title": "<title>", "desc": "<1 sentence>"}],
  "takeaway": {"text": "<2-3 sentence takeaway>", "actions": ["<action>", "<action>", "<action>"]}
}
Include 4-6 plausible competitor names. List 6-8 feature rows. Startup: ${projectSummary(project)}`);
}

export async function generateSWOT(project) {
  return generateJSON(`You are a startup strategy consultant. Return ONLY a JSON object — no markdown, no commentary.
{
  "strengths": {"score": <0.0-10.0>, "items": ["<item>","<item>","<item>","<item>","<item>","<item>"]},
  "weaknesses": {"score": <0.0-10.0>, "items": ["<item>","<item>","<item>","<item>","<item>","<item>"]},
  "opportunities": {"score": <0.0-10.0>, "items": ["<item>","<item>","<item>","<item>","<item>","<item>"]},
  "threats": {"score": <0.0-10.0>, "items": ["<item>","<item>","<item>","<item>","<item>","<item>"]},
  "overall": <0.0-10.0>,
  "assessment": "<'Weak Position'|'Developing Position'|'Strong Position'>",
  "takeaway": "<2-3 sentence summary>",
  "recommendedActions": ["<action>","<action>","<action>","<action>","<action>"]
}
Startup: ${projectSummary(project)}`);
}

export async function generateLeanCanvas(project) {
  return generateJSON(`You are a business model consultant. Return ONLY a JSON object — no markdown, no commentary.
{
  "blocks": [
    {"num": 1, "title": "Problem", "items": ["<item>","<item>","<item>"]},
    {"num": 2, "title": "Solution", "items": ["<item>","<item>","<item>"]},
    {"num": 3, "title": "Unique Value Proposition", "highlight": "<one compelling sentence>"},
    {"num": 4, "title": "Unfair Advantage", "items": ["<item>","<item>","<item>"]},
    {"num": 5, "title": "Customer Segments", "items": ["<item>","<item>","<item>"]},
    {"num": 6, "title": "Channels", "items": ["<item>","<item>","<item>","<item>"]},
    {"num": 7, "title": "Key Metrics", "items": ["<item>","<item>","<item>","<item>"]},
    {"num": 8, "title": "Cost Structure", "items": ["<item>","<item>","<item>","<item>"]},
    {"num": 9, "title": "Revenue Streams", "items": ["<item>","<item>","<item>"]}
  ],
  "summary": {
    "text": "<2-3 sentence summary>",
    "validationStatus": "<'Weak'|'Developing'|'Strong'>",
    "validatedBlocks": "<e.g. '7 / 9 blocks validated'>",
    "fitPct": <0-100>,
    "fitLabel": "<short label>",
    "fitDetail": "<short phrase>",
    "nextStep": "<short next step>"
  }
}
Startup: ${projectSummary(project)}`);
}

export async function generateMVPPlan(project) {
  return generateJSON(`You are a product strategy consultant. Return ONLY a JSON object — no markdown, no commentary.
{
  "features": [
    {"feature": "<name>", "desc": "<short desc>", "value": "<'High'|'Medium'|'Low'>", "effort": "<'S'|'M'|'L'>", "priority": <1-5>}
  ],
  "roadmapPhases": [
    {"phase": "Phase 1: Foundation", "weeks": "Weeks 1-4", "icon": "🚀", "items": ["<item>","<item>"]},
    {"phase": "Phase 2: Core Features", "weeks": "Weeks 5-8", "icon": "💻", "items": ["<item>","<item>"]},
    {"phase": "Phase 3: Validation", "weeks": "Weeks 9-12", "icon": "🧪", "items": ["<item>","<item>"]},
    {"phase": "Phase 4: Launch", "weeks": "Weeks 13-14", "icon": "📈", "items": ["<item>","<item>"]}
  ],
  "prioritization": {
    "quickWins": ["<feature>"],
    "majorProjects": ["<feature>"],
    "fillIns": ["<feature>"],
    "lowPriority": []
  },
  "score": {
    "value": <0.0-10.0>,
    "label": "<short label>",
    "breakdown": [
      {"label": "Market Need", "value": <0-10>, "color": "#22C55E"},
      {"label": "Feasibility", "value": <0-10>, "color": "#3B82F6"},
      {"label": "Viability", "value": <0-10>, "color": "#A855F7"},
      {"label": "Differentiation", "value": <0-10>, "color": "#F59E0B"}
    ]
  },
  "scopeRecommendation": {
    "scope": "<'Minimal'|'Focused'|'Expanded'>",
    "detail": "<1-2 sentence justification>",
    "coreFeatures": <integer>,
    "estimatedTime": "<e.g. '10-12 weeks'>",
    "devCost": "<e.g. '$50K-$80K'>"
  },
  "successMetrics": [
    {"icon": "<emoji>", "label": "<name>", "target": "<target>", "kpi": "<kpi>"}
  ],
  "nextSteps": ["<step>","<step>","<step>","<step>"]
}
List 5-6 features. Startup: ${projectSummary(project)}`);
}

export async function generateBranding(project) {
  return generateJSON(`You are a startup branding expert. Return ONLY a JSON object — no markdown, no commentary.
{
  "names": ["<name>","<name>","<name>","<name>","<name>","<name>","<name>","<name>","<name>","<name>"],
  "taglines": [
    "<tagline 1>",
    "<tagline 2>",
    "<tagline 3>",
    "<tagline 4>",
    "<tagline 5>"
  ],
  "voice": "<2-3 sentence brand voice description — tone, personality, communication style>",
  "colors": [
    {"name": "<color name>", "hex": "<#hexcode>", "role": "<'Primary'|'Secondary'|'Accent'|'Background'|'Text'>"},
    {"name": "<color name>", "hex": "<#hexcode>", "role": "<role>"},
    {"name": "<color name>", "hex": "<#hexcode>", "role": "<role>"},
    {"name": "<color name>", "hex": "<#hexcode>", "role": "<role>"},
    {"name": "<color name>", "hex": "<#hexcode>", "role": "<role>"}
  ],
  "logoPrompt": "<detailed prompt for an AI image generator to create a professional logo for this startup>",
  "brandPersonality": ["<trait>","<trait>","<trait>","<trait>"],
  "targetAudience": "<1-2 sentence audience description>",
  "positioningStatement": "<one sentence: For [audience] who [need], [brand] is the [category] that [benefit] unlike [alternative]>"
}
Generate professional, unique branding. Colors must be beautiful, cohesive, and appropriate for the industry. Startup: ${projectSummary(project)}`);
}

export async function generateRoadmap(project) {
  return generateJSON(`You are a startup launch strategist. Return ONLY a JSON object — no markdown, no commentary.
{
  "phases": [
    {
      "month": "Month 1",
      "title": "Research & Validation",
      "status": "current",
      "items": ["<task>","<task>","<task>","<task>"],
      "milestone": "<key milestone for this month>",
      "kpi": "<measurable KPI>"
    },
    {
      "month": "Month 2",
      "title": "Development",
      "status": "upcoming",
      "items": ["<task>","<task>","<task>","<task>"],
      "milestone": "<key milestone>",
      "kpi": "<measurable KPI>"
    },
    {
      "month": "Month 3",
      "title": "Beta Testing",
      "status": "upcoming",
      "items": ["<task>","<task>","<task>","<task>"],
      "milestone": "<key milestone>",
      "kpi": "<measurable KPI>"
    },
    {
      "month": "Month 4",
      "title": "Launch",
      "status": "upcoming",
      "items": ["<task>","<task>","<task>","<task>"],
      "milestone": "<key milestone>",
      "kpi": "<measurable KPI>"
    }
  ],
  "summary": "<2-3 sentence overall launch strategy summary>",
  "criticalPath": ["<most important task>","<most important task>","<most important task>"],
  "risks": [
    {"risk": "<risk>", "mitigation": "<how to handle it>"}
  ]
}
Make the roadmap realistic and specific to this startup's industry and stage. Startup: ${projectSummary(project)}`);
}
