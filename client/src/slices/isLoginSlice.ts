import { createSlice } from "@reduxjs/toolkit";

export const isLoginSlice = createSlice({
  name: "isLogin",
  initialState: {
    value: false,
  },
  reducers: {
    loginHandler: (state) => {
      state.value = true;
    },
    logoutHandler: (state) => {
      state.value = false;
    },
  },
});

export const { loginHandler, logoutHandler } = isLoginSlice.actions;

export default isLoginSlice.reducer;
