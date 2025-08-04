import React from "react";
import SideBar from "../Components/SideBar";
import ChatSection from "../Components/ChatSection";

const Home = () => {
  return (
    <>
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
