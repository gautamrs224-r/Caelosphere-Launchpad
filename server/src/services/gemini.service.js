import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

let client = null;
function getClient() {
  if (!env.geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not set. Add it to your .env before running AI analysis.");
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: env.geminiApiKey });
  }
  return client;
}

const MODEL = "gemini-2.5-flash";

/**
 * Sends a prompt to Gemini and parses the response as JSON.
 * We instruct the model to return ONLY JSON (no markdown fences, no prose)
 * and strip fences defensively in case it adds them anyway.
 */
async function generateJSON(prompt) {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text?.trim() || "";
  const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`Gemini returned invalid JSON: ${err.message}`);
  }
}

function projectSummary(project) {
  return `
Startup name: ${project.title}
Tagline: ${project.tagline || "(none provided)"}
Description: ${project.description || "(none provided)"}
Industry: ${project.industry || "(not specified)"}
Stage: ${project.stage || "Idea Stage"}
Goals: ${(project.goals || []).join(", ") || "(none specified)"}
`.trim();
}

export async function generateValidation(project) {
  const prompt = `You are a startup analyst. Analyze this startup idea and return a JSON object with this EXACT shape (no extra commentary, no markdown):

{
  "score": <integer 0-100>,
  "potential": "<short label like 'High Potential', 'Moderate Potential', 'Needs Work'>",
  "deltaPts": <integer, your best estimate of typical month-over-month improvement, 5-15>,
  "summary": "<1-2 sentence overall assessment>",
  "metrics": [
    {"label": "Market Demand", "value": <0-100>, "color": "#22C55E"},
    {"label": "Problem-Solution Fit", "value": <0-100>, "color": "#3B82F6"},
    {"label": "Market Size", "value": <0-100>, "color": "#A855F7"},
    {"label": "Competition", "value": <0-100>, "color": "#F97316"},
    {"label": "Go-to-Market Fit", "value": <0-100>, "color": "#14B8A6"},
    {"label": "Financial Viability", "value": <0-100>, "color": "#F59E0B"}
  ],
  "insights": ["<insight 1>", "<insight 2>", "<insight 3>", "<insight 4>", "<insight 5>"],
  "drivers": [
    {"icon": "<single emoji>", "label": "<driver name>", "impact": "<'High Impact'|'Medium Impact'|'Low Impact'>", "desc": "<1 sentence>"}
  ],
  "problem": "<2-3 sentence problem statement>",
  "solution": "<2-3 sentence proposed solution>",
  "risks": ["<risk 1>", "<risk 2>", "<risk 3>"],
  "opportunities": ["<opportunity 1>", "<opportunity 2>", "<opportunity 3>"]
}

Base your analysis on this startup:
${projectSummary(project)}`;

  return generateJSON(prompt);
}

export async function generateCompetitors(project) {
  const prompt = `You are a market research analyst. Analyze likely competitors for this startup and return a JSON object with this EXACT shape (no extra commentary, no markdown):

{
  "topAnalyzed": <integer, number of competitors you're listing, 4-6>,
  "marketConcentration": "<'Low'|'Moderate'|'High'>",
  "hhiScore": <integer 500-3000>,
  "position": "<'Weak'|'Moderate'|'Strong'>",
  "positionDetail": "<short phrase>",
  "advantage": "<short phrase describing this startup's main edge>",
  "advantageDetail": "<short phrase>",
  "positioning": [
    {"name": "<this startup's name>", "x": <0-100 market presence>, "y": <0-100 product strength>, "you": true},
    {"name": "<competitor name>", "x": <0-100>, "y": <0-100>}
  ],
  "competitors": ["<competitor 1 name>", "<competitor 2 name>", "..."],
  "featureRows": [
    {"feature": "<feature name>", "values": [<true/false for this startup>, <true/false for each competitor in order>]}
  ],
  "opportunities": [{"title": "<short title>", "desc": "<1 sentence>"}],
  "threats": [{"title": "<short title>", "desc": "<1 sentence>"}],
  "takeaway": {
    "text": "<2-3 sentence strategic takeaway>",
    "actions": ["<action 1>", "<action 2>", "<action 3>"]
  }
}

Include 4-6 realistic, plausible competitor names for this space (these can be illustrative/plausible rather than verified real companies). List 6-8 feature comparison rows. Base it on this startup:
${projectSummary(project)}`;

  return generateJSON(prompt);
}

