import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store/store";

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
