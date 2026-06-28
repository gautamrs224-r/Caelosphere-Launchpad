export const startupHeader = {
  name: "FarmAI",
  score: 84,
  market: "High",
  competition: "Medium",
};

export const validationData = {
  problem: "Smallholder farmers lack affordable, real-time access to crop health diagnostics and market pricing data, leading to preventable yield loss and poor sale timing.",
  solution: "An AI-powered mobile assistant that uses photos and sensor data to diagnose crop issues instantly and recommends the best time and place to sell, in the farmer's own language.",
  marketNeed: "Over 500M smallholder farms globally lack access to agronomists. Mobile penetration in target regions has grown 40% in 5 years, creating a ready distribution channel.",
  risks: ["Low-connectivity regions may limit real-time AI features", "Farmer trust in AI recommendations takes time to build", "Seasonal usage patterns may affect retention"],
  opportunities: ["Partnerships with agri-cooperatives for distribution", "Government subsidy programs for agri-tech adoption", "Expansion into supply chain financing"],
  score: 82,
  potential: "High Potential",
  deltaPts: 12,
  summary: "Your startup shows strong potential based on market demand, feasibility, and overall viability.",
  metrics: [
    { label: "Market Demand", value: 85, color: "#22C55E" },
    { label: "Problem-Solution Fit", value: 80, color: "#3B82F6" },
    { label: "Market Size", value: 78, color: "#A855F7" },
    { label: "Competition", value: 72, color: "#F97316" },
    { label: "Go-to-Market Fit", value: 82, color: "#14B8A6" },
    { label: "Financial Viability", value: 86, color: "#F59E0B" },
  ],
  trend: [
    { date: "Jan", value: 55 }, { date: "Feb", value: 62 }, { date: "Mar", value: 68 },
    { date: "Apr", value: 73 }, { date: "May", value: 78 }, { date: "Jun", value: 82 },
  ],
  insights: [
    "High market demand for AI-powered farming insights continues to grow.",
    "Strong problem-solution fit validated by early farmer feedback.",
    "Large and expanding total addressable market across smallholder regions.",
    "Clear differentiation opportunity in the underserved smallholder segment.",
    "Healthy unit economics potential with a scalable subscription model.",
  ],
  drivers: [
    { icon: "📊", label: "Market Demand", impact: "High Impact", impactColor: "text-success bg-success/15", desc: "Strong search trends and farmer interest indicate significant demand." },
    { icon: "🧩", label: "Problem-Solution Fit", impact: "High Impact", impactColor: "text-success bg-success/15", desc: "Solution directly addresses key pain points with a clear value proposition." },
    { icon: "👥", label: "Competition", impact: "Medium Impact", impactColor: "text-warning bg-warning/15", desc: "Moderate competition with room for differentiation via localization." },
    { icon: "💰", label: "Financial Viability", impact: "High Impact", impactColor: "text-success bg-success/15", desc: "Attractive margins and a scalable subscription revenue model." },
  ],
};

export const competitorOverview = {
  topAnalyzed: 6,
  marketConcentration: "Moderate",
  hhiScore: 1250,
  position: "Strong",
  positionDetail: "Top 2 in 4 of 6 categories",
  advantage: "AI-Powered Insights",
  advantageDetail: "Differentiated & Defensible",
};

export const competitorPositioning = [
  { name: "Caelosphere AI", x: 88, y: 90, you: true },
  { name: "InsightFlow", x: 70, y: 78 },
  { name: "DataMind", x: 35, y: 80 },
  { name: "MetricLab", x: 30, y: 35 },
  { name: "AnalytixPro", x: 38, y: 28 },
  { name: "ViewPoint AI", x: 72, y: 32 },
];

export const featureComparison = {
  competitors: ["Caelosphere AI", "InsightFlow", "DataMind", "MetricLab", "AnalytixPro", "ViewPoint AI"],
  rows: [
    { feature: "AI-Powered Insights", values: [true, true, true, false, false, true] },
    { feature: "Market Intelligence", values: [true, true, true, true, false, true] },
    { feature: "Predictive Analytics", values: [true, false, true, true, true, false] },
    { feature: "Real-time Data", values: [true, true, true, false, true, true] },
    { feature: "Custom Reports", values: [true, true, true, true, true, false] },
    { feature: "Team Collaboration", values: [true, true, false, true, true, false] },
    { feature: "API Integration", values: [true, true, false, true, false, true] },
    { feature: "Pricing (Starting at)", values: ["$49/mo", "$69/mo", "$79/mo", "$39/mo", "$29/mo", "$59/mo"], isPrice: true },
  ],
};

export const competitorOpportunities = [
  { title: "Underserved Mid-Market Segment", desc: "Limited AI-powered solutions tailored for mid-market companies." },
  { title: "Advanced Predictive Capabilities", desc: "Opportunity to lead with more accurate and explainable predictions." },
  { title: "Integration Ecosystem", desc: "Expand integrations with popular tools to increase stickiness." },
];

