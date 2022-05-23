import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IComment } from "../lib/interfaces";
import Comment from "./Comment";
import { customAxios } from "../lib/customAxios";
import { useSelector } from "react-redux";
import Modal from "./Modal";

const Comments = () => {
  const navigate = useNavigate();
  const isLogin = useSelector<any>((state) => state.isLogin.value);
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const { toiletId } = useParams();

  const commentRequest = async () => {
    const request = await customAxios.get(`/toilets/${toiletId}/comments`);
    const { commentList } = request.data;

    setCommentList(commentList);
  };

  const writeCommentHandler = () => {
    if (isLogin) navigate(`/toilet/${toiletId}/comment`);
    else setLoginModal(true);
  };

  useEffect(() => {
    commentRequest();
  }, [deleteState]);

  return (
    <div>
      {loginModal && (
        <Modal
          setModal={setLoginModal}
          title="앗! 로그인이 필요합니다 😅"
          left="취소"
          right="로그인하기"
          action={() => navigate("/login")}
        />
      )}

      <div className="flex justify-between py-[15px] px-5 items-center border-b border-gray20">
        <div className="w-[72px]"></div>
        <div className="font-medium leading-8 text-xl text-tnBlack">리뷰</div>
        <button
          onClick={writeCommentHandler}
          className="h-9 w-[72px] bg-tnBlueLight rounded text-tnBlack font-medium text-sm leading-[14px]"
        >
          글쓰기
        </button>
      </div>

      {[...commentList].slice(0, 3).map((comment: IComment) => {
        return (
          <Comment
            key={comment.id}
            commentId={comment.id}
            toiletId={comment.toiletId}
            userId={comment.userId}
            content={comment.content}
            nickname={comment.nickname}
            rating={comment.rating}
            createdAt={comment.createdAt}
            deleteState={deleteState}
            setDeleteState={setDeleteState}
          />
        );
      })}

      {showMore &&
        [...commentList]
          .slice(3, commentList.length)
          .map((comment: IComment) => {
            return (
              <Comment
                key={comment.id}
                commentId={comment.id}
                toiletId={comment.toiletId}
                userId={comment.userId}
                content={comment.content}
                nickname={comment.nickname}
                rating={comment.rating}
                createdAt={comment.createdAt}
                deleteState={deleteState}
                setDeleteState={setDeleteState}
              />
            );
          })}

      {commentList.length ? null : (
        <div className="flex flex-col items-center pt-20">
          <img
            className="mb-1 w-12 h-12"
            src="/images/toilet/no-review-icon.svg"
            alt="no-reveiw-icon"
          />
          <div className="flex flex-col items-center font-normal text-base leadin-[26px] text-gray40">
            <div>아직 리뷰가 없어요.</div>
            <div>첫 번째 리뷰를 남겨주세요!</div>
          </div>
        </div>
      )}
      {commentList.length > 3 && (
        <div
          onClick={() => setShowMore(!showMore)}
          className="flex justify-center py-2 cursor-pointer"
        >
          <div className="text-tnBlack font-normal text-base leading-[26px]">
            {showMore ? "접기" : "더보기"}
          </div>
          <img
            className="w-6 h-6"
            src={
              showMore
                ? "/images/toilet/close-arrow.svg"
                : "/images/toilet/open-arrow.svg"
            }
            alt="comment-open-arrow"
          />
        </div>
      )}
    </div>
  );
};

export default Comments;
