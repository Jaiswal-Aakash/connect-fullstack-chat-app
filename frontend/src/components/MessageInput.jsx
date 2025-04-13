import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setText((prevText) => prevText + emojiData.emoji);
  };

  return (
    <div className="p-2 w-full relative">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Emoji Picker dropdown */}
      {showEmojiPicker && (
        <div className="absolute bottom-[60px] left-2 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 relative">
          {/* Emoji Icon */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Smile className="size-50" stroke="#71717A" fill="none" />
          </button>

          {/* Input field */}
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input w-full rounded-[22px] text-black px-4 py-6 sm:input-md input-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          />

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex items-center justify-center rounded-full p-2 border border-gray-300 bg-transparent hover:bg-gray-100 transition ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
          >
            <Image
              className="size-50"
              stroke={imagePreview ? "#10B981" : "#71717A"}
              fill="none"
            />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="flex items-center justify-center rounded-full p-2 bg-transparent hover:bg-gray-100 transition"
          style={{
            background:
              "linear-gradient(123.69deg, #CAFBFF 15.61%, #94F8FF 39.09%, #ACF9FF 48.14%, #8EF7FF 58.2%, #9AF8FF 69.27%, #E2FDFF 85.37%)",
          }}
          disabled={!text.trim() && !imagePreview}
        >
          <Send
            className="size-50"
            stroke={text || imagePreview ? "#10B981" : "#71717A"}
            fill="none"
          />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
