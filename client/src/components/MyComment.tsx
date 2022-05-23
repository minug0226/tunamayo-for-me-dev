import { MyCommentProps } from "../lib/interfaces";
import { customAxios } from "../lib/customAxios";
import { useState, useEffect } from "react";
import { IToilet } from "../lib/interfaces";
import { useNavigate } from "react-router-dom";

const MyComment = ({
  content,
  createdAt,
  rating,
  toiletId,
}: MyCommentProps) => {
  const navigate = useNavigate();
  const [toilet, setToilet] = useState<IToilet>();
  const toiletRequest = async () => {
    const request = await customAxios.get(`/toilets/${toiletId}`);
    const { toiletInfo } = request.data;
    setToilet(toiletInfo);
  };

  const numberOfFilled = Math.floor(rating); // 꽉별 개수
  const numberOfHalfFilled = rating % 1 === 0 ? 0 : 1; // 반별 개수
  const numberOfNonFilled = 5 - (numberOfFilled + numberOfHalfFilled); // 빈별 개수

  useEffect(() => {
    toiletRequest();
  }, []);

  return (
    <div className="py-4 px-5 border-b border-[#F6F6F6]">
      <div className="flex space-x-1 items-center mb-2">
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
      </div>
      <div className="mb-2 font-normal text-sm leading-[22px] text-gray80">
        {content}
      </div>

      <div className="flex justify-between font-normal text-sm leading-[22px] text-gray40">
        <div
          onClick={() => navigate(`/toilet/${toilet?.id}`)}
          className="cursor-pointer"
        >
          {toilet?.toiletName}
        </div>
        <div>{createdAt.split("T")[0]}</div>
      </div>
    </div>
  );
};

export default MyComment;
