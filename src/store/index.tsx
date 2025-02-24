import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./roomsSlice";
import popupReducer from "./popupSlice";
import currentRoomSlice from "./currentRoomSlice";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    popup: popupReducer,
    currentRoom: currentRoomSlice,
  },
});
