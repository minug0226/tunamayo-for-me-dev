import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IComment } from "../lib/interfaces";
import Comment from "./Comment";
import { customAxios } from "../lib/customAxios";

const Comments = () => {
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [deleteState, setDeleteState] = useState(false);
  const { toiletId } = useParams();

  const commentRequest = async () => {
    const request = await customAxios.get(`/toilets/${toiletId}/comments`);
    const { commentList } = request.data;
    console.log(commentList);
    setCommentList(commentList);
  };

  useEffect(() => {
    commentRequest();
  }, [deleteState]);

  return (
    <>
      <div className="flex justify-between py-[15px] px-5 items-center border-b border-gray20">
        <div className="w-[72px]"></div>
        <div className="font-medium leading-8 text-xl text-tnBlack">리뷰</div>
        <button
          onClick={() => navigate(`/toilet/${toiletId}/comment`)}
          className="h-9 w-[72px] bg-tnBlueLight rounded text-tnBlack font-medium text-sm leading-[14px]"
        >
          글쓰기
        </button>
      </div>
      {commentList.map((comment: IComment) => {
        return (
          <Comment
            key={comment.id}
            commentId={comment.id}
            toiletId={comment.toiletId}
            userId={comment.userId}
            content={comment.content}
            nickname={comment.nickname}
            rating={comment.rating}
            deleteState={deleteState}
            setDeleteState={setDeleteState}
          />
        );
      })}
    </>
  );
};

export default Comments;
