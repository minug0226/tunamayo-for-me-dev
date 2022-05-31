import { MyCommentProps } from "../types/comment";
import { customAxios } from "../lib/customAxios";
import { useState, useEffect } from "react";
import { IToilet } from "../types/toilet";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import { useToiletQuery } from "../api/toilet";

const MyComment = ({
  content,
  createdAt,
  rating,
  toiletId,
}: MyCommentProps) => {
  const navigate = useNavigate();
  const toiletInfo = useToiletQuery(toiletId);

  // const [toilet, setToilet] = useState<IToilet>();
  // const toiletRequest = async () => {
  //   const request = await customAxios.get(`/toilets/${toiletId}`);
  //   const { toiletInfo } = request.data;
  //   setToilet(toiletInfo);
  // };

  // useEffect(() => {
  //   toiletRequest();
  // }, []);

  return (
    <div className="py-4 px-5 border-b border-[#F6F6F6]">
      <div className="flex space-x-1 items-center mb-2">
        <StarRating
          rating={rating}
          imgClass="w-[15px] h-[15px]"
          starColor="blue"
        />
      </div>
      <div className="mb-2 font-normal text-sm leading-[22px] text-gray80">
        {content}
      </div>

      <div className="flex justify-between font-normal text-sm leading-[22px] text-gray40">
        <div
          onClick={() =>
            navigate(`/toilet/${toiletInfo?.data?.id}?history=true`)
          }
          className="cursor-pointer"
        >
          {toiletInfo?.data?.toiletName}
        </div>
        <div>{createdAt.split("T")[0]}</div>
      </div>
    </div>
  );
};

export default MyComment;
