export interface Center {
  lat: number;
  lng: number;
}

export interface CenterState {
  center: Center;
  isAllow: boolean;
}

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
