import React from "react";
import SideBar from "../Components/SideBar";
import ChatSection from "../Components/ChatSection";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.showToast) {
      toast.success("Logged in successfully!");
    }
  }, [location]);
  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-100">
        <div className="flex items-center justify-center pt-10 px-2">
          <div className="bg-white rounded-xl shadow-md w-full  h-[85vh] overflow-hidden flex">
            <SideBar />
            <ChatSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
