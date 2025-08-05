import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../store/Slice/authslice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import toast, { Toaster } from "react-hot-toast";
library.add(far, fas);
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth);

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      await dispatch(registerUser(formData)).unwrap();

      toast.success("Registering Successfully!");
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className=" md:flex mx-3 lg:mx-auto my-10  overflow-hidden  border rounded-lg max-w-5xl border-gray-50">
        <div className="md:w-1/2 flex items-center justify-center bg-white lg:px-20 lg:py-12 md:px-10 md:py-10 sm:px-8 sm:py-8 ">
          <div className="max-w-md w-full ">
            <form onSubmit={handleSignIn} className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Create your account
              </h2>
              <p className="text-sm mt-4 text-gray-500">
                Sign up using the form or the Google account
              </p>
              <div className="relative">
                <FontAwesomeIcon
                  icon="fa-regular fa-user"
                  className=" absolute left-3 top-10  text-gray-400"
                />
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className="pl-10 mt-1 mb-1 w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-indigo-300 border-indigo-200"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative">
                <FontAwesomeIcon
                  icon="fa-regular fa-envelope"
                  className=" absolute left-3 top-10  text-gray-400"
                />

                <label className=" block font-semibold text-gray-600 mt-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 mt-1 mb-1 w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-indigo-300 border-indigo-200"
                />
              </div>
              <div className="relative">
                <div className="relative">
                  <FontAwesomeIcon
                    icon="fa-solid fa-lock"
                    className=" absolute left-3 top-10   text-gray-400"
                  />
                  <label className=" block font-semibold text-gray-600 mt-2">
                    Password
                  </label>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 mt-1 mb-1 w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-indigo-300 border-indigo-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8/12  transform -translate-y-1/2 text-gray-400 focus:outline-none"
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon="fa-regular fa-eye" />
                    ) : (
                      <FontAwesomeIcon icon="fa-regular fa-eye-slash" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full py-2 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition"
              >
                {isSigningUp ? "Registering in..." : "Register"}
              </button>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="h-px flex-1 bg-gray-300"></span>
                <span> Sign in with Email</span>
                <span className="h-px flex-1 bg-gray-300"></span>
              </div>
              <button className="w-full py-2 px-4 border rounded-2xl flex items-center justify-center space-x-2 text-sm text-gray-600 shadow-sm hover:shadow-md transition ">
                <img
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                  alt="google"
                />
                <span>Sign in with Google</span>
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2 bg-indigo-500 hidden md:block">Image</div>
      </div>
    </>
  );
};

export default Signup;
