import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "./AuthLayout";
import { Brain, Rocket, BarChart3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const perks = [
  { icon: Brain, title: "AI-Powered Insights", desc: "Validate ideas, analyze markets, and discover opportunities." },
  { icon: Rocket, title: "Smart Roadmaps", desc: "Get step-by-step plans for MVP, growth, and successful launch." },
  { icon: BarChart3, title: "Launch & Grow", desc: "Everything you need to go from idea to a scalable startup." },
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast({ message: "Account created! Welcome to Caelosphere 🚀", type: "success" });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout perks={perks}>
      <div className="lg:hidden flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white">C</div>
        <p className="font-semibold">Caelosphere Launchpad</p>
      </div>

      <h2 className="text-2xl font-bold mb-1">Create your account ✨</h2>
      <p className="text-textSecondary text-sm mb-7">Start your startup journey today.</p>

      {error && (
        <div className="bg-error/10 border border-error/30 text-error text-sm rounded-btn px-4 py-3 mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium block mb-1.5">Full name</label>
          <div className="flex items-center gap-2 bg-surface border border-border rounded-btn px-3.5 py-3 focus-within:border-primary">
            <User size={16} className="text-textSecondary" />
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your full name"
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Email address</label>
          <div className="flex items-center gap-2 bg-surface border border-border rounded-btn px-3.5 py-3 focus-within:border-primary">
            <Mail size={16} className="text-textSecondary" />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email address"
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Password</label>
          <div className="flex items-center gap-2 bg-surface border border-border rounded-btn px-3.5 py-3 focus-within:border-primary">
            <Lock size={16} className="text-textSecondary" />
            <input
              type={showPw ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Create a password"
              className="bg-transparent outline-none flex-1 text-sm"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="text-textSecondary">{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
          </div>
          <p className="text-xs text-textSecondary mt-1">At least 8 characters</p>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Confirm password</label>
          <div className="flex items-center gap-2 bg-surface border border-border rounded-btn px-3.5 py-3 focus-within:border-primary">
            <Lock size={16} className="text-textSecondary" />
            <input
              type={showPw2 ? "text" : "password"}
              required
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              placeholder="Confirm your password"
              className="bg-transparent outline-none flex-1 text-sm"
            />
            <button type="button" onClick={() => setShowPw2(!showPw2)} className="text-textSecondary">{showPw2 ? <EyeOff size={16} /> : <Eye size={16} />}</button>
          </div>
        </div>
        <label className="flex items-start gap-2 text-sm text-textSecondary">
          <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 mt-0.5" />
          I agree to the <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primaryHover transition-colors text-white font-medium py-3.5 rounded-btn flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account →"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px bg-border flex-1" /><span className="text-xs text-textSecondary">OR SIGN UP WITH</span><div className="h-px bg-border flex-1" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <button className="border border-border rounded-btn py-2.5 flex items-center justify-center text-sm hover:bg-surface transition-colors">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="google" />
        </button>
        <button className="border border-border rounded-btn py-2.5 flex items-center justify-center text-sm hover:bg-surface transition-colors">
          <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-4 h-4 invert" alt="github" />
        </button>
        <button className="border border-border rounded-btn py-2.5 flex items-center justify-center text-sm hover:bg-surface transition-colors">
          <img src="https://www.svgrepo.com/show/452062/microsoft.svg" className="w-4 h-4" alt="microsoft" />
        </button>
      </div>

      <p className="text-center text-sm text-textSecondary mt-7">
        Already have an account? <Link to="/login" className="text-primary font-medium">Log in</Link>
      </p>
    </AuthLayout>
  );
}
