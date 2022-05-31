import { createSlice } from "@reduxjs/toolkit";

export const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState: {
    value: {
      lat: 37.5697,
      lng: 126.982,
    },
  },
  reducers: {
    changeCurrentLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeCurrentLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;
