import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../lib/customAxios";

const WriteComment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryString: string = location.search;
  const commentId: string = queryString.split("=")[1];
  const { toiletId } = useParams();
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (commentId) {
      customAxios
        .get(`/toilets/${toiletId}/comments?commentId=${commentId}`)
        .then((res) => {
          if (res.status === 206) {
            setContent(res.data.comment.content);
            setRating(res.data.comment.rating);
          }
        });
    }
  }, []);

  const postComment = async () => {
    if (commentId) {
      await customAxios.patch(`/toilets/${toiletId}/comments/${commentId}`, {
        content,
        rating,
      });
      navigate(`/toilet/${toiletId}`, { replace: true });
    } else {
      await customAxios.post(`/toilets/${toiletId}/comments`, {
        content,
        rating,
      });

      navigate(`/toilet/${toiletId}`, { replace: true });
    }
  };

  return (
    <>
      <div className="pt-10">
        <div>댓글작성</div>
        <input
          onChange={(e) => setRating(Number(e.currentTarget.value))}
          value={rating}
          type="text"
        />
        <input
          onChange={(e) => setContent(e.currentTarget.value)}
          value={content}
          className="w-full h-10 bg-tnBlue"
          type="text"
        />
        <button
          className="mr-10"
          onClick={() => navigate(`/toilet/${toiletId}`, { replace: true })}
        >
          취소
        </button>
        <button className="mr-10" onClick={postComment}>
          확인
        </button>
      </div>
    </>
  );
};

export default WriteComment;
