import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../store/Slice/authslice";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const handleLogout = () => {
    toast.success("Logged out successfully!");
    dispatch(logoutUser());
  };
  return (
    <nav className="bg-white text-black px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Chat App</h1>
        <div className="space-x-4">
          {authUser ? (
            <>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
              <Link to="/profile" className="hover:text-blue-400 transition">
                Profile
              </Link>
              <Link to="/setting" className="hover:text-blue-400 transition">
                Settings
              </Link>

              <button onClick={handleLogout}>LogOut</button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
