import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DrawerHeader from "../components/DrawerHeader";
import { customAxios } from "../lib/customAxios";

const WriteComment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<HTMLTextAreaElement | null>(null);
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
      <DrawerHeader
        title="리뷰"
        isAdmin={false}
        action={postComment}
        content={content}
      />
      <div>
        {/* 피터 수정 */}
        <div className="flex flex-col items-center">
          <div className="relative flex w-fit items-center justify-center gap-x-1">
            <input
              className="bg-red-500 absolute top-0 right-0 h-full w-full cursor-pointer py-0 opacity-0"
              type="range"
              step="0.5"
              min="0"
              max="5"
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <div className="flex items-center">
              {/* 피터 수정 */}
              <div className="pt-4 pb-1 flex items-center space-x-5">
                {Array(numberOfFilled)
                  .fill(1)
                  .map((_, i) => (
                    <div key={i}>
                      <img
                        // 피터 수정
                        className="w-9 h-9"
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
                        // 피터 수정
                        className="w-9 h-9"
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
                        // 피터 수정
                        className="w-9 h-9"
                        src="/images/star/star-non-blue.svg"
                        alt="non"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* 피터 수정 */}
        <div className="pt-1 mb-4 text-center font-normal text-sm leading-[22px] text-gray20">
          좌우로 드래그하여 별점을 매겨주세요.
        </div>
        <div className="h-[1px] bg-[#F6F6F6] mb-4"></div>
        <div className="px-5 relative">
          <textarea
            ref={ref}
            autoComplete="off"
            onChange={(e) => setContent(e.currentTarget.value)}
            value={content}
            className="w-full h-[500px] resize-none outline-none cursor-pointer py-[6px] text-base text-tnBlack font-normal"
          />

          {content.length ? null : (
            <div
              onClick={() => ref.current?.focus()}
              className="absolute top-[6px] text-gray20 font-normal text-base leading-[26px]"
            >
              <div>화장실에 대한 의견을 자유롭게 남겨 주세요.</div>

              <div className="pl-[6px]">
                <li>타인에 대한 비방, 욕설은 금지합니다.</li>
                <li>광고나 불법자료에 대한 내용은 금지합니다.</li>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WriteComment;
