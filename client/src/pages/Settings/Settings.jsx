import { useState } from "react";
import { User, Lock, Palette, Bell } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "password", label: "Password", icon: Lock },
  { key: "theme", label: "Theme", icon: Palette },
  { key: "notifications", label: "Notifications", icon: Bell },
];

export default function Settings() {
  const [active, setActive] = useState("profile");
  return (
    <DashboardLayout title="Settings" subtitle="Manage your account preferences.">
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-btn text-sm text-left transition-colors
              ${active === t.key ? "bg-primary/15 text-primary font-medium" : "text-textSecondary hover:bg-surface"}`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 bg-surface border border-border rounded-card p-6">
          {active === "profile" && (
            <div>
              <h3 className="font-semibold mb-5">Profile</h3>
              <div className="flex items-center gap-4 mb-6">
                <img src="https://i.pravatar.cc/100?img=13" className="w-16 h-16 rounded-full object-cover" alt="avatar" />
                <button className="border border-border rounded-btn px-4 py-2 text-sm hover:bg-surface2">Change Photo</button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Full Name</label>
                  <input defaultValue="Alex Johnson" className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-2.5 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Email</label>
                  <input defaultValue="alex@example.com" className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-2.5 text-sm outline-none focus:border-primary" />
                </div>
              </div>
              <button className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn mt-6">Save Changes</button>
            </div>
          )}
          {active === "password" && (
            <div>
              <h3 className="font-semibold mb-5">Password</h3>
              <div className="flex flex-col gap-4 max-w-sm">
                <input type="password" placeholder="Current password" className="bg-surface2 border border-border rounded-btn px-3.5 py-2.5 text-sm outline-none focus:border-primary" />
                <input type="password" placeholder="New password" className="bg-surface2 border border-border rounded-btn px-3.5 py-2.5 text-sm outline-none focus:border-primary" />
                <input type="password" placeholder="Confirm new password" className="bg-surface2 border border-border rounded-btn px-3.5 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
              <button className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn mt-6">Update Password</button>
            </div>
          )}
          {active === "theme" && (
            <div>
              <h3 className="font-semibold mb-5">Theme</h3>
              <div className="flex gap-4">
                <button className="border-2 border-primary rounded-card p-4 w-28 bg-bg text-center text-xs">Dark</button>
                <button className="border border-border rounded-card p-4 w-28 bg-white text-bg text-center text-xs">Light</button>
              </div>
            </div>
          )}
          {active === "notifications" && (
            <div>
              <h3 className="font-semibold mb-5">Notifications</h3>
              {["Email notifications", "Push notifications", "Weekly summary"].map((n) => (
                <label key={n} className="flex items-center justify-between py-3 border-b border-border text-sm">
                  {n}
                  <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
