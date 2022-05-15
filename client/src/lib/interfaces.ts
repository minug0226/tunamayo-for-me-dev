export interface PropsType {
  toiletInfo: ToiletInfoProps;
  commentInfo: CommentInfoProps;
  modalPopUp: boolean;
}

export interface MyCommentProps {
  content: string;
  createdAt: string;
  id?: number;
  rating: number;
  toiletId: number;
  updatedAt?: string;
  userId?: number;
}

export interface IComment {
  content: string;
  nickname: string;
  id: number;
  userId: number;
  rating: number;
  toiletId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentInfoProps {
  length: number;
  avg: number;
}

export interface ToiletInfoProps {
  title: string;
  roadName: string;
  id: number;
}

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

export interface IUser {
  nickname?: string;
  email?: string;
  isAdmin?: boolean;
}
