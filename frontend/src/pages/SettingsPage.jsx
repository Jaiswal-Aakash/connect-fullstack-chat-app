import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Lock, Brush, Info, X } from "lucide-react";

const SettingsPage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("about");
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const renderContent = () => {
    switch (activeTab) {
      case "privacy":
        return (
          <div className="p-3 sm:p-4 text-xs sm:text-sm text-gray-200 space-y-2">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Privacy</h3>
            <p>🔒 Manage your account privacy.</p>
            <p>🔐 Enable two-factor authentication.</p>
            <p>📁 Download your data.</p>
          </div>
        );
      case "personalize":
        return (
          <div className="p-3 sm:p-4 text-xs sm:text-sm text-gray-200 space-y-2">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Personalize</h3>
            <p>🎨 Choose your theme.</p>
            <p>🖼️ Customize background.</p>
            <p>🌐 Set your language preference.</p>
          </div>
        );
      case "about":
        return (
          <div className="p-3 sm:p-4 text-xs sm:text-sm text-gray-200 space-y-2">
            <h3 className="text-base sm:text-lg font-semibold mb-2">About</h3>
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
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999998]" />
      
      {/* Settings modal */}
      <div 
        ref={modalRef}
        className="fixed z-[999999] flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-black/50 backdrop-blur-md shadow-2xl border border-white/10 w-[90vw] max-w-[400px] h-[80vh] max-h-[500px] sm:w-[400px] sm:h-[500px] bottom-4 left-4 sm:bottom-6 sm:left-20"
      >
        {/* Mobile Header */}
        <div className="sm:hidden flex justify-between items-center p-3 border-b border-white/10">
          <h2 className="text-white font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Sidebar */}
        <div className="w-full sm:w-1/3 bg-black/1 backdrop-blur-md text-white flex flex-row sm:flex-col py-2 sm:py-4 px-2 sm:px-3 gap-2 sm:gap-6 border-b sm:border-b-0 sm:border-r border-white/10">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 py-1.5 sm:py-1 rounded-md transition hover:bg-[#585858] flex-1 sm:flex-none justify-center sm:justify-start ${
              activeTab === "privacy" ? "bg-[#585858]" : ""
            }`}
          >
            <Lock size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Privacy</span>
            <span className="xs:hidden">Privacy</span>
          </button>
          <button
            onClick={() => setActiveTab("personalize")}
            className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 py-1.5 sm:py-1 rounded-md transition hover:bg-[#585858] flex-1 sm:flex-none justify-center sm:justify-start ${
              activeTab === "personalize" ? "bg-[#585858]" : ""
            }`}
          >
            <Brush size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Personalize</span>
            <span className="xs:hidden">Personalize</span>
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 py-1.5 sm:py-1 rounded-md transition hover:bg-[#585858] flex-1 sm:flex-none justify-center sm:justify-start ${
              activeTab === "about" ? "bg-[#585858]" : ""
            }`}
          >
            <Info size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">About</span>
            <span className="xs:hidden">About</span>
          </button>
        </div>

        {/* Content area */}
        <div className="w-full sm:w-2/3 flex-1 overflow-y-auto">{renderContent()}</div>
      </div>
    </>,
    document.body
  );
};

export default SettingsPage;
