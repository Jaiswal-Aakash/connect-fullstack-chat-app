import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = ({ isChatOpen, fullWidth = false }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log("Sidebar users:", users);
  console.log("Users length:", users.length);

  if (isUserLoading) {
    return (
      <div className="h-full w-full">
        <SidebarSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{
        x: isChatOpen || fullWidth ? "0%" : "-100%",
        opacity: isChatOpen || fullWidth ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`h-full bg-gradient-to-br from-blue-100 via-white to-blue-50 border border-gray-300 shadow-md rounded-[14px] flex items-center justify-center`}
      style={{
        width: fullWidth ? "100%" : isChatOpen ? "100vw" : "0vw",
        overflow: "hidden",
        backdropFilter: "blur(5px)",
      }}
    >
      <aside
        className={`h-full w-full text-black flex flex-col transition-all duration-200 ${
          fullWidth ? "" : "lg:w-72 w-20"
        }`}
      >
        <div className="border-b-8 w-full p-5 flex gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <div className="overflow-y-auto w-full py-3">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 px-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Conversations Yet</h3>
                <p className="text-sm text-gray-500 text-center leading-relaxed">
                  Start chatting with users from the Add Contacts page to see your conversations here.
                </p>
                <div className="mt-4">
                  <a 
                    href="/add-contact" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                  >
                    <Users className="w-4 h-4" />
                    Find People to Chat
                  </a>
                </div>
              </div>
            </div>
          ) : (
            users.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`
                  w-full p-3 flex items-center gap-3
                  hover:bg-slate-100 rounded-[12px] transition-colors
                  ${selectedUser?._id === user._id ? "bg-slate-100" : ""}
                `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.name}
                    className="size-12 object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span
                      className="absolute bottom-0 right-0 size-3 bg-green-500 
                      rounded-full ring-2 ring-zinc-900"
                    />
                  )}
                </div>

                {/* User info - only visible on larger screens */}
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>
    </motion.div>
  );
};

export default Sidebar;
