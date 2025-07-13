import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Users, Search, User, Calendar, Mail, X } from "lucide-react";
import AddContactSkeleton from "../components/skeletons/AddContactSkeleton";

const AddContactPage = () => {
  const { getAllUsers, users, setSelectedUser, isUsersLoading } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfilePreview, setShowProfilePreview] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleStartChat = (user) => {
    setSelectedUser(user);
    navigate("/message");
  };

  const handleProfileClick = (user) => {
    setSelectedProfile(user);
    setShowProfilePreview(true);
  };

  const filteredUsers = users.filter(user => 
    user._id !== authUser?._id && 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isUsersLoading) {
    return <AddContactSkeleton />;
  }

  return (
    <div className="flex flex-col lg:flex-row h-[95vh] w-full max-w-7xl mx-auto gap-4 lg:gap-6 p-2 lg:p-0 relative z-10">
      {/* Left Side - Users List */}
      <div className="flex-1 bg-white rounded-[14px] border border-gray-300 shadow-md p-3 sm:p-4 lg:p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-col items-center mb-4 lg:mb-6 flex-shrink-0">
          <div className="flex items-center gap-2 lg:gap-3 mb-2">
            <Users className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Add Contacts</h1>
          </div>
          <p className="tracking-wider text-xs sm:text-sm lg:text-base text-gray-600 text-center px-2">
            Discover and connect with other users
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-lg mx-auto mb-4 lg:mb-6 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
            <input
              type="text"
              placeholder="Search users by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-gray-50 hover:bg-white transition-colors duration-200 text-gray-900 placeholder-gray-500 text-sm lg:text-base"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            )}
          </div>
          {searchTerm && (
            <div className="mt-2 text-xs lg:text-sm text-gray-500 text-center">
              Searching for "{searchTerm}"
            </div>
          )}
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 lg:h-64 text-gray-500">
              <Users className="w-12 h-12 lg:w-16 lg:h-16 mb-4 opacity-50" />
              <p className="text-base lg:text-lg font-medium">No users found</p>
              <p className="text-xs lg:text-sm">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 lg:gap-4">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`bg-white border rounded-xl p-3 lg:p-5 hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer group ${
                    selectedProfile?._id === user._id 
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                  }`}
                  onClick={() => handleProfileClick(user)}
                >
                  {/* Header with Profile Picture and Status */}
                  <div className="flex items-start justify-between mb-3 lg:mb-4 flex-shrink-0">
                    <div className="flex items-center gap-3 lg:gap-4">
                      {/* Profile Picture with Status */}
                      <div className="relative">
                        <div className="relative">
                          <img
                            src={user.profilePic || "/avatar.png"}
                            alt={user.fullName}
                            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover border-2 lg:border-3 border-gray-200 shadow-md group-hover:scale-105 transition-transform duration-200"
                          />
                          {onlineUsers.includes(user._id) && (
                            <span className="absolute bottom-0 right-0 lg:bottom-1 lg:right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></span>
                          )}
                        </div>
                        {/* Status Badge */}
                        <div className={`absolute -top-1 -right-1 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full text-xs font-medium ${
                          onlineUsers.includes(user._id) 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm lg:text-lg truncate group-hover:text-blue-600 transition-colors duration-200">
                          {user.fullName}
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-500 mb-1 truncate">
                          {user.email}
                        </p>
                        <div className="flex items-center gap-1 lg:gap-2 text-xs text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span className="truncate">Member since {user.createdAt?.split("T")[0] || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio Section - Only show if user has bio */}
                  {user.bio && user.bio.trim() !== "" && (
                    <div className="mb-3 lg:mb-4 flex-shrink-0">
                      <div className="bg-gray-50 rounded-lg p-2 lg:p-3 border border-gray-100">
                        <p className="text-xs lg:text-sm text-gray-600 leading-relaxed line-clamp-2">
                          "{user.bio}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Spacer */}
                  <div className="flex-1"></div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProfileClick(user);
                      }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 lg:py-2 px-2 lg:px-3 rounded-lg flex items-center justify-center gap-1 lg:gap-2 transition-all duration-200 text-xs lg:text-sm font-medium"
                    >
                      <User className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span className="hidden sm:inline">View Profile</span>
                      <span className="sm:hidden">Profile</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartChat(user);
                      }}
                      className="flex-1 text-black py-1.5 lg:py-2 px-2 lg:px-3 rounded-lg flex items-center justify-center gap-1 lg:gap-2 transition-all duration-200 hover:shadow-md text-xs lg:text-sm font-medium"
                      style={{
                        background: "linear-gradient(123.69deg, #CAFBFF 15.61%, #94F8FF 39.09%, #ACF9FF 48.14%, #8EF7FF 58.2%, #9AF8FF 69.27%, #E2FDFF 85.37%)",
                      }}
                    >
                      <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4 text-black" />
                      <span className="hidden sm:inline">Start Chat</span>
                      <span className="sm:hidden">Chat</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="w-full text-center text-xs lg:text-sm text-gray-500 border-t pt-3 lg:pt-4 mt-3 lg:mt-4 flex-shrink-0">
          <p>
            Showing {filteredUsers.length} of {users.filter(user => user._id !== authUser?._id).length} users
          </p>
        </div>
      </div>

      {/* Right Side - Profile Preview */}
      <div className={`${
        showProfilePreview ? 'fixed right-0 top-0 h-full w-80 z-[999999] lg:relative lg:z-auto' : 'hidden lg:block'
      } lg:w-80 bg-white rounded-l-[14px] lg:rounded-[14px] border border-gray-300 shadow-md p-4 lg:p-6`}>
        {/* Mobile Close Button */}
        {showProfilePreview && (
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Profile Preview</h2>
            <button
              onClick={() => setShowProfilePreview(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {selectedProfile ? (
          <div className="h-full flex flex-col">
            {/* Profile Header */}
            <div className="text-center mb-4 lg:mb-6">
              <div className="relative inline-block mb-3 lg:mb-4">
                <img
                  src={selectedProfile.profilePic || "/avatar.png"}
                  alt={selectedProfile.fullName}
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-3 lg:border-4 border-gray-200"
                />
                {onlineUsers.includes(selectedProfile._id) && (
                  <span className="absolute bottom-1 right-1 lg:bottom-2 lg:right-2 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">
                {selectedProfile.fullName}
              </h2>
              <p className="text-xs lg:text-sm text-gray-500">
                {onlineUsers.includes(selectedProfile._id) ? "Online" : "Offline"}
              </p>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-3 lg:space-y-4">
              {selectedProfile.bio && selectedProfile.bio.trim() !== "" && (
                <div className="bg-gray-50 rounded-lg p-3 lg:p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                    <User className="w-4 h-4" />
                    About
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600">{selectedProfile.bio}</p>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-3 lg:p-4">
                <h3 className="font-semibold text-gray-900 mb-2 lg:mb-3 flex items-center gap-2 text-sm lg:text-base">
                  <Mail className="w-4 h-4" />
                  Contact Info
                </h3>
                <div className="space-y-1 lg:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 lg:gap-2 text-xs lg:text-sm">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-900 break-all">{selectedProfile.email}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 lg:gap-2 text-xs lg:text-sm">
                    <span className="text-gray-500">Member since:</span>
                    <span className="text-gray-900">
                      {selectedProfile.createdAt?.split("T")[0] || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 lg:mt-6 space-y-2 lg:space-y-3">
              <button
                onClick={() => handleStartChat(selectedProfile)}
                className="w-full text-black py-2.5 lg:py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md font-medium text-sm lg:text-base"
                style={{
                  background: "linear-gradient(123.69deg, #CAFBFF 15.61%, #94F8FF 39.09%, #ACF9FF 48.14%, #8EF7FF 58.2%, #9AF8FF 69.27%, #E2FDFF 85.37%)",
                }}
              >
                <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
                Start Chat
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
            <User className="w-12 h-12 lg:w-16 lg:h-16 mb-3 lg:mb-4 opacity-50" />
            <h3 className="text-base lg:text-lg font-medium mb-2">Profile Preview</h3>
            <p className="text-xs lg:text-sm px-2">
              Click on any user's name or profile picture to view their detailed profile here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddContactPage; 