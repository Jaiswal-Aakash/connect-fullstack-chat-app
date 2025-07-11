import React from "react";
import "@flaticon/flaticon-uicons/css/all/all.css";
import { Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, isUpdatingProfileInfo, updateProfileInfo, isEditingProfileBio, editingProfileBio } = useAuthStore();

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isEditingInfo, setIsEditingInfo] = React.useState(false);
  const [isEditingBio, setIsEditingBio] = React.useState(false);

  const [fullName, setFullName] = React.useState(authUser?.fullName || "");
  const [email, setEmail] = React.useState(authUser?.email || "");
  const [bio, setBio] = React.useState(authUser?.bio || "");
const isSaving = isUpdatingProfileInfo || isEditingProfileBio;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;                                      

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleSave = async () => {
    try {
      if (fullName !== authUser.fullName || email !== authUser.email) {
        await updateProfileInfo({ fullName, email });
      }

      if (bio !== authUser.bio) {
        await editingProfileBio({ bio });
      }

      setIsEditingInfo(false);
      setIsEditingBio(false);
    } catch (err) {
      console.error("Error updating profile info or bio:", err);
    }
  };



  return (
    <div className="flex flex-col bg-white items-center justify-between text-black min-h-[95vh] w-full max-w-2xl mx-auto rounded-[14px] border border-gray-300 shadow-md p-4 sm:p-8 gap-6 z-30">
      {/* Heading */}
      <div id="heading" className="w-full flex flex-col items-center mb-2">
        <h1 className="text-2xl sm:text-3xl">Edit Profile</h1>
        <p className="tracking-wider text-sm sm:text-base">Your profile information</p>
      </div>

      {/* Profile Image */}
      <div id="profile" className="w-full flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={selectedImage || authUser.profilePic || "/avatar.png"}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4"
          />
          <label
            htmlFor="avatar-upload"
            className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
              isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
            }`}
          >
            <Camera className="w-5 h-5 text-base-200" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
      </div>

      {/* Personal Info Section */}
      <div
        id="personal-info"
        className="rounded-[14px] border border-gray-300 w-full flex flex-col py-2 px-3 sm:px-6 mb-2"
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg sm:text-xl">Personal Info</h3>
          <div
            onClick={() => setIsEditingInfo(!isEditingInfo)}
            className="rounded-[6px] border border-gray-300 py-1 px-3 sm:px-5 cursor-pointer text-xs sm:text-sm"
          >
            <i className="fi fi-rr-edit text-sm"></i>{" "}
            {isEditingInfo ? "Cancel" : "Edit"}
          </div>
        </div>

        <div id="fields" className="flex flex-col lg:flex-row gap-4 w-full">
          {/* Full Name Field */}
          <div className="flex flex-col flex-1">
            <label htmlFor="name" className="flex items-center text-xs sm:text-sm gap-2 mb-1">
              <i className="fi fi-rr-user"></i>Full Name
            </label>
            <div className="h-11 rounded-[8px] p-2 border border-gray-300 bg-gray-100">
              {isEditingInfo ? (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-full bg-transparent outline-none"
                />
              ) : (
                <span>{authUser?.fullName}</span>
              )}
            </div>
          </div>
          {/* Email Field */}
          <div className="flex flex-col flex-1">
            <label htmlFor="email" className="flex items-center text-xs sm:text-sm gap-2 mb-1">
              <i className="fi fi-rr-envelope"></i>Email
            </label>
            <div className="h-11 rounded-[8px] p-2 border border-gray-300 bg-gray-100">
              {isEditingInfo ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full bg-transparent outline-none"
                />
              ) : (
                <span>{authUser?.email}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div
        id="bio"
        className="rounded-[14px] border border-gray-300 w-full flex flex-col py-2 px-3 sm:px-6 gap-2 mb-2"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl">Bio</h3>
          <div
            onClick={() => setIsEditingBio(!isEditingBio)}
            className="rounded-[6px] border border-gray-300 py-1 px-3 sm:px-5 cursor-pointer flex items-center justify-center gap-1 text-xs sm:text-sm"
          >
            <i className="fi fi-rr-edit text-sm"></i>{" "}
            {isEditingBio ? "Cancel" : "Edit"}
          </div>
        </div>
        <div className="text-base sm:text-lg font-thin">
          {isEditingBio ? (
            <textarea
              className="w-full h-full bg-transparent outline-none border border-gray-300 rounded-lg p-2"
              rows={1}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <span>{authUser?.bio || "No bio yet"}</span>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div
        id="save"
        className="w-full py-2 px-3 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2"
      >
        <div id="status" className="text-blue-500 text-xs sm:text-base">
          <label htmlFor="status" className="text-black">
            Member since: {authUser.createdAt?.split("T")[0]} /
          </label>{" "}
          Active
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{ backgroundColor: "rgba(201, 255, 255, 1)" }}
          className={`rounded-[6px] border border-gray-300 py-1 px-5 h-8 text-xs sm:text-base ${
            isSaving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <i className="fi fi-rr-disk text-sm"></i> Save
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