export async function generateSWOT(project) {
  const prompt = `You are a startup strategy consultant. Perform a SWOT analysis and return a JSON object with this EXACT shape (no extra commentary, no markdown):

{
  "strengths": {"score": <0-10 one decimal>, "items": ["<item 1>", "...", "(5-6 items)"]},
  "weaknesses": {"score": <0-10 one decimal>, "items": ["...", "(5-6 items)"]},
  "opportunities": {"score": <0-10 one decimal>, "items": ["...", "(5-6 items)"]},
  "threats": {"score": <0-10 one decimal>, "items": ["...", "(5-6 items)"]},
  "overall": <0-10 one decimal, roughly the average weighted toward strengths+opportunities>,
  "assessment": "<'Weak Position'|'Developing Position'|'Strong Position'>",
  "takeaway": "<2-3 sentence summary>",
  "recommendedActions": ["<action 1>", "...", "(4-5 actions)"]
}

Base this on the startup below:
${projectSummary(project)}`;

  return generateJSON(prompt);
}

export async function generateLeanCanvas(project) {
  const prompt = `You are a business model consultant. Create a Lean Canvas and return a JSON object with this EXACT shape (no extra commentary, no markdown):

{
  "blocks": [
    {"num": 1, "title": "Problem", "items": ["<problem 1>", "<problem 2>", "<problem 3>"]},
    {"num": 2, "title": "Solution", "items": ["<solution 1>", "<solution 2>", "<solution 3>"]},
    {"num": 3, "title": "Unique Value Proposition", "highlight": "<one compelling sentence>"},
    {"num": 4, "title": "Unfair Advantage", "items": ["<advantage 1>", "<advantage 2>", "<advantage 3>"]},
    {"num": 5, "title": "Customer Segments", "items": ["<segment 1>", "<segment 2>", "<segment 3>"]},
    {"num": 6, "title": "Channels", "items": ["<channel 1>", "<channel 2>", "<channel 3>", "<channel 4>"]},
    {"num": 7, "title": "Key Metrics", "items": ["<metric 1>", "<metric 2>", "<metric 3>", "<metric 4>"]},
    {"num": 8, "title": "Cost Structure", "items": ["<cost 1>", "<cost 2>", "<cost 3>", "<cost 4>"]},
    {"num": 9, "title": "Revenue Streams", "items": ["<stream 1>", "<stream 2>", "<stream 3>"]}
  ],
  "summary": {
    "text": "<2-3 sentence summary of the business model's strength>",
    "validationStatus": "<'Weak'|'Developing'|'Strong'>",
    "validatedBlocks": "<e.g. '7 / 9 blocks validated'>",
    "fitPct": <0-100>,
    "fitLabel": "<short label>",
    "fitDetail": "<short phrase>",
    "nextStep": "<short next-step phrase>"
  }
}

Base this on the startup below:
${projectSummary(project)}`;

  return generateJSON(prompt);
}

export async function generateMVPPlan(project) {
  const prompt = `You are a product strategy consultant. Create an MVP plan and return a JSON object with this EXACT shape (no extra commentary, no markdown):

{
  "features": [
    {"feature": "<name>", "desc": "<short description>", "value": "<'High'|'Medium'|'Low'>", "effort": "<'S'|'M'|'L'>", "priority": <1-5>}
  ],
  "roadmapPhases": [
    {"phase": "Phase 1: Foundation", "weeks": "Weeks 1-4", "icon": "🚀", "items": ["<item 1>", "<item 2>"]},
    {"phase": "Phase 2: Core Features", "weeks": "Weeks 5-8", "icon": "💻", "items": ["<item 1>", "<item 2>"]},
    {"phase": "Phase 3: Validation", "weeks": "Weeks 9-12", "icon": "🧪", "items": ["<item 1>", "<item 2>"]},
    {"phase": "Phase 4: Launch", "weeks": "Weeks 13-14", "icon": "📈", "items": ["<item 1>", "<item 2>"]}
  ],
  "prioritization": {
    "quickWins": ["<feature name>"],
    "majorProjects": ["<feature name>"],
    "fillIns": ["<feature name>"],
    "lowPriority": ["<feature name>"]
  },
  "score": {
    "value": <0-10 one decimal>,
    "label": "<short label like 'Strong MVP Potential'>",
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
    "devCost": "<e.g. '$50K - $80K'>"
  },
  "successMetrics": [
    {"icon": "<emoji>", "label": "<metric name>", "target": "<target value>", "kpi": "<kpi name>"}
  ],
  "nextSteps": ["<step 1>", "<step 2>", "<step 3>", "<step 4>"]
}

List 5-6 features. Base this on the startup below:
${projectSummary(project)}`;

  return generateJSON(prompt);
}

export async function generateBranding(/* project */) {
  throw new Error("generateBranding() not implemented yet — coming in a follow-up.");
}

export async function generateRoadmap(/* project */) {
  throw new Error("generateRoadmap() not implemented yet — coming in a follow-up.");
}
