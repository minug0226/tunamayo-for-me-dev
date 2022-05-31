import { ToiletInfoProps, ToiletPosition } from "./toilet";
import { CommentInfoProps } from "./comment";
import { IToilet } from "./toilet";
import { IUser } from "./user";
import { Dispatch, SetStateAction } from "react";

export interface ModalPopUpProps {
  toiletInfo: ToiletInfoProps;
  commentInfo: CommentInfoProps;
  modalPopUp: "pop-up" | "pop-down" | "hidden";
}

export type ModalPopUpState = "hidden" | "pop-up" | "pop-down";

export interface DrawerProps {
  drawer: boolean;
  drawerClose: boolean;
  // userInfo: IUser | null;
}

export interface DrawerHeaderProps {
  title: string;
  isAdmin: boolean;
  reportTitle?: string;
  reportContent?: string;
  content?: string;
  rightNone?: boolean;
  errState?: boolean;
  action?: () => void;
}

export interface HeaderProps {
  toilet?: IToilet;
}

export interface LoadingProps {
  content: string;
}

export interface StarRatingProps {
  rating: number;
  imgClass: string;
  starColor: string;
}

export interface ModalProps {
  setSignout?: Dispatch<SetStateAction<boolean>>;
  title: string;
  oneButton?: string;
  left?: string;
  right?: string;
  action?: (data?: any) => void;
}

export interface NavProps {
  setDrawer: Dispatch<SetStateAction<boolean>>;
}

// export interface SearchBarProps {
//   data?: ToiletPosition[];
//   setCenter: any;
// }
