import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import { useToiletQuery } from "../../api/toilet";
import { MyCommentProps } from "../../types/comment";

const MyComment = ({
  content,
  createdAt,
  rating,
  toiletId,
}: MyCommentProps) => {
  const navigate = useNavigate();
  const toiletInfo = useToiletQuery(toiletId);

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
