import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/Slice/authslice";
import { setOnlineUsers } from "./store/Slice/chatSlice";

import { connectSocket, disconnectSocket } from "./lib/socket";
import Navbar from "./Components/Navbar";
// import { Loader } from "lucide-react";

const App = () => {
  const { authUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (authUser?._id) {
      console.log("Connecting socket with userId:", authUser._id);
      const socket = connectSocket(authUser._id);
      socket.on("getOnlineUsers", (onlineUsers) => {
        console.log("Online users:", onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => {
        disconnectSocket();
      };
    } else {
      console.log("No user is authenticated.", authUser);
    }
  }, [authUser, dispatch]);
  // if (isCheckingAuth) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="animate-spin text-blue-500" />
  //     </div>
  //   );
  // }

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          ></Route>
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to={"/"} />}
          ></Route>
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to={"/login"} />}
          />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
