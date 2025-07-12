import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Lock, Brush, Info } from "lucide-react";

const SettingsPage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("about");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "privacy":
        return (
          <div className="p-4 text-sm text-gray-200 space-y-2">
            <h3 className="text-lg font-semibold mb-2">Privacy</h3>
            <p>🔒 Manage your account privacy.</p>
            <p>🔐 Enable two-factor authentication.</p>
            <p>📁 Download your data.</p>
          </div>
        );
      case "personalize":
        return (
          <div className="p-4 text-sm text-gray-200 space-y-2">
            <h3 className="text-lg font-semibold mb-2">Personalize</h3>
            <p>🎨 Choose your theme.</p>
            <p>🖼️ Customize background.</p>
            <p>🌐 Set your language preference.</p>
          </div>
        );
      case "about":
        return (
          <div className="p-4 text-sm text-gray-200 space-y-2">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p>ℹ️ App version: 1.0.0</p>
            <p>🛠️ Developed by Akash Jaiswal, Suman Maharana, Abhimanyu</p>
            <p>📄 Terms of Service</p>
          </div>
        );
      default:
        return null;
    }
  };

    if (!mounted) return null;

  return createPortal(
    <>
      {/* Settings modal */}
      <div className="fixed bottom-6 left-20 z-[999999] flex rounded-2xl overflow-hidden bg-black/50 backdrop-blur-md shadow-2xl border border-white/10 w-[400px] h-[500px]" style={{ position: 'fixed', zIndex: 999999 }}>
        {/* Sidebar */}
        <div className="w-1/3 bg-black/1 backdrop-blur-md text-white flex flex-col py-4 px-3 gap-6 border-r border-white/10">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-2 text-sm px-2 py-1 rounded-md transition hover:bg-[#585858] ${
              activeTab === "privacy" ? "bg-[#585858]" : ""
            }`}
          >
            <Lock size={16} />
            <span>Privacy</span>
          </button>
          <button
            onClick={() => setActiveTab("personalize")}
            className={`flex items-center gap-2 text-sm px-2 py-1 rounded-md transition hover:bg-[#585858] ${
              activeTab === "personalize" ? "bg-[#585858]" : ""
            }`}
          >
            <Brush size={16} />
            <span>Personalize</span>
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center gap-2 text-sm px-2 py-1 rounded-md transition hover:bg-[#585858] ${
              activeTab === "about" ? "bg-[#585858]" : ""
            }`}
          >
            <Info size={16} />
            <span>About</span>
          </button>
        </div>

        {/* Content area */}
        <div className="w-2/3">{renderContent()}</div>
      </div>
    </>,
    document.body
  );
};

export default SettingsPage;
