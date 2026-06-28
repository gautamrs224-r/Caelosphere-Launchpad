import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout, { defaultPerks } from "./AuthLayout";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout perks={defaultPerks}>
      <div className="lg:hidden flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white">C</div>
        <p className="font-semibold">Caelosphere Launchpad</p>
      </div>

      <h2 className="text-2xl font-bold mb-1">Welcome back 👋</h2>
      <p className="text-textSecondary text-sm mb-7">Log in to continue your startup journey.</p>

      {error && (
        <div className="bg-error/10 border border-error/30 text-error text-sm rounded-btn px-4 py-3 mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="text-sm font-medium block mb-1.5">Email address</label>
          <div className="flex items-center gap-2 bg-surface border border-border rounded-btn px-3.5 py-3 focus-within:border-primary">
            <Mail size={16} className="text-textSecondary" />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium">Password</label>
            <a href="#" className="text-xs text-primary">Forgot password?</a>
          </div>
          <div className="flex items-center gap-2 bg-surface border border-border rounded-btn px-3.5 py-3 focus-within:border-primary">
            <Lock size={16} className="text-textSecondary" />
            <input
              type={showPw ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              className="bg-transparent outline-none flex-1 text-sm"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="text-textSecondary">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-textSecondary">
          <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" /> Remember me
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primaryHover transition-colors text-white font-medium py-3.5 rounded-btn flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in →"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px bg-border flex-1" /><span className="text-xs text-textSecondary">OR CONTINUE WITH</span><div className="h-px bg-border flex-1" />
      </div>
      <button className="w-full border border-border rounded-btn py-3 flex items-center justify-center gap-2 text-sm hover:bg-surface transition-colors">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="google" /> Continue with Google
      </button>

      <p className="text-center text-sm text-textSecondary mt-7">
        Don't have an account? <Link to="/register" className="text-primary font-medium">Sign up</Link>
      </p>
    </AuthLayout>
  );
}
