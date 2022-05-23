import { useNavigate } from "react-router-dom";
import { PropsType } from "../lib/interfaces";

const ModalPopUp = ({ toiletInfo, commentInfo, modalPopUp }: PropsType) => {
  const navigate = useNavigate();
  const numberOfFilled = Math.floor(commentInfo.avg); // 꽉별 개수
  const numberOfHalfFilled = commentInfo.avg % 1 === 0 ? 0 : 1; // 반별 개수
  const numberOfNonFilled = 5 - (numberOfFilled + numberOfHalfFilled); // 빈별 개수

  const modalClass = (modalPopUp: boolean) => {
    if (modalPopUp)
      return "animate-modalPopUp sticky bottom-0 w-full h-[199px] rounded-t-[20px] z-10 bg-[#FEFEFE] shadow-modalPopUp";
    else
      return "animate-modalPopDown transition-all hidden duration-[1700ms] sticky bottom-[-50%] w-full h-[199px] rounded-t-[20px] z-10 bg-[#FEFEFE] shadow-modalPopUp";
  };

  return (
    <>
      <div className={modalClass(modalPopUp)}>
        <div className="pt-4 pb-[18px] px-5 border-b border-gray20">
          <div className="p-1 font-medium text-xl leading-8 text-tnBlack">
            {toiletInfo.title}
          </div>
          <div className="p-1 font-normal text-base leading-[26px] text-gray80">
            {toiletInfo.roadName}
          </div>
          <div className="flex p-1 space-x-[3px] items-center">
            <div className="font-normal text-sm leading-5 text-gray80">
              {commentInfo.avg}
            </div>
            <div className="flex space-x-1 items-center">
              {Array(numberOfFilled)
                .fill(1)
                .map((_, i) => (
                  <div key={i}>
                    <img
                      className="w-[15px] h-[15px]"
                      src="/images/star/star-filled-black.svg"
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
                      src="/images/star/star-half-black.svg"
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
