import { createSlice } from "@reduxjs/toolkit";

export const redirectPathSlice = createSlice({
  name: "redirectPath",
  initialState: {
    value: "/",
  },
  reducers: {
    changeRedirectPath: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeRedirectPath } = redirectPathSlice.actions;

export default redirectPathSlice.reducer;
