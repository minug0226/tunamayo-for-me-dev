import Modal from "../common/Modal";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { displayModal, hideModal } from "../../slices/modalSlice";
import { CommentProps } from "../../types/comment";
import { useQueryClient } from "react-query";
import { useDeleteComment } from "../../api/comment";
import { useTokenValidationQuery } from "../../api/user";

const Comment = ({
  content,
  nickname,
  rating,
  userId,
  toiletId,
  commentId,
  createdAt,
}: CommentProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMine, setIsMine] = useState<boolean>(false);
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const deleteModal = useSelector<RootState>((state) => state.modal.value);

  const queryClient = useQueryClient();
  const userInfo = useTokenValidationQuery();
  const deleteComment = useDeleteComment();

  useEffect(() => {
    if (userInfo?.data?.status === 200 && userInfo?.data?.id === userId)
      setIsMine(true);
  }, [userId, userInfo]);

  const deleteHandler = () => {
    deleteComment.mutate(
      { toiletId, commentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["allComments", toiletId]);
        },
      }
    );
    setDeleteState(true);
    dispatch(hideModal());
    setDeleteState(false);
  };

  return (
    <>
      <div className="-z-50">
        <div className="px-5 py-4 border-b border-gray20">
          <div className="flex justify-between">
            <div
              onClick={() => console.log("commentId : ", commentId)}
              className="font-medium text-tnBlack text-base leading-[26px]"
            >
              {nickname}
            </div>
            <div className="text-gray60 font-normal text-sm leading-[22px]">
              {createdAt.split("T")[0]}
            </div>
          </div>
          <div className="py-4 flex space-x-1 items-center">
            <StarRating
              rating={rating}
              imgClass="w-[15px] h-[15px]"
              starColor="blue"
            />
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
                onClick={() => {
                  window.scrollTo(0, 0);
                  setDeleteState(true);
                  dispatch(displayModal());
                }}
                className="cursor-pointer font-normal text-sm leading-[22px] text-gray60"
              >
                삭제
              </div>
            </div>
          )}
        </div>
      </div>
      {deleteModal ? (
        deleteState ? (
          <Modal
            title="해당 댓글을 삭제하시겠습니까?😮"
            left="취소"
            right="삭제"
            action={deleteHandler}
          />
        ) : null
      ) : null}
    </>
  );
};

export default Comment;
