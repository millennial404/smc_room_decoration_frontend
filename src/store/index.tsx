import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./roomsSlice";
import popupReducer from "./popupSlice";
import currentRoomSlice from "./currentRoomSlice";
import authReducer from "./authSlice.js";
import userReducer from "./userSlice.js";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    popup: popupReducer,
    currentRoom: currentRoomSlice,
    auth: authReducer,
    user: userReducer,
  },
});

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