export const competitorThreats = [
  { title: "New Entrants with VC Backing", desc: "2 new AI startups have raised $10M+ in the last 6 months." },
  { title: "Feature Parity Risk", desc: "Competitors are quickly closing the AI feature gap." },
  { title: "Pricing Pressure", desc: "Low-cost players may drive price sensitivity in the market." },
];

export const competitorTakeaway = {
  text: "Caelosphere AI is well-positioned with a strong product and differentiated AI capabilities. Focus on expanding market presence and deepening integrations to strengthen your lead.",
  actions: ["Invest in predictive accuracy and explainability", "Expand integrations with top 5 business tools", "Launch targeted campaigns for the mid-market segment"],
};

export const swotData = {
  strengths: { score: 8.6, items: ["Strong AI-powered analytics technology", "High accuracy and predictive capabilities", "Experienced founding team with domain expertise", "Scalable cloud-native architecture", "Early product-market fit validation", "Strategic partnerships and integrations"] },
  weaknesses: { score: 6.2, items: ["Limited brand awareness in the market", "Dependence on third-party data sources", "High customer acquisition costs", "Complex onboarding for new users", "Limited resources for rapid expansion", "Early-stage financial resources"] },
  opportunities: { score: 8.9, items: ["Growing demand for AI-driven insights", "Expansion into adjacent market segments", "Strategic partnerships and integrations", "Increasing adoption of data analytics tools", "Global market expansion opportunities", "Regulatory tailwinds for data-driven solutions"] },
  threats: { score: 7.1, items: ["Intense competition from well-funded players", "Rapidly evolving technology landscape", "Data privacy and regulatory changes", "Economic downturn affecting tech spending", "Talent acquisition and retention challenges", "Platform dependency and vendor risks"] },
  overall: 7.7,
  assessment: "Strong Position",
  takeaway: "Leverage your strong technology and market opportunities while addressing brand awareness and customer acquisition challenges to accelerate growth and market leadership.",
  recommendedActions: ["Invest in brand building and market awareness", "Optimize customer acquisition strategy", "Strengthen competitive differentiation", "Expand strategic partnerships", "Enhance onboarding and user experience"],
};

export const leanCanvasBlocks = [
  { num: 1, title: "Problem", icon: "❓", color: "text-error", items: [{ t: "Lack of actionable market insights", positive: false }, { t: "Time-consuming data analysis", positive: false }, { t: "High cost of traditional market research tools", positive: false }] },
  { num: 2, title: "Solution", icon: "✅", color: "text-success", items: [{ t: "AI-powered analytics and insights", positive: true }, { t: "Automated data collection and analysis", positive: true }, { t: "Affordable, scalable platform for businesses of all sizes", positive: true }] },
  { num: 3, title: "Unique Value Proposition", icon: "💎", color: "text-primary", highlight: "We empower businesses with AI-driven market intelligence that is accurate, affordable, and actionable." },
  { num: 4, title: "Unfair Advantage", icon: "🏆", color: "text-warning", items: [{ t: "Proprietary AI models trained on diverse datasets", positive: false, neutral: true }, { t: "Real-time insights with high accuracy", positive: false, neutral: true }, { t: "Strong founding team with domain expertise", positive: false, neutral: true }] },
  { num: 5, title: "Customer Segments", icon: "👥", color: "text-blue-400", items: [{ t: "Small & medium businesses", neutral: true }, { t: "Marketing & strategy professionals", neutral: true }, { t: "Consultants & market research firms", neutral: true }] },
  { num: 6, title: "Channels", icon: "🚚", color: "text-blue-400", items: [{ t: "Direct sales & partnerships", neutral: true }, { t: "Content marketing & SEO", neutral: true }, { t: "Product-led growth", neutral: true }, { t: "Industry events & webinars", neutral: true }] },
  { num: 7, title: "Key Metrics", icon: "📶", color: "text-warning", items: [{ t: "Monthly recurring revenue (MRR)", neutral: true }, { t: "Customer acquisition cost (CAC)", neutral: true }, { t: "Churn rate", neutral: true }, { t: "Active users & engagement", neutral: true }] },
  { num: 8, title: "Cost Structure", icon: "💲", color: "text-error", items: [{ t: "AI/ML infrastructure", positive: false }, { t: "Data acquisition & licensing", positive: false }, { t: "Product development", positive: false }, { t: "Sales & marketing", positive: false }, { t: "Team & operations", positive: false }] },
  { num: 9, title: "Revenue Streams", icon: "💰", color: "text-success", items: [{ t: "SaaS subscriptions (monthly/annual)", positive: true }, { t: "Premium features & add-ons", positive: true }, { t: "Custom reports & consulting", positive: true }, { t: "Data API access", positive: true }] },
];

export const leanCanvasSummary = {
  text: "Your business model is well-structured with a strong value proposition and scalable solution. Focus on customer acquisition and partnerships to accelerate growth.",
  validationStatus: "Strong",
  validatedBlocks: "8 / 9 blocks validated",
  fitPct: 82,
  fitLabel: "High Potential",
  fitDetail: "Great alignment across key components",
  nextStep: "Proceed to Go-to-Market strategy",
};

