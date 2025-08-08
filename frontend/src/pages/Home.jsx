import React, { useEffect } from "react";
import SideBar from "../Components/SideBar";
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
      <div className="bg-gray-100">
        <div className="flex items-center justify-center pt-0 md:pt-10 px-0 md:px-3 md:min-h-screen">
          <div className="bg-white rounded-lg shadow-md w-full flex md:h-screen h-screen">
            <div
              className={` md:w-1/2 lg:w-1/4 w-full ${
                selectedUser ? "hidden md:block" : "block"
              }`}
            >
              <SideBar />
            </div>

            <div
              className={`flex-1  ${
                !selectedUser ? "hidden md:flex" : "flex"
              } flex-col`}
            >
              <ChatSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
