import React from "react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <img
        src="./chatIcon.png"
        alt="No chat"
        className="w-30 h-30 mb-6 drop-shadow-2xl"
      />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No Chat Selected
      </h2>
      <p className="text-gray-600 mb-4">
        Select a user from the sidebar to start your conversation.
      </p>
    </div>
  );
};

export default NoChatSelected;
