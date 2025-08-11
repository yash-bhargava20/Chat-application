import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMessages,
  sendMessage,
  setSelectedUser,
} from "../store/Slice/chatSlice";
import { X, ArrowLeft, Paperclip, Smile, SendHorizonal } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const ChatSection = () => {
  const dispatch = useDispatch();
  const { selectedUser, messages, isMessagesLoading } = useSelector(
    (state) => state.chat
  );
  const { authUser } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(fetchMessages(selectedUser._id));
    }
  }, [selectedUser, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser?._id) {
      dispatch(
        sendMessage({
          receiver: selectedUser._id,
          message: newMessage,
          Image: null,
        })
      );
      setNewMessage("");
    }
  };
  const handleEmojiClick = (e) => {
    console.log(e);

    setNewMessage((prev) => prev + e.emoji);
  };

  if (!selectedUser) {
    return (
      <>
        <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
          Select a user or group to start chatting
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full ">
      <div className="border-b border-gray-200 px-2 sm:px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="mr-1 sm:mr-2 p-2 rounded-full hover:bg-gray-100 md:hidden"
            title="Back to sidebar"
            onClick={() => dispatch(setSelectedUser(null))}
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>
          <img
            src={selectedUser?.profilePic || "/avatar-holder.avif"}
            alt="Avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900 text-base sm:text-lg">
              {selectedUser.username || "Group Name"}
            </div>
          </div>
        </div>
        <button
          className="p-2 rounded-full hover:bg-gray-100 hidden md:block"
          title="Close chat"
          onClick={() => dispatch(setSelectedUser(null))}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
        </button>
      </div>
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-3 sm:py-5 space-y-3 sm:space-y-4 bg-[#f7f8fa]">
        {isMessagesLoading ? (
          <div className="text-center text-gray-400">Loading messages...</div>
        ) : (
          messages?.map((msg) => {
            const isMe = msg.sender === authUser._id;
            return (
              <div
                key={msg._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-end gap-1 sm:gap-2 max-w-[90vw] sm:max-w-[70%] ${
                    isMe ? "flex-row-reverse" : ""
                  }`}
                >
                  <img
                    src={
                      isMe
                        ? authUser?.profilePic || "/avatar-holder.avif"
                        : selectedUser?.profilePic || "/avatar-holder.avif"
                    }
                    alt="Avatar"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                  <div
                    className={`px-3 sm:px-4 py-2 shadow min-w-[40px] sm:min-w-[60px] flex items-start ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-b-lg rounded-l-lg"
                        : "bg-white text-gray-800 rounded-b-lg rounded-r-lg"
                    }`}
                  >
                    <div className="flex items-end gap-1 sm:gap-2 w-full">
                      <span className="break-words flex-1 text-sm sm:text-base">
                        {msg.message}
                      </span>
                      <span
                        className="text-[8px] sm:text-[9px] font-thin"
                        style={{ alignSelf: "flex-end" }}
                      >
                        {msg.timestamp || msg.createdAt
                          ? new Date(
                              msg.timestamp || msg.createdAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form
        onSubmit={handleSend}
        className="w-full mx-auto px-2 sm:px-3 py-3 sm:py-4 border-t border-gray-200 flex items-center gap-1 sm:gap-2 bg-white"
      >
        <button
          type="button"
          onClick={() => document.getElementById("fileInput")?.click()}
          className="p-2 rounded-full hover:bg-gray-100"
          title="Attach file"
        >
          <Paperclip className="w-5 h-5 text-gray-500" />
        </button>
        <div className="relative">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100"
            title="Emoji Picker"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <Smile className="w-5 h-5 text-gray-500" />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        <input
          type="text"
          className="flex-1 border bg-gray-100 border-gray-300 px-3 sm:px-4 py-2 rounded-2xl outline-none focus:border-indigo-400 text-sm sm:text-base"
          placeholder="Type here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full"
          disabled={!newMessage.trim()}
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatSection;
