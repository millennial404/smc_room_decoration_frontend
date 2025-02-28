import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRooms } from "../api";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async function () {
    const response = await getAllRooms();
    return response;
  }
);

type TinitialState = {
  status: string | null;
  error: string | null | unknown;
  user: string | null;
  isAuthChecked: boolean;
};

const initialState: TinitialState = {
  status: null,
  error: null,
  user: null,
  isAuthChecked: false,
};

const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
        state.error = "null";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "resolved";
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { setAuthChecked, setUser, logout } = userDataSlice.actions;
export default userDataSlice.reducer;