export const mvpFeatures = [
  { feature: "AI Market Insights", desc: "AI-powered market analysis and trends", value: "High", effort: "M", priority: 5 },
  { feature: "Competitor Tracking", desc: "Real-time competitor monitoring", value: "High", effort: "M", priority: 5 },
  { feature: "Smart Reports", desc: "Automated insights and reporting", value: "High", effort: "M", priority: 4 },
  { feature: "Data Visualization", desc: "Interactive charts and dashboards", value: "Medium", effort: "S", priority: 4 },
  { feature: "Export & Sharing", desc: "Export reports and share insights", value: "Medium", effort: "S", priority: 3 },
  { feature: "User Authentication", desc: "Secure user accounts and profiles", value: "Medium", effort: "S", priority: 3 },
];

export const mvpRoadmapPhases = [
  { phase: "Phase 1: Foundation", weeks: "Weeks 1-4", icon: "🚀", items: ["Core infrastructure and setup", "AI data integration and processing"] },
  { phase: "Phase 2: Core Features", weeks: "Weeks 5-8", icon: "💻", items: ["Build must-have features", "Basic UI/UX implementation"] },
  { phase: "Phase 3: Validation", weeks: "Weeks 9-12", icon: "🧪", items: ["Testing and quality assurance", "Beta testing with early users"] },
  { phase: "Phase 4: Launch", weeks: "Weeks 13-14", icon: "📈", items: ["Production deployment", "Monitor and iterate"] },
];

export const mvpPrioritization = {
  quickWins: ["Export & Sharing", "User Auth"],
  majorProjects: ["AI Market Insights", "Competitor Tracking", "Smart Reports"],
  fillIns: ["Data Visualization"],
  lowPriority: [],
};

export const mvpScore = {
  value: 8.2,
  label: "Strong MVP Potential",
  breakdown: [
    { label: "Market Need", value: 8.5, color: "#22C55E" },
    { label: "Feasibility", value: 8.0, color: "#3B82F6" },
    { label: "Viability", value: 8.0, color: "#A855F7" },
    { label: "Differentiation", value: 8.5, color: "#F59E0B" },
  ],
};

export const mvpScopeRecommendation = {
  scope: "Focused",
  detail: "This scope balances impact with development feasibility and time to market.",
  coreFeatures: 6,
  estimatedTime: "12-14 weeks",
  devCost: "$75K - $95K",
};

export const mvpSuccessMetrics = [
  { icon: "📈", label: "User Adoption", target: "1,000+ active users", kpi: "User Signups" },
  { icon: "🔁", label: "Engagement", target: "60%+ weekly retention", kpi: "Weekly Retention" },
  { icon: "🎯", label: "Value Delivery", target: "80%+ report accuracy", kpi: "Report Accuracy" },
  { icon: "💵", label: "Business Impact", target: "$50K+ MRR in 6 months", kpi: "Monthly Revenue" },
];

export const mvpNextSteps = [
  "Review and validate core features with stakeholders",
  "Create detailed user stories and requirements",
  "Set up development environment and tools",
  "Start Phase 1: Foundation development",
];

export const brandingData = {
  names: ["FarmAI", "Harvestly", "AgroSense", "CropPilot", "Fielda", "GrowMate", "PlantPulse", "YieldWise", "AgriLume", "RootSignal"],
  taglines: [
    "Your crop's health, in your pocket.",
    "See the problem before it spreads.",
    "Smarter farming starts with a photo.",
    "From soil to sale, guided by AI.",
    "Healthier crops. Higher yields. Happier farmers.",
  ],
  voice: "Warm, practical, and encouraging — like a trusted local agronomist who happens to carry an AI brain. Plain language, no jargon, always actionable.",
  colors: [
    { name: "Harvest Green", hex: "#3FA34D" },
    { name: "Soil Brown", hex: "#7A5230" },
    { name: "Sunlight Yellow", hex: "#F2C14E" },
    { name: "Sky Blue", hex: "#5AA9E6" },
    { name: "Cream", hex: "#FBF3E3" },
  ],
  logoPrompt: "A minimalist circular emblem combining a stylized leaf and a subtle circuit-line pattern, flat vector style, green and warm yellow palette, friendly and approachable, no text.",
};

export const roadmapData = [
  { month: "Month 1", title: "Research", items: ["Farmer interviews (50+)", "Competitor teardown", "Crop dataset sourcing"] },
  { month: "Month 2", title: "Development", items: ["Build diagnosis MVP", "Offline-first architecture", "Pilot agronomist partnerships"] },
  { month: "Month 3", title: "Beta Testing", items: ["50-farmer closed beta", "Accuracy tuning", "Cooperative onboarding flow"] },
  { month: "Month 4", title: "Launch", items: ["Public launch in 2 regions", "Press + agri-network outreach", "First revenue cohort"] },
];
