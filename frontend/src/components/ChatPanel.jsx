import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "./Sidebar";
import NoChatSelected from "./NoChatSelected";
import ChatContainer from "./ChatContainer";

const ChatPanel = () => {
  const location = useLocation();
  const isChatOpen = location.pathname === "/message";
  const {selectedUser} = useChatStore();

  return (
    <div className="flex h-[95vh] my-4 w-full">
      <Sidebar isChatOpen={isChatOpen} />
      {/* Message Panel - Adjusts Width */}
      <motion.div
        animate={{ width: isChatOpen ? "73vw" : "93vw" }}
        transition={{ type: "tween", stiffness: 100, damping: 15 }}
        className="h-full bg-gray-200 border border-gray-300 shadow-md rounded-[14px] flex items-center justify-center ml-3"
        style={{
          backdropFilter: "blur(5px)",
        }}
      >
        <div className=" bg-white rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-2rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatPanel;
