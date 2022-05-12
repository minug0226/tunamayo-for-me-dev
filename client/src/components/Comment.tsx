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
    <div className="border-b border-gray20">
      <div className="pl-5 pr-[14px] pt-3 pb-[15px]">
        <div className="flex justify-between items-center mb-6">
          <div className="font-medium text-tnBlack text-base leading-[26px]">
            {nickname}
          </div>
          <div className="font-medium text-tnBlack text-sm leading-5">
            {rating.toFixed(1)} *****
          </div>
        </div>
        <div className="font-medium text-tnBlack text-base leading-[26px]">
          {content}
        </div>
      </div>
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
