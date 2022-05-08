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
      <button
        onClick={() => navigate(`/toilet/${toiletId}/comment`)}
        className="w-full bg-tnBlue"
      >
        작성하기
      </button>
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
