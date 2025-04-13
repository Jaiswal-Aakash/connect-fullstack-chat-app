import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
const Sidebar = ({ isChatOpen }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (isUserLoading)
    return (
      <div>
        <SidebarSkeleton />
      </div>
    );
  return (
    <div>
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{
          x: isChatOpen ? "0%" : "-100%",
          opacity: isChatOpen ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="h-full bg-gradient-to-br from-blue-100 via-white to-blue-50 border border-gray-300 shadow-md rounded-[14px] flex items-center justify-center"
        style={{
          width: isChatOpen ? "20vw" : "0vw",
          overflow: "hidden",
          backdropFilter: "blur(5px)",
        }}
      >
        <aside className="h-full w-20 text-black lg:w-72 flex flex-col transition-all duration-200">
          <div className="border-b-8 w-full p-5 flex gap-2">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
          <div></div>
          <div className="overflow-y-auto w-full py-3">
            {users.map((user) => (
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
            ))}
          </div>
        </aside>
      </motion.div>
    </div>
  );
};

export default Sidebar;
