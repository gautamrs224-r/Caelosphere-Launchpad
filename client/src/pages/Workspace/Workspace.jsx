import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Download, Share2, Loader2, Sparkles, RefreshCw, ChevronDown } from "lucide-react";
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
import { useToast } from "../../context/ToastContext";
import { downloadMarkdown, downloadPDF } from "../../lib/exportUtils";

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

const AI_TABS = ["validation", "competitors", "swot", "leancanvas", "mvp", "branding", "roadmap"];

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
  const [exportOpen, setExportOpen] = useState(false);

  const toast = useToast();

  const loadAll = useCallback(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    Promise.all([
      projectsApi.get(id).then((res) => setProject(res.data)),
      reportsApi.get(id).then((res) => setReport(res.data)).catch(() => setReport(null)),
    ])
      .catch((err) => setError(err.message || "Could not load this project."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { loadAll(); }, [loadAll]);

  useEffect(() => {
    function close() { setExportOpen(false); }
    if (exportOpen) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [exportOpen]);

  async function runAnalysis() {
    setAnalyzing(true);
    setAnalyzeError("");
    try {
      const res = await reportsApi.analyze(id);
      setReport(res.data);
      const refreshed = await projectsApi.get(id);
      setProject(refreshed.data);
      toast({ message: "AI analysis complete! ✨", type: "success" });
    } catch (err) {
      setAnalyzeError(err.message || "AI analysis failed.");
      toast({ message: err.message || "AI analysis failed.", type: "error" });
    } finally {
      setAnalyzing(false);
    }
  }

  if (active === "home") {
    return <WorkspaceHome onOpenTab={setActive} />;
  }

  if (loading) {
    return (
      <DashboardLayout title="Loading..." subtitle="Fetching workspace.">
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

  // ── Responsive action bar ──
  // On mobile: icon-only for Share + Export, short label for Analyze
  // On sm+: full text labels
  const action = (
    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
      {/* Share — icon-only on mobile */}
      <button className="border border-border hover:bg-surface2 transition-colors p-2 sm:px-3.5 sm:py-2 rounded-btn flex items-center gap-1.5">
        <Share2 size={15} />
        <span className="hidden sm:inline text-sm font-medium">Share</span>
      </button>

      {/* Run Analysis */}
      <button
        onClick={runAnalysis}
        disabled={analyzing}
        className="bg-primary hover:bg-primaryHover transition-colors text-white text-xs sm:text-sm font-medium px-2.5 sm:px-3.5 py-2 rounded-btn flex items-center gap-1.5 disabled:opacity-60 whitespace-nowrap"
      >
        {analyzing ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
        <span className="hidden xs:inline">
          {analyzing ? "Analyzing..." : report ? "Re-Analyze" : "Run AI"}
        </span>
      </button>

      {/* Export dropdown */}
      <div className="relative">
        <button
          onClick={(e) => { e.stopPropagation(); setExportOpen((v) => !v); }}
          disabled={!report}
          className="border border-border hover:bg-surface2 transition-colors p-2 sm:px-3.5 sm:py-2 rounded-btn flex items-center gap-1.5 disabled:opacity-40"
        >
          <Download size={15} />
          <span className="hidden sm:inline text-sm font-medium">Export</span>
          <ChevronDown size={13} className="hidden sm:inline" />
        </button>
        {exportOpen && (
          <div className="absolute right-0 top-full mt-1.5 bg-surface border border-border rounded-card shadow-soft w-44 z-50 py-1">
            <button
              onClick={() => {
                downloadMarkdown(project, report);
                setExportOpen(false);
                toast({ message: "Markdown exported!", type: "success" });
              }}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-surface2 transition-colors"
            >
              📄 Markdown (.md)
            </button>
            <button
              onClick={() => {
                downloadPDF(project, report);
                setExportOpen(false);
                toast({ message: "PDF opened in print dialog!", type: "success" });
              }}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-surface2 transition-colors"
            >
              🖨️ PDF (Print)
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const needsReport = AI_TABS.includes(active) && !report;

  return (
    <DashboardLayout title={displayName} subtitle={displaySubtitle} action={action}>
      {/* Score badges */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-xs font-medium bg-primary/15 text-primary px-3 py-1 rounded-full">
          Score {displayScore}
        </span>
        {project?.industry && (
          <span className="text-xs font-medium bg-surface2 text-textSecondary px-3 py-1 rounded-full">
            {project.industry}
          </span>
        )}
      </div>

      {/* Tab bar — horizontally scrollable on mobile */}
      <div className="flex items-center gap-0 mb-6 border-b border-border overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0
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
        <div className="flex flex-col items-center justify-center text-center py-16 bg-surface2 border border-border rounded-card px-4">
          <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center mb-4">
            <Sparkles size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-1">No AI Analysis Yet</h3>
          <p className="text-textSecondary text-sm mb-6 max-w-sm">
            Run the AI analysis to generate real validation, competitor, SWOT, lean canvas, and MVP insights.
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
          {active === "branding" && <BrandingTab data={report?.branding} />}
          {active === "roadmap" && <RoadmapTab data={report?.roadmap} />}
        </>
      )}
    </DashboardLayout>
  );
}
