import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../store/Slice/authslice";
import toast from "react-hot-toast";
import {
  Home,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  MoreVertical,
} from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    dispatch(logoutUser());
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden  md:fixed md:top-0 md:left-0 md:h-screen bg-base-200 shadow-md md:flex flex-col justify-between p-4 z-10 w-16">
        <div>
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
                <Moon className="h-6 w-6" />
              ) : (
                <Sun className="h-6 w-6" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-error/10 transition text-red-500"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 w-full bg-base-200 shadow-md p-3 flex justify-between items-center z-20">
        <h1 className="font-bold text-lg">Threadly</h1>
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          <MoreVertical className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-12 left-0 w-full bg-base-100 shadow-md flex flex-col p-4 gap-4 z-10">
          {authUser && (
            <>
              <Link
                to="/"
                className="flex items-center gap-3 text-base-content hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                <Home className="h-5 w-5" /> Home
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-3 text-base-content hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                <User className="h-5 w-5" /> Profile
              </Link>
              <Link
                to="/setting"
                className="flex items-center gap-3 text-base-content hover:text-primary transition"
                onClick={() => setMenuOpen(false)}
              >
                <Settings className="h-5 w-5" /> Settings
              </Link>

              <button
                className="flex items-center gap-2 p-2 rounded-md hover:bg-base-200 transition"
                onClick={() => {
                  setTheme(theme === "light" ? "dark" : "light");
                  setMenuOpen(false);
                }}
              >
                {theme === "light" ? (
                  <>
                    <Moon className="h-5 w-5" /> Dark
                  </>
                ) : (
                  <>
                    <Sun className="h-5 w-5" /> Light
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-error/10 transition text-red-500"
              >
                <LogOut className="h-5 w-5" /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
