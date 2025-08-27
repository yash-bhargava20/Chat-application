import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getUser = createAsyncThunk(
  "/user/getUser",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/api/auth/profile");
      console.log("User fetched:", res.data.user);
      return res.data.user;
    } catch (error) {
      console.log("Error fetching user:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch user"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      await axiosInstance.post("/api/auth/login", data);
      const res = await axiosInstance.get("/api/auth/profile");
      return res.data.user;
    } catch (error) {
      console.log("Error logging in:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to login"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.get("/api/auth/logout");
      return null;
    } catch (error) {
      console.log("Error logging Out:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to logout"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/api/auth/signup", data);
      return res.data.user;
    } catch (error) {
      console.log("Error signing up:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to signup"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (data, thunkAPI) => {
    try {
      console.log("Sending update request with data:", data);

      const res = await axiosInstance.put("/api/auth/update", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("Update successful:", res.data);
      return res.data.user;
    } catch (error) {
      console.log("Error updating user:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update user"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    error: null,
    onlineUsers: [],
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authUser = null;
        state.isCheckingAuth = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authUser = null;
        state.isLoggingIn = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoggingOut = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authUser = null;
        state.isLoggingOut = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoggingOut = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authUser = null;
        state.isSigningUp = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isUpdatingProfile = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isUpdatingProfile = false;
        state.updateError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdatingProfile = false;
        state.updateError = action.payload;
      });
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
