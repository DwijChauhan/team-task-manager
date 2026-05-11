"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [firstName, setFirstName] = useLocalStorage("taskflow_firstName", "Dwij");
  const [lastName, setLastName] = useLocalStorage("taskflow_lastName", "Chauhan");
  const [bio, setBio] = useLocalStorage("taskflow_bio", "Product Manager working on the new tier-2 expansion project.");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!mounted) {
    return <div className="max-w-4xl mx-auto space-y-6 p-4">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="font-h1 text-h1 text-on-surface">Settings</h1>
        <p className="font-body-base text-body-base text-on-surface-variant mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            {["Profile", "Account", "Notifications", "Appearance"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface-variant hover:bg-surface-container-highest"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-6">
          {activeTab === "Profile" && (
            <form onSubmit={handleSave} className="space-y-6">
              <h2 className="text-lg font-semibold text-on-surface mb-4">Public Profile</h2>
              
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS15ClPCyIoC38qxVoG3pwTQ6Bc0iPvpG9LjflH2_gSDrG9XZ5SIrGS41pKAcRSN_HSMSgYKDHHF21whbsz9p5G1MJKzZOtyljJqW_VS19N35OydC6ev7bSiSWrKwTKCN4WQtR9K5LBXNllUC0StzGxqMegamKobY5q0MhWY1YbRj0IkwXrAez5bVEY8LDnty9F9zdvmVp2edbFMsgHJc10j9LOVbTLfs7co-7qwyNn07HlbLl8fSg993wNOAmLJWMTC2oy0rST8U5"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button type="button" className="px-4 py-2 border border-outline-variant rounded-md text-sm font-medium hover:bg-surface-container transition-colors">
                  Change Avatar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-on-surface-variant">First Name</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-on-surface-variant">Last Name</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-on-surface-variant">Bio</label>
                <textarea rows={4} value={bio} onChange={e => setBio(e.target.value)} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                {saveSuccess ? (
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Saved successfully!
                  </span>
                ) : <span></span>}
                <button type="submit" className="px-6 py-2 bg-primary text-on-primary rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab !== "Profile" && (
            <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-4 opacity-50">construction</span>
              <p>The {activeTab} settings are currently under construction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
