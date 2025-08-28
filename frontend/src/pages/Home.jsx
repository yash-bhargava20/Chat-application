import React, { useEffect } from "react";
import SideBar from "../Components/SideBar";
import Navbar from "../Components/Navbar";
import ChatSection from "../Components/ChatSection";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const location = useLocation();
  const { selectedUser } = useSelector((state) => state.chat);

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success("Logged in successfully!");
    }
  }, [location]);

  return (
    <>
      <Toaster position="top-right" />

      <div className="bg-base-200 min-h-screen w-screen flex">
        <div className="bg-base-100 rounded-lg shadow-md flex w-full h-screen md:ml-16">
          <Navbar />

          {/* Sidebar */}
          <div
            className={`transition-all duration-200 md:w-1/3 lg:w-1/4 w-full border-r border-base-300 
            ${selectedUser ? "hidden md:block" : "block"}`}
          >
            <SideBar />
          </div>

          {/* Chat Section */}
          <div
            className={`flex-1 flex flex-col  mt-12 md:mt-0
            ${!selectedUser ? "hidden md:flex" : "flex"}`}
          >
            <ChatSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
