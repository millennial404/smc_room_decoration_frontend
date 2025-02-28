import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "../store/userSlice.js";
import { loginRequest } from "../api";

type LoginCredentials = {
  login: string;
  password: string;
};
export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async function ({ login, password }: LoginCredentials, { dispatch }) {
    const response = await loginRequest(login, password);
    localStorage.setItem("refreshToken", response.refresh);
    localStorage.setItem("accessToken", response.access);
    dispatch(fetchUserData());
    return response;
  }
);

type TinitialState = {
  status: string | null;
  error: string | null | unknown;
  isAuth: boolean;
};

const initialState: TinitialState = {
  status: null,
  error: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state) => {
        state.status = "resolved";
        state.isAuth = true;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
