import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  popup: boolean;
};

const initialState: initialState = {
  popup: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopup: (state, action: PayloadAction<boolean>) => {
      state.popup = action.payload;
    },
  },
});

export const { setPopup } = popupSlice.actions; // Экспорт генератора действий
export default popupSlice.reducer; // Экспорт редюсера
