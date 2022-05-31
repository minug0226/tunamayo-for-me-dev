import { createSlice } from "@reduxjs/toolkit";

export const mapCenterSlice = createSlice({
  name: "mapCenter",
  initialState: {
    value: {
      lat: 37.5697,
      lng: 126.982,
    },
  },
  reducers: {
    changeCenter: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeCenter } = mapCenterSlice.actions;

export default mapCenterSlice.reducer;
