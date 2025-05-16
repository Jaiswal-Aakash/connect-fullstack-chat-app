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
    <div className="flex flex-col bg-white items-center justify-between text-black h-[95vh] mr-3 my-4 w-screen rounded-[14px] border border-gray-300 shadow-md p-10 gap-8 z-30">
      <div id="heading" className="h-[13%] w-[88vw] flex flex-col items-center">
        <h1 className="text-3xl">Edit Profile</h1>
        <p className="tracking-wider">Your profile information</p>
      </div>

      <div id="profile" className="h-[20%] w-[88vw] flex items-center gap-8">
        <div className="relative">
          <img
            src={selectedImage || authUser.profilePic || "/avatar.png"}
            alt="Profile"
            className="size-32 rounded-full object-cover border-4"
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
        className="rounded-[14px] border border-gray-300 h-[30%] w-[88vw] flex flex-col py-2 px-6"
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xl">Personal Info</h3>
          <div
            onClick={() => setIsEditingInfo(!isEditingInfo)}
            className="rounded-[6px] border border-gray-300 py-1 px-5 cursor-pointer"
          >
            <i className="fi fi-rr-edit text-sm"></i>{" "}
            {isEditingInfo ? "Cancel" : "Edit"}
          </div>
        </div>

        <div id="label" className="flex justify-between items-center">
          <label
            htmlFor="name"
            className="flex items-center w-[40%] text-sm gap-2"
          >
            <i className="fi fi-rr-user"></i>Full Name
          </label>
          <label
            htmlFor="email"
            className="flex items-center w-[40%] text-sm gap-2"
          >
            <i className="fi fi-rr-envelope"></i>Email
          </label>
        </div>

        <div id="fields" className="flex justify-between h-[73%] items-center">
          <div className="h-11 w-[40%] rounded-[8px] p-2 border border-gray-300 bg-gray-100">
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
          <div className="h-11 w-[40%] rounded-[8px] p-2 border border-gray-300 bg-gray-100">
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

      {/* Bio Section */}
      <div
        id="bio"
        className="rounded-[14px] border border-gray-300 h-[20%] w-[88vw] flex flex-col py-2 px-6 gap-2"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl">Bio</h3>
          <div
            onClick={() => setIsEditingBio(!isEditingBio)}
            className="rounded-[6px] border border-gray-300 py-1 px-5 cursor-pointer flex items-center justify-center gap-1"
          >
            <i className="fi fi-rr-edit text-sm"></i>{" "}
            {isEditingBio ? "Cancel" : "Edit"}
          </div>
        </div>
        <div className="text-lg font-thin">
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
        className="h-[15%] w-[88vw] py-2 px-6 flex justify-between items-center"
      >
        <div id="status" className="text-blue-500">
          <label htmlFor="status" className="text-black">
            Member since: {authUser.createdAt?.split("T")[0]} /
          </label>{" "}
          Active
        </div>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{ backgroundColor: "rgba(201, 255, 255, 1)" }}
          className={`rounded-[6px] border border-gray-300 py-1 px-5 h-8 ${
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
