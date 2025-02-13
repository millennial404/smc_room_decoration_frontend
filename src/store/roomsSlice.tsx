import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllRooms } from "../api";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", () => {
  return getAllRooms();
});

type initialState = {
  loading: boolean;
  rooms: object[];
  error: string;
};
const initialState: initialState = {
  loading: false,
  rooms: [],
  error: "",
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchRooms.fulfilled,
        (state, action: PayloadAction<object[]>) => {
          state.loading = false;
          state.rooms = action.payload;
          state.error = "";
        }
      )
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.rooms = [];
        state.error = action.error.message || "Что-то пошло не так";
      });
  },
});

export default roomsSlice.reducer;
