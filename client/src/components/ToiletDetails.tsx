import { useState } from "react";
import { ToiletDetailsProps } from "../types/toilet";

const ToiletDetails = ({ toilet }: ToiletDetailsProps) => {
  const [dropdown, setDropdown] = useState<Boolean>(false);

  return (
    <div className="border-b border-gray20">
      <div className="p-5 flex items-center justify-between">
        <div className="text-base text-tnBlack font-normal leading-[26px]">
          화장실 세부 정보
        </div>
        <img
          onClick={() => setDropdown(!dropdown)}
          className="cursor-pointer"
          src={
            dropdown
              ? "/images/toilet/dropdown-opened.svg"
              : "/images/toilet/dropdown-closed.svg"
          }
          alt="dropdown-opened"
        ></img>
      </div>

      {dropdown ? (
        <div className="origin-center animate-dropdown pt-3 pl-5 pb-[42px] pr-[25px] bg-[#F6F6F6] text-tnBlack font-normal text-base leading-[26px]">
          <div className="flex">
            <div className="mr-11 text-transparent">남성용</div>
            <div className="flex-1 text-base font-normal text-gray60">
              <div className="flex justify-between mb-3">
                <div>남녀공용여부</div>
                <div className={toilet?.isUnisex ? "text-tnDeepBlue" : ""}>
                  {toilet?.isUnisex ? "Y" : "N"}
                </div>
              </div>
              <div className="flex justify-between mb-3">
                <div>비상벨 설치여부</div>
                <div className={toilet?.hasAlarm ? "text-tnDeepBlue" : ""}>
                  {toilet?.hasAlarm ? "Y" : "N"}
                </div>
              </div>
              <div className="flex justify-between mb-3">
                <div>CCTV 설치유무</div>
                <div className={toilet?.hasCctv ? "text-tnDeepBlue" : ""}>
                  {toilet?.hasCctv ? "Y" : "N"}
                </div>
              </div>
              <div className="flex justify-between mb-3">
                <div>기저귀 교환대 유무</div>
                <div
                  className={toilet?.hasDiaperTable ? "text-tnDeepBlue" : ""}
                >
                  {toilet?.hasDiaperTable ? "Y" : "N"}
                </div>
              </div>
            </div>
          </div>

          <div className="flex mb-9">
            <div className="mr-11">남성용</div>
            <div className="flex-1 pt-[1.5px] space-y-3 text-base font-normal text-gray60">
              <div className="flex justify-between">
                <div>대변기 수</div>
                <div
                  className={toilet?.maleClosetCount ? "text-tnDeepBlue" : ""}
                >
                  {toilet?.maleClosetCount}
                </div>
              </div>
              <div className="flex justify-between">
                <div>소변기 수</div>
                <div className={toilet?.urinalCount ? "text-tnDeepBlue" : ""}>
                  {toilet?.urinalCount}
                </div>
              </div>
              <div className="flex justify-between">
                <div>장애인용 대변기 수</div>
                <div
                  className={
                    toilet?.handiMaleClosetCount ? "text-tnDeepBlue" : ""
                  }
                >
                  {toilet?.handiMaleClosetCount}
                </div>
              </div>
              <div className="flex justify-between">
                <div>장애인용 소변기 수</div>
                <div
                  className={toilet?.handiUrinalCount ? "text-tnDeepBlue" : ""}
                >
                  {toilet?.handiUrinalCount}
                </div>
              </div>
              <div className="flex justify-between">
                <div>어린이용 대변기 수</div>
                <div
                  className={toilet?.boyClosetCount ? "text-tnDeepBlue" : ""}
                >
                  {toilet?.boyClosetCount}
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="mr-11">여성용</div>
            <div className="flex-1 pt-[1.5px] space-y-3 text-base font-normal text-gray60">
              <div className="flex justify-between">
                <div>대변기 수</div>
                <div
                  className={toilet?.femaleClosetCount ? "text-tnDeepBlue" : ""}
                >
                  {toilet?.femaleClosetCount}
                </div>
              </div>
              <div className="flex justify-between">
                <div>장애인용 대변기 수</div>
                <div
                  className={
                    toilet?.handiFemaleClosetCount ? "text-tnDeepBlue" : ""
                  }
                >
                  {toilet?.handiFemaleClosetCount}
                </div>
              </div>

              <div className="flex justify-between">
                <div>어린이용 대변기 수</div>
                <div
                  className={toilet?.girlClosetCount ? "text-tnDeepBlue" : ""}
                >
                  {toilet?.girlClosetCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ToiletDetails;
