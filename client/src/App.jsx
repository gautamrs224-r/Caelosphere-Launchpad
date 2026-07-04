import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Analytics from "./pages/Dashboard/Analytics";
import Projects from "./pages/Dashboard/Projects";
import PlaceholderPage from "./pages/Dashboard/PlaceholderPage";
import WizardRoutes from "./pages/Dashboard/wizard/WizardRoutes";
import Workspace from "./pages/Workspace/Workspace";
import Settings from "./pages/Settings/Settings";

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/launchpad/*" element={<ProtectedRoute><WizardRoutes /></ProtectedRoute>} />
          <Route path="/workspace" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
          <Route path="/workspace/:id" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          <Route
            path="/history"
            element={<ProtectedRoute><PlaceholderPage title="History" subtitle="Track changes across your projects." icon="🕓" emptyTitle="No History Yet" emptyDesc="Once you start creating and updating startups, your activity history will show up here." /></ProtectedRoute>}
          />
          <Route
            path="/exports"
            element={<ProtectedRoute><PlaceholderPage title="Exports" subtitle="Download your reports and plans." icon="📥" emptyTitle="No Exports Yet" emptyDesc="Export your startup reports as PDF, DOCX, or Markdown once they're ready." /></ProtectedRoute>}
          />
          <Route
            path="/reports"
            element={<ProtectedRoute><PlaceholderPage title="Reports" subtitle="AI-generated analysis reports." icon="📄" emptyTitle="No Reports Yet" emptyDesc="Generate your first AI-powered startup report from the Launchpad." /></ProtectedRoute>}
          />

          <Route path="*" element={<PlaceholderPage title="Not Found" subtitle="This page doesn't exist." icon="🚀" emptyTitle="Page Not Found" emptyDesc="Let's get you back on track." />} />
        </Routes>
      </HashRouter>
      </AuthProvider>
    </ToastProvider>
  );
}
