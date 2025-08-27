import React, { useState, useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";

const MessageBubble = ({ msg, isMe, onDelete, selectedUser, authUser }) => {
  const [showMenu, setShowMenu] = useState(false);
  const bubbleRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bubbleRef.current && !bubbleRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handlerightClick = (e) => {
    e.preventDefault();
    setShowMenu(true);
  };
  return (
    <>
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
            ref={bubbleRef}
            onContextMenu={isMe ? handlerightClick : undefined}
            className={`px-3 sm:px-4 py-2 shadow min-w-[40px] sm:min-w-[60px] flex flex-col relative ${
              isMe
                ? "bg-primary text-white rounded-b-lg rounded-l-lg"
                : "bg-white text-gray-800 rounded-b-lg rounded-r-lg"
            }`}
          >
            {showMenu && (
              <div className="absolute   bg-stone-800 text-white text-sm rounded-md shadow-lg z-50">
                <button
                  onClick={() => {
                    onDelete(msg._id);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-stone-700  rounded-md w-full"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
            {msg.Image && (
              <img
                src={msg.Image}
                alt="Attached"
                className="max-w-xs max-h-48 mb-1 rounded"
              />
            )}
            <div className="flex items-end gap-1 sm:gap-2 w-full">
              <span className="break-words flex-1 text-sm sm:text-base">
                {msg.message}
              </span>
              <span
                className="text-[8px] sm:text-[9px] font-thin"
                style={{ alignSelf: "flex-end" }}
              >
                {msg.timestamp || msg.createdAt
                  ? new Date(msg.timestamp || msg.createdAt).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
