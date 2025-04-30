import React, { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageInput from "./MessageInput.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MsgSkeleton from "./skeletons/MsgSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";
import { HiOutlineDotsVertical } from "react-icons/hi";

const ChatContainer = () => {
  const messagesEndRef = useRef(null);

  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    deleteMessage,
    subscribeToNewMessage,
    unsubscribeFromNewMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToNewMessage();
    }
    return () => {
      unsubscribeFromNewMessage();
    };
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToNewMessage,
    unsubscribeFromNewMessage,
  ]);

  const handleDelete = async (messageId) => {
    await deleteMessage(messageId, authUser._id);
    getMessages(selectedUser._id);
    setOpenDropdown(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MsgSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full relative">
      <ChatHeader />

      {/* Messages */}
      <div
        className="flex-1 overflow-auto p-4 space-y-4 pb-28 bg-center"
        style={{ backgroundImage: "url('/chatTheme.png')" }}
      >
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id;
          const sentTime = new Date(message.createdAt);
          const now = new Date();
          const timeDiff = (now - sentTime) / 1000; // seconds
          const canDelete = isSender && timeDiff < 60 && !message.isDeleted;

          return (
            <div
              key={message._id}
              className={`chat ${
                isSender ? "chat-end" : "chat-start"
              } relative`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      isSender
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              <div className="chat-header mb-1 flex items-center gap-2">
                <time className="text-xs text-black opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>

                {isSender && (
                  <div className="relative group">
                    <button
                      className="text-gray-500 hover:text-black"
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === message._id ? null : message._id
                        )
                      }
                    >
                      <HiOutlineDotsVertical size={14} />
                    </button>

                    {openDropdown === message._id && (
                      <div className="absolute z-10 right-0 top-5 bg-white shadow-md border rounded px-2 py-1 w-36">
                        {canDelete ? (
                          <button
                            onClick={() => handleDelete(message._id)}
                            className="h-8 w-full flex items-center justify-center text-sm text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                          >
                            Delete
                          </button>
                        ) : (
                          <div className="text-xs text-gray-400 text-center p-1">
                            Deletion disabled after 1 min
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div
                className="chat-bubble text-black flex flex-col"
                style={{
                  background: isSender
                    ? "linear-gradient(270deg, #FFFFFF 1.92%, #D2FFFF 30.29%, #ADFFFF 57.21%, #69FFFF 92.79%)"
                    : "white",
                }}
              >
                {message.isDeleted ? (
                  <p className="italic text-gray-500">message deleted</p>
                ) : (
                  <>
                    {message.text && <p>{message.text}</p>}
                    {message.image && (
                      <img
                        src={message.image}
                        alt="attachment"
                        className="sm:max-w-[200px] rounded-md mt-2"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
