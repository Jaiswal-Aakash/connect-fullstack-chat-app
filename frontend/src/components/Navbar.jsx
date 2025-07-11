import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";
import SettingsPage from "../pages/SettingsPage";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  return (
    <div
      className="flex flex-col items-center justify-between text-black h-[95vh] mx-3 my-4 w-14 rounded-full border border-gray-300 shadow-md z-50"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(154, 243, 249, 1) 25%, rgba(120, 225, 235, 1) 50%, rgba(154, 243, 249, 1) 75%, rgba(230, 253, 255, 1) 100%)",
      }}
    >
      <div className="cursor-pointer mt-[6px]">
        <Link to="/profile">
          <img
            src={authUser?.profilePic || "profile.png"}
            alt="logo"
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
      </div>

      <div className="flex cursor-pointer flex-col py-12 gap-8 w-7">
        {[
          { path: "/message", icon: "message.png", alt: "msg" },
          { path: "/add-contact", icon: "addContact.png", alt: "add" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="relative flex items-center"
          >
            {location.pathname === item.path && (
              <div
                style={{ backgroundColor: "#08C5F9" }}
                className="absolute -right-3 w-1 h-6  rounded-full"
              ></div>
            )}
            <img src={item.icon} alt={item.alt} />
          </Link>
        ))}
      </div>

      <div className="flex cursor-pointer flex-col pb-3 gap-5 w-7 items-center">
        <img
          src="settings.png"
          onClick={toggleSettings}
          alt="setting"
          className="w-6 h-6"
        />
        {showSettings && (
          <SettingsPage onClose={() => setShowSettings(false)} />
        )}
        <div
          onClick={logout}
          className="flex justify-center items-center w-10 h-10 rounded-full border border-white/30 backdrop-blur-lg bg-black/10"
        >
          <img className="w-8 h-8 mt-1.5 ml-0.5" src="logout.png" alt="log" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
