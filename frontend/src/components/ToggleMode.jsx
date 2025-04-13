import React, { useState } from "react";

function CloudToggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <button
      onClick={() => setIsEnabled(!isEnabled)}
      className={`
        relative w-[92px] h-[36px] rounded-full transition-all duration-500 ease-in-out
        ${
          isEnabled
            ? "bg-gradient-to-r from-sky-200 via-sky-400 to-white"
            : "bg-gray-900"
        }
      `}
      aria-pressed={isEnabled}
    >
      {/* Stars (visible in dark mode) */}
      <div
        className={`
        absolute inset-0 transition-opacity duration-500
        ${isEnabled ? "opacity-0" : "opacity-100"}
      `}
      >
        <div className="absolute text-white opacity-50 text-xs top-2 left-4">
          ★
        </div>
        <div className="absolute text-white opacity-50   text-[10px] top-2 left-10">
          ★
        </div>
        <div className="absolute text-white opacity-50  text-sm top-4 left-6">
          ★
        </div>
        <div className="absolute text-white opacity-50  text-[8px] top-1 left-[60px]">
          ★
        </div>
        <div className="absolute text-white opacity-50  text-[12px] top-4 left-[70px]">
          ★
        </div>
      </div>

      {/* Toggle circle */}
      <div
        className={`
          absolute top-1/2 -translate-y-1/2 h-[28px] w-[28px] rounded-full transition-all duration-500 ease-in-out
          before:absolute before:inset-0 before:rounded-full before:opacity-90
          before:transition-all before:duration-500
          ${
            isEnabled
              ? "left-[60px] bg-gradient-to-b from-[#e5ff32] to-[#c7df2c] shadow-[0_0_10px_rgba(229,255,50,0.3)] before:bg-gradient-to-t before:from-black/20 before:to-transparent"
              : "left-[4px] bg-gradient-to-b from-gray-200 to-gray-300 shadow-[0_0_10px_rgba(255,255,255,0.2)] before:bg-gradient-to-t before:from-black/10 before:to-transparent"
          }
          after:absolute after:inset-[2px] after:rounded-full after:opacity-90
          after:transition-all after:duration-500
          ${
            isEnabled
              ? "after:bg-gradient-to-b after:from-transparent after:to-black/20"
              : "after:bg-gradient-to-b after:from-transparent after:to-black/10"
          }
        `}
      />

      {/* Cloud shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`
          absolute inset-y-0 right-0 w-3/4 rounded-full transition-all duration-500
          ${isEnabled ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
        `}
        >
          <div className="absolute right-1 top-1/2 -translate-y-1/2 w-12 h-8 bg-white/40 rounded-full blur-[2px]" />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-6 bg-white/30 rounded-full blur-[2px]" />
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-8 h-5 bg-white/20 rounded-full blur-[2px]" />
        </div>
      </div>
    </button>
  );
}

function ToggleMode() {
  return (
    <div className="space-y-4 flex ml-[80%] py-4">
      <CloudToggle />
    </div>
  );
}

export default ToggleMode;
