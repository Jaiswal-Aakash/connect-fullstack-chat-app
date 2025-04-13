import { MoreHorizontal } from "lucide-react"; // 3-dot icon
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle the menu visibility

  const handleCloseChat = () => {
    setSelectedUser(null);
    setIsMenuOpen(false); // Close the menu when chat is closed
  };

  return (
    <div className="text-black p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* More Options (3-dot menu) */}
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MoreHorizontal /> {/* 3-dot icon */}
          </button>

          {/* Close option menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-50">
              <button
                onClick={handleCloseChat}
                className="text-red-500 w-full text-left p-2 hover:bg-gray-200 rounded"
              >
                Close Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
