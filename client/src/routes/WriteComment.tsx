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

  const numberOfFilled = Math.floor(rating); // 꽉별 개수
  const numberOfHalfFilled = rating % 1 === 0 ? 0 : 1; // 반별 개수
  const numberOfNonFilled = 5 - (numberOfFilled + numberOfHalfFilled); // 빈별 개수

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
        <div className="relative mx-auto flex w-fit items-center justify-center gap-x-1 py-4">
          <input
            className="bg-red-500 absolute top-0 right-0 h-full w-full cursor-pointer py-0 opacity-0"
            type="range"
            step="0.5"
            min="0"
            max="5"
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <div className="py-4 flex space-x-1 items-center">
            {Array(numberOfFilled)
              .fill(1)
              .map((_, i) => (
                <div key={i}>
                  <img
                    className="w-6 h-6"
                    src="/images/star/star-filled.svg"
                    alt="filled"
                  />
                </div>
              ))}
            {Array(numberOfHalfFilled)
              .fill(1)
              .map((_, i) => (
                <div key={i}>
                  <img
                    className="w-[27.8px] h-[27.8px]"
                    src="/images/star/star-half-filled.svg"
                    alt="half"
                  />
                </div>
              ))}
            {Array(numberOfNonFilled)
              .fill(1)
              .map((_, i) => (
                <div key={i}>
                  <img
                    className="w-6 h-6"
                    src="/images/star/star-non-filled.svg"
                    alt="non"
                  />
                </div>
              ))}
          </div>
        </div>
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
