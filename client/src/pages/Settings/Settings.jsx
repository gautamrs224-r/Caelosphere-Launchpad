import { useState } from "react";
import { User, Lock, Palette, Bell } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useToast } from "../../context/ToastContext";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "password", label: "Password", icon: Lock },
  { key: "theme", label: "Theme", icon: Palette },
  { key: "notifications", label: "Notifications", icon: Bell },
];

export default function Settings() {
  const [active, setActive] = useState("profile");
  const toast = useToast();

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account preferences.">
      {/* On mobile: tabs go horizontal at top. On lg: sidebar left + content right */}
      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-5">

        {/* Tab navigation */}
        <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-btn text-sm whitespace-nowrap flex-shrink-0 lg:w-full transition-colors
              ${active === t.key
                ? "bg-primary/15 text-primary font-medium"
                : "text-textSecondary hover:bg-surface"}`}
            >
              <t.icon size={15} className="flex-shrink-0" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="lg:col-span-3 bg-surface border border-border rounded-card p-5 sm:p-6">

          {active === "profile" && (
            <div>
              <h3 className="font-semibold mb-5">Profile</h3>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://i.pravatar.cc/100?img=13"
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  alt="avatar"
                />
                <button className="border border-border rounded-btn px-4 py-2 text-sm hover:bg-surface2">
                  Change Photo
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Full Name</label>
                  <input
                    defaultValue="Alex Johnson"
                    className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Email</label>
                  <input
                    defaultValue="alex@example.com"
                    type="email"
                    className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={() => toast({ message: "Profile saved!", type: "success" })}
                className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn"
              >
                Save Changes
              </button>
            </div>
          )}

          {active === "password" && (
            <div>
              <h3 className="font-semibold mb-5">Password</h3>
              <div className="flex flex-col gap-4 max-w-sm">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Current Password</label>
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">New Password</label>
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={() => toast({ message: "Password updated!", type: "success" })}
                className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn mt-6"
              >
                Update Password
              </button>
            </div>
          )}

          {active === "theme" && (
            <div>
              <h3 className="font-semibold mb-5">Theme</h3>
              <div className="flex gap-4 flex-wrap">
                <button className="border-2 border-primary rounded-card p-4 w-28 bg-bg text-center text-sm font-medium text-primary">
                  Dark
                </button>
                <button className="border border-border rounded-card p-4 w-28 bg-white text-bg text-center text-sm font-medium">
                  Light
                </button>
              </div>
              <p className="text-xs text-textSecondary mt-4">Light mode coming soon.</p>
            </div>
          )}

          {active === "notifications" && (
            <div>
              <h3 className="font-semibold mb-5">Notifications</h3>
              {[
                { label: "Email notifications", desc: "Receive updates and reports by email" },
                { label: "Push notifications", desc: "In-app alerts and reminders" },
                { label: "Weekly summary", desc: "A weekly digest of your startup activity" },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-textSecondary">{n.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}
