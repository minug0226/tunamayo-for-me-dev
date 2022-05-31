import { Dispatch, SetStateAction } from "react";

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

export interface CommentProps {
  content: string;
  nickname: string;
  rating: number;
  userId: number;
  toiletId: number;
  commentId: number;
  // setDeleteState: Dispatch<SetStateAction<boolean>>;
  // deleteState: boolean;
  createdAt: string;
}
