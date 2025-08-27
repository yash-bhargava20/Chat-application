import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../store/Slice/authslice";
import toast from "react-hot-toast";
import { Home, User, Settings, LogOut, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const handleLogout = () => {
    toast.success("Logged out successfully!");
    dispatch(logoutUser());
  };
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="fixed top-0 left-0 h-screen  bg-base-200 shadow-md flex flex-col justify-between p-4 z-10">
      <div>
        {/* <h1 className="text-2xl font-bold mb-8 text-center">Chat App</h1> */}

        {authUser && (
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 text-base-content hover:text-primary transition"
              >
                <Home className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3 text-base-content hover:text-primary transition"
              >
                <User className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link
                to="/setting"
                className="flex items-center gap-3 text-base-content hover:text-primary transition"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </li>
          </ul>
        )}
      </div>

      {authUser && (
        <div className="flex flex-col gap-4">
          <button
            className="flex items-center gap-2 p-2 rounded-md hover:bg-base-200 transition"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <>
                <Moon className="h-5 w-5" />
              </>
            ) : (
              <>
                <Sun className="h-5 w-5" />
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-error/10 transition text-red-500"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
