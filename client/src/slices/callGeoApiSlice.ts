import { createSlice } from "@reduxjs/toolkit";

export const callGeoApiSlice = createSlice({
  name: "callGeoApi",
  initialState: {
    value: true,
  },
  reducers: {
    pauseGeoLocationApi: (state) => {
      state.value = false;
    },
  },
});

export const { pauseGeoLocationApi } = callGeoApiSlice.actions;

export default callGeoApiSlice.reducer;
