import { Latlng } from "./map";

export interface IToilet {
  agency?: string;
  agencyNumber?: string;
  boyClosetCount?: number;
  boyUrinalCount?: number;
  builtTime?: string;
  createdAt?: string;
  femaleClosetCount?: number;
  girlClosetCount?: number;
  handiFemaleClosetCount?: number;
  handiMaleClosetCount?: number;
  handiUrinalCount?: number;
  hasAlarm?: boolean;
  hasCctv?: boolean;
  hasDiaperTable?: boolean;
  id: number;
  isUnisex?: boolean;
  lastUpdate?: string;
  latitude: number;
  locationType?: string;
  longitude: number;
  lotName?: string;
  maleClosetCount: number;
  openTime?: string;
  ownType?: string;
  processType?: string;
  roadName: string;
  toiletName: string;
  type?: string;
  updatedAt?: string;
  urinalCount?: number;
}

export interface ToiletInfoProps {
  title: string;
  roadName: string;
  id: number;
  latlng: Latlng;
}

export interface ToiletSummaryProps {
  toilet?: IToilet;
}

export interface ToiletDetailsProps {
  toilet?: IToilet;
}

export interface ToiletPosition {
  id: number;
  title: string;
  roadName: string;
  latlng: Latlng;
}

export interface ToiletList {
  id: number;
  title: string;
  latlng: Latlng;
  roadName: string;
}
