import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMessages,
  sendMessage,
  deleteMessage,
  setSelectedUser,
} from "../store/Slice/chatSlice";
import { X, ArrowLeft, Paperclip, Smile, SendHorizonal } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import upload from "../lib/upload";
import MessageBubble from "./MessageBubble";

const ChatSection = () => {
  const dispatch = useDispatch();
  const { selectedUser, messages, isMessagesLoading } = useSelector(
    (state) => state.chat
  );
  const { authUser } = useSelector((state) => state.auth);

  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(fetchMessages(selectedUser._id));
    }
  }, [selectedUser, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!selectedUser?._id || (!newMessage.trim() && !file)) return;

    let imageUrl = null;
    if (file) {
      imageUrl = await upload(file);
    }

    dispatch(
      sendMessage({
        receiver: selectedUser._id,
        message: newMessage || "",
        Image: imageUrl,
      })
    );

    setNewMessage("");
    setFile(null);
    setFilePreview(null);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFilePreview(URL.createObjectURL(selected));
    }
  };

  const handleEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  const handleDelete = (msgId) => {
    dispatch(deleteMessage(msgId));
  };

  if (!selectedUser) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center text-base-content/50">
        Select a user or group to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <div className="border-b border-base-200 px-2 sm:px-4 py-2 flex items-center justify-between bg-base-100">
        <div className="flex items-center gap-2">
          <button
            className="mr-1 sm:mr-2 p-2 rounded-full hover:bg-base-300 md:hidden"
            title="Back to sidebar"
            onClick={() => dispatch(setSelectedUser(null))}
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-base-content/70" />
          </button>
          <img
            src={selectedUser?.profilePic || "/avatar-holder.avif"}
            alt="Avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-base-content text-base sm:text-lg">
              {selectedUser.username || "Group Name"}
            </div>
          </div>
        </div>
        <button
          className="p-2 rounded-full hover:bg-base-200 hidden md:block"
          title="Close chat"
          onClick={() => dispatch(setSelectedUser(null))}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-base-content/70" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-3 sm:py-5 space-y-3 sm:space-y-4 bg-base-200">
        {isMessagesLoading ? (
          <div className="text-center text-base-content/50">
            Loading messages...
          </div>
        ) : (
          messages?.map((msg) => {
            const isMe = msg.sender === authUser._id;
            return (
              <MessageBubble
                key={msg._id}
                msg={msg}
                isMe={isMe}
                onDelete={handleDelete}
                selectedUser={selectedUser}
                authUser={authUser}
              />
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="w-full mx-auto px-2 sm:px-3 py-3 sm:py-4 border-t border-base-200 flex flex-col gap-2 bg-base-100"
      >
        {filePreview && (
          <div className="flex items-center gap-2">
            <img
              src={filePreview}
              alt="preview"
              className="w-20 h-20 object-cover rounded"
            />
            <button
              type="button"
              className="text-error font-bold"
              onClick={() => {
                setFile(null);
                setFilePreview(null);
              }}
            >
              Remove
            </button>
          </div>
        )}

        <div className="flex items-center gap-1 sm:gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full hover:bg-primary/50"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5 text-base-content/70" />
          </button>

          <div className="relative">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-primary/50"
              title="Emoji Picker"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <Smile className="w-5 h-5 text-base-content/70" />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <input
            type="text"
            className="flex-1 border bg-base-300 border-base-300 px-3 sm:px-4 py-2 rounded-2xl outline-none focus:border-primary text-sm sm:text-base "
            placeholder="Type here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-focus text-primary-content p-2 rounded-full"
            disabled={!newMessage.trim() && !file}
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatSection;
