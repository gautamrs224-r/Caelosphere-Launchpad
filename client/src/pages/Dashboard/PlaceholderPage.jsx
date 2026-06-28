import DashboardLayout from "../../layouts/DashboardLayout";

export default function PlaceholderPage({ title, subtitle, emptyTitle, emptyDesc, icon = "📁" }) {
  return (
    <DashboardLayout title={title} subtitle={subtitle}>
      <div className="flex flex-col items-center justify-center text-center py-24 bg-surface border border-border rounded-card">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-1">{emptyTitle}</h3>
        <p className="text-textSecondary text-sm mb-6 max-w-sm">{emptyDesc}</p>
        <button className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn">
          Create Your First Startup
        </button>
      </div>
    </DashboardLayout>
  );
}
