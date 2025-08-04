import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, setSelectedUser } from "../store/Slice/chatSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const { users, onlineUsers, selectedUser } = useSelector(
    (state) => state.chat
  );
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = users
    ?.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    )
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true));

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="h-full w-full sm:w-64 lg:w-72 border-r border-gray-300 flex flex-col bg-white">
      <div className="border-b border-gray-300 p-4 sm:p-3">
        <span className="font-bold text-xl sm:text-2xl text-gray-800">
          Contacts
        </span>
        <div>
          <input
            type="text"
            value={search}
            placeholder="Search people or group"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 mt-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm mb-2 bg-gray-100"
          />
        </div>
      </div>

      <div
        className="overflow-y-auto p-2 sm:p-3 w-full"
        style={{ scrollBehavior: "smooth" }}
      >
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => dispatch(setSelectedUser(user))}
              className={`w-full p-2 sm:p-3 flex items-center gap-3 transition-colors rounded-md ${
                selectedUser?._id === user._id
                  ? "bg-gray-200"
                  : "hover:bg-gray-200"
              }`}
            >
              <div className="relative">
                <img
                  src={"/avatar-holder.avif"}
                  alt="Avatar"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full ring-2 ring-white" />
                )}
              </div>

              <div className="text-left">
                <div className="text-sm sm:text-base font-medium text-gray-800 truncate">
                  {user.username}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm">No users found</p>
        )}
      </div>
    </div>
  );
};

export default SideBar;
