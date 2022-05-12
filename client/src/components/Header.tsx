const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between px-5 border-b pb-1 border-gray20 ">
        <img
          className="w-6 h-6"
          src="/images/common/back-icon.svg"
          alt="back-icon"
        />
        <div className="flex flex-col items-center">
          <div className="py-1 font-medium text-xl leading-8 text-tnBlack">
            충무로 화장실
          </div>
          <div className="py-1 text-sm text-gray80">서울 중구 퇴계로</div>
        </div>

        <div className="w-6 h-6"></div>
      </div>
    </>
  );
};

export default Header;
