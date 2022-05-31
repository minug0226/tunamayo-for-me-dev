import { Dispatch, SetStateAction } from "react";

export interface Center {
  lat: number;
  lng: number;
}

export interface CenterState {
  center: Center;
  isAllow: boolean;
}

// export interface CurrentLocationButtonProps {
//   setCenter: Dispatch<SetStateAction<CenterState>>;
// }

export interface Latlng {
  lat: number;
  lng: number;
}

export interface MapToiletList {
  id: number;
  toiletName: string;
  latitude: number;
  longitude: number;
  roadName: string;
}
