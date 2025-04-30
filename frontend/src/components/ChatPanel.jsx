import React from "react";
import { useLocation } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "./Sidebar";
import NoChatSelected from "./NoChatSelected";
import ChatContainer from "./ChatContainer";

const ChatPanel = () => {
  const location = useLocation();
  const isChatOpen = location.pathname === "/message";
  const { selectedUser } = useChatStore();

  const showSidebarOnMobile = !selectedUser; // show only if no chat selected

  return (
    <div className="flex h-[95vh] my-4 w-full">
      {/* Sidebar */}
      <div
        className={`
          h-full 
          ${showSidebarOnMobile ? "flex" : "hidden"} 
          md:flex 
          transition-all 
          duration-300 
          ease-in-out
        `}
        style={{
          width: "270px",
          minWidth: "270px",
        }}
      >
        <Sidebar isChatOpen={isChatOpen} />
      </div>

      {/* Chat Panel */}
      <div
        className={`
          flex-1 
          h-full 
          ${selectedUser ? "flex" : "hidden"} 
          md:flex 
          ml-3 mr-3
          items-center 
          justify-center
        `}
        style={{
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="bg-white rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-2rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
