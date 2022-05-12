const ToiletSummary = () => {
  return (
    <>
      <div className="py-5 pl-5 border-b border-gray20">
        <div className="flex mb-3 font-normal text-tnBlack leading-[26px] text-base">
          <div className="mr-6">개방시간</div>
          <div>연중무휴</div>
        </div>
        <div className="flex mb-3 font-normal text-tnBlack leading-[26px] text-base">
          <div className="mr-6">관리기관</div>
          <div>서울메트로</div>
        </div>
        <div className="flex font-normal leading-[26px] text-base">
          <div className="mr-6 text-tnBlack">전화번호</div>
          <div className="text-tnDeepBlue">02-012-3456</div>
        </div>
      </div>
    </>
  );
};

export default ToiletSummary;
