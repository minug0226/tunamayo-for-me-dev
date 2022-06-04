import StarRating from "../comment/StarRating";
import { useNavigate } from "react-router-dom";
import { ModalPopUpProps, ModalPopUpState } from "../../types/common";

const ModalPopUp = ({
  toiletInfo,
  commentInfo,
  modalPopUp,
}: ModalPopUpProps) => {
  const navigate = useNavigate();

  const modalClass = (modalPopUp: ModalPopUpState) => {
    const defaultClass = "sticky bottom-0 ";
    if (modalPopUp === "pop-up") return defaultClass + "animate-modalPopUp";
    else if (modalPopUp === "pop-down")
      return defaultClass + "animate-modalPopDown";
    else return "hidden";
  };

  return (
    <>
      <div className={modalClass(modalPopUp)}>
        <div
          onClick={() =>
            window.open(
              `https://map.kakao.com/link/to/${toiletInfo.title},${toiletInfo.latlng.lat},${toiletInfo.latlng.lng}`
            )
          }
          className="cursor-pointer flex space-x-1 items-center bg-white pt-[9px] pb-[11px] w-[103px] justify-center rounded-[22px] shadow-search mb-2 ml-auto mr-4"
        >
          <img src="/images/main/find-route-icon.svg" alt="find-route-icon" />
          <div className="text-tnDeepBlue font-normal text-sm leading-[22px]">
            길찾기
          </div>
        </div>

        <div className="w-full h-[205px] rounded-t-[20px] z-10 bg-[#FEFEFE] shadow-modalPopUp">
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
      </div>
    </>
  );
};

export default ModalPopUp;
