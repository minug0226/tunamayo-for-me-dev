import { createSlice } from "@reduxjs/toolkit";

export const locationAllowSlice = createSlice({
  name: "locationAllow",
  initialState: {
    value: false,
  },
  reducers: {
    changeLocationAllow: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeLocationAllow } = locationAllowSlice.actions;

export default locationAllowSlice.reducer;
