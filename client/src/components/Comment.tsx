import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../lib/customAxios";
import Modal from "./Modal";

interface CommentProps {
  content: string;
  nickname: string;
  rating: number;
  userId: number;
  toiletId: number;
  commentId: number;
  setDeleteState: Dispatch<SetStateAction<boolean>>;
  deleteState: boolean;
  createdAt: string;
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
  createdAt,
}: CommentProps) => {
  const [isMine, setIsMine] = useState(false);
  const navigate = useNavigate();

  const numberOfFilled = Math.floor(rating); // 꽉별 개수
  const numberOfHalfFilled = rating % 1 === 0 ? 0 : 1; // 반별 개수
  const numberOfNonFilled = 5 - (numberOfFilled + numberOfHalfFilled); // 빈별 개수
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    customAxios.get("/users/token").then((res) => {
      if (res.status === 200 && res.data.id === userId) setIsMine(true);
    });
  }, [userId]);

  const deleteHandler = async () => {
    await customAxios.delete(`/toilets/${toiletId}/comments/${commentId}`);
    setDeleteState(!deleteState);
  };

  return (
    <>
      <div className="px-5 py-4 border-b border-gray20">
        <div className="flex justify-between">
          <div className="font-medium text-tnBlack text-base leading-[26px]">
            {nickname}
          </div>
          <div className="text-gray60 font-normal text-sm leading-[22px]">
            {createdAt.split("T")[0]}
          </div>
        </div>
        <div className="py-4 flex space-x-1 items-center">
          {Array(numberOfFilled)
            .fill(1)
            .map((_, i) => (
              <div key={i}>
                <img
                  className="w-[15px] h-[15px]"
                  src="/images/star/star-filled-blue.svg"
                  alt="filled"
                />
              </div>
            ))}
          {Array(numberOfHalfFilled)
            .fill(1)
            .map((_, i) => (
              <div key={i}>
                <img
                  className="w-[15px] h-[15px]"
                  src="/images/star/star-half-blue.svg"
                  alt="half"
                />
              </div>
            ))}
          {Array(numberOfNonFilled)
            .fill(1)
            .map((_, i) => (
              <div key={i}>
                <img
                  className="w-[15px] h-[15px]"
                  src="/images/star/star-non-blue.svg"
                  alt="non"
                />
              </div>
            ))}
          <div className="text-xs text-gray60">({rating.toFixed(1)})</div>
        </div>
        <div className="font-normal text-gray60 text-sm leading-[22px] mb-4">
          {content}
        </div>

        {isMine && (
          <div className="flex space-x-4">
            <div className="flex-1"></div>
            <div
              onClick={() =>
                navigate(`/toilet/${toiletId}/comment?commentId=${commentId}`)
              }
              className="cursor-pointer font-normal text-sm leading-[22px] text-gray60"
            >
              수정
            </div>
            <div
              onClick={() => setDeleteModal(true)}
              className="cursor-pointer font-normal text-sm leading-[22px] text-gray60"
            >
              삭제
            </div>
          </div>
        )}
      </div>
      {deleteModal && (
        <Modal
          setModal={setDeleteModal}
          title="해당 댓글을 삭제하시겠습니까?😮"
          left="취소"
          right="삭제"
          action={deleteHandler}
        />
      )}
    </>
  );
};

export default Comment;
