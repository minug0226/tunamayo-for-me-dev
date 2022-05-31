import { useNavigate } from "react-router-dom";
import { ModalPopUpProps, ModalPopUpState } from "../types/common";
import StarRating from "./StarRating";

const ModalPopUp = ({
  toiletInfo,
  commentInfo,
  modalPopUp,
}: ModalPopUpProps) => {
  const navigate = useNavigate();

  const modalClass = (modalPopUp: ModalPopUpState) => {
    const defaultClass =
      "sticky bottom-0 w-full h-[205px] rounded-t-[20px] z-10 bg-[#FEFEFE] shadow-modalPopUp ";
    if (modalPopUp === "pop-up") return defaultClass + "animate-modalPopUp";
    else if (modalPopUp === "pop-down")
      return defaultClass + "animate-modalPopDown";
    else return "hidden";
  };

  return (
    <>
      <div className={modalClass(modalPopUp)}>
        <div className="pt-4 pb-[18px] px-5 border-b border-gray20">
          <div className="p-1 font-medium text-xl leading-8 text-tnBlack">
            {toiletInfo.title}
          </div>
          <div className="p-1 font-normal text-base leading-[26px] text-gray80 overflow-hidden truncate">
            {toiletInfo.roadName}
          </div>
          <div className="flex p-1 space-x-[3px] items-center">
            <div className="font-normal text-sm leading-5 text-gray80">
              {commentInfo.avg}
            </div>
            <div className="flex space-x-1 items-center">
              <StarRating
                rating={commentInfo.avg}
                imgClass="w-[15px] h-[15px]"
                starColor="black"
              />
            </div>
            <div className="font-normal text-sm leading-5 text-gray80">
              ({commentInfo.length})
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            className="w-[157px] text-sm font-normal leading-[22px] text-tnDeepBlue cursor-pointer"
            onClick={() => navigate(`/toilet/${toiletInfo.id}`)}
          >
            상세보기
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalPopUp;
