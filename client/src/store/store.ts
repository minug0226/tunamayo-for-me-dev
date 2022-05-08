import { configureStore } from "@reduxjs/toolkit";
import isLoginSlice from "../slices/isLoginSlice";

export const store = configureStore({
  reducer: {
    isLogin: isLoginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
