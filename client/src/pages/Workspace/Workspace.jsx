import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Download, Share2, Loader2, Sparkles, RefreshCw } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import WorkspaceHome from "./WorkspaceOverview";
import OverviewTab from "./tabs/OverviewTab";
import ValidationTab from "./tabs/ValidationTab";
import CompetitorsTab from "./tabs/CompetitorsTab";
import SwotTab from "./tabs/SwotTab";
import LeanCanvasTab from "./tabs/LeanCanvasTab";
import MvpTab from "./tabs/MvpTab";
import BrandingTab from "./tabs/BrandingTab";
import RoadmapTab from "./tabs/RoadmapTab";
import { projects as projectsApi, reports as reportsApi } from "../../lib/api";

const tabs = [
  { key: "home", label: "Home" },
  { key: "overview", label: "Overview" },
  { key: "validation", label: "Validation" },
  { key: "competitors", label: "Competitors" },
  { key: "swot", label: "SWOT" },
  { key: "leancanvas", label: "Lean Canvas" },
  { key: "mvp", label: "MVP Plan" },
  { key: "branding", label: "Branding" },
  { key: "roadmap", label: "Roadmap" },
];

// Tabs whose content actually comes from the real Gemini report.
// Branding and Roadmap aren't generated yet, so they keep their own
// static placeholder content regardless of report state.
const AI_TABS = ["validation", "competitors", "swot", "leancanvas", "mvp"];

export default function Workspace() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const initialTab = params.get("tab") || "home";
  const [active, setActive] = useState(tabs.find((t) => t.key === initialTab) ? initialTab : "home");

  const [project, setProject] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState("");

  const loadAll = useCallback(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    Promise.all([
      projectsApi.get(id).then((res) => setProject(res.data)),
      reportsApi
        .get(id)
        .then((res) => setReport(res.data))
        .catch(() => setReport(null)), // no report yet is expected, not an error
    ])
      .catch((err) => setError(err.message || "Could not load this project."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  async function runAnalysis() {
    setAnalyzing(true);
    setAnalyzeError("");
    try {
      const res = await reportsApi.analyze(id);
      setReport(res.data);
      const refreshed = await projectsApi.get(id);
      setProject(refreshed.data);
    } catch (err) {
      setAnalyzeError(err.message || "AI analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  }

  if (active === "home") {
    return <WorkspaceHome onOpenTab={setActive} />;
  }

  if (loading) {
    return (
      <DashboardLayout title="Loading..." subtitle="Fetching your startup workspace.">
        <div className="flex items-center justify-center gap-2 text-textSecondary py-24">
          <Loader2 size={18} className="animate-spin" /> Loading workspace...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Workspace" subtitle="Something went wrong.">
        <div className="bg-error/10 border border-error/30 text-error text-sm rounded-card px-5 py-4">{error}</div>
      </DashboardLayout>
    );
  }

  const displayName = project?.title || "Untitled Startup";
  const displaySubtitle = project?.tagline || project?.description || "";
  const displayScore = project?.startupScore ?? "—";

  const action = (
    <div className="flex items-center gap-2">
      <button className="border border-border hover:bg-surface2 transition-colors text-sm font-medium px-3.5 py-2 rounded-btn flex items-center gap-1.5">
        <Share2 size={15} /> Share
      </button>
      <button
        onClick={runAnalysis}
        disabled={analyzing}
        className="bg-primary hover:bg-primaryHover transition-colors text-white text-sm font-medium px-3.5 py-2 rounded-btn flex items-center gap-1.5 disabled:opacity-60"
      >
        {analyzing ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />}
        {analyzing ? "Analyzing..." : report ? "Run New Analysis" : "Run AI Analysis"}
      </button>
      <button className="border border-border hover:bg-surface2 transition-colors text-sm font-medium px-3.5 py-2 rounded-btn flex items-center gap-1.5">
        <Download size={15} /> Export
      </button>
    </div>
  );

  const needsReport = AI_TABS.includes(active) && !report;

  return (
    <DashboardLayout title={displayName} subtitle={displaySubtitle} action={action}>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-medium bg-primary/15 text-primary px-3 py-1 rounded-full">Score {displayScore}</span>
        {project?.industry && <span className="text-xs font-medium bg-surface2 text-textSecondary px-3 py-1 rounded-full">{project.industry}</span>}
      </div>

      <div className="flex items-center gap-1 mb-6 border-b border-border overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
            ${active === t.key ? "border-primary text-primary" : "border-transparent text-textSecondary hover:text-textPrimary"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {analyzeError && (
        <div className="bg-error/10 border border-error/30 text-error text-sm rounded-card px-5 py-4 mb-5">{analyzeError}</div>
      )}

      {needsReport ? (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-surface2 border border-border rounded-card">
          <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center mb-4">
            <Sparkles size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-1">No AI Analysis Yet</h3>
          <p className="text-textSecondary text-sm mb-6 max-w-sm">
            Run the AI analysis to generate real validation, competitor, SWOT, lean canvas, and MVP insights for this startup.
          </p>
          <button
            onClick={runAnalysis}
            disabled={analyzing}
            className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn flex items-center gap-2 disabled:opacity-60"
          >
            {analyzing ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {analyzing ? "Analyzing..." : "Run AI Analysis"}
          </button>
        </div>
      ) : (
        <>
          {active === "overview" && <OverviewTab project={project} report={report} />}
          {active === "validation" && <ValidationTab data={report?.validation} />}
          {active === "competitors" && <CompetitorsTab data={report?.competitors} projectName={displayName} />}
          {active === "swot" && <SwotTab data={report?.swot} />}
          {active === "leancanvas" && <LeanCanvasTab data={report?.leanCanvas} />}
          {active === "mvp" && <MvpTab data={report?.mvpPlan} />}
          {active === "branding" && <BrandingTab />}
          {active === "roadmap" && <RoadmapTab />}
        </>
      )}
    </DashboardLayout>
  );
}
