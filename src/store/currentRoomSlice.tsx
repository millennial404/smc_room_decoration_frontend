import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  currentRoom: object;
};

const initialState: initialState = {
  currentRoom: {},
};

const currentRoomSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setCurrentRoom: (state, action: PayloadAction<object>) => {
      state.currentRoom = action.payload;
    },
  },
});

export const { setCurrentRoom } = currentRoomSlice.actions; // Экспорт генератора действий
export default currentRoomSlice.reducer; // Экспорт редюсера
