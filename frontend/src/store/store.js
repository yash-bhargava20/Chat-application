import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authslice";
import chatReducer from "./Slice/chatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
export default store;
