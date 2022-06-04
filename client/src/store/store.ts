import { configureStore } from "@reduxjs/toolkit";
import callGeoApiSlice from "../slices/callGeoApiSlice";
import currentLocationSlice from "../slices/currentLocationSlice";
import locationAllowSlice from "../slices/locationAllowSlice";
import mapCenterSlice from "../slices/mapCenterSlice";
import modalSlice from "../slices/modalSlice";
import redirectPathSlice from "../slices/redirectPathSlice";
import splashSlice from "../slices/splashSlice";

export const store = configureStore({
  reducer: {
    splash: splashSlice,
    modal: modalSlice,
    callGeoApi: callGeoApiSlice,
    center: mapCenterSlice,
    locationAllow: locationAllowSlice,
    currentLocation: currentLocationSlice,
    redirectPath: redirectPathSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
