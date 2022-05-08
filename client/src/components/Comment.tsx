import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../lib/customAxios";

interface CommentProps {
  content: string;
  nickname: string;
  rating: number;
  userId: number;
  toiletId: number;
  commentId: number;
  setDeleteState: any;
  deleteState: boolean;
}

const Comment = ({
  content,
  nickname,
  rating,
  userId,
  toiletId,
  commentId,
  setDeleteState,
  deleteState,
}: CommentProps) => {
  const [isMine, setIsMine] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    customAxios.get("/users/token").then((res) => {
      if (res.status === 200 && res.data.id === userId) setIsMine(true);
    });
  }, []);

  const deleteHandler = async () => {
    await customAxios.delete(`/toilets/${toiletId}/comments/${commentId}`);
    setDeleteState(!deleteState);
  };

  return (
    <div>
      <div>닉네임 : {nickname}</div>
      <div>댓글 : {content}</div>
      <div>별점 : {rating}</div>
      {isMine && (
        <div className="flex space-x-3">
          <div
            onClick={() =>
              navigate(`/toilet/${toiletId}/comment?commentId=${commentId}`)
            }
            className="cursor-pointer bg-tnBlue"
          >
            수정
          </div>
          <div onClick={deleteHandler} className="cursor-pointer bg-tnBlue">
            삭제
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
