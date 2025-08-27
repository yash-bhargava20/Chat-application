import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (userId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/messages/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch messages"
      );
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ receiver, message, Image }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/api/messages/send`, {
        receiver,
        message,
        Image,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to send message"
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  "chat/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/messages/users");
      console.log("Users fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch user"
      );
    }
  }
);
export const deleteMessage = createAsyncThunk(
  "chat/delete",
  async (msgId, thunkAPI) => {
    try {
      // const token = localStorage.getItem("token");

      await axiosInstance.delete(
        `/api/messages/${msgId}`
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      return msgId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete message"
      );
    }
  }
);
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    users: [],
    selectedUser: null,
    onlineUsers: [],
    isMessagesLoading: false,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setUser: (state, action) => {
      state.users = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isMessagesLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isMessagesLoading = false;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isMessagesLoading = false;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
          (msg) => msg._id !== action.payload
        );
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const {
  setSelectedUser,
  setMessages,
  setUser,
  addMessage,
  setOnlineUsers,
} = chatSlice.actions;
export default chatSlice.reducer;
