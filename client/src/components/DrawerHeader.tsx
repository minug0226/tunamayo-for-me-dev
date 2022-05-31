import { useNavigate } from "react-router-dom";
import { DrawerHeaderProps } from "../types/common";

const DrawerHeader = ({
  title,
  isAdmin,
  reportTitle,
  reportContent,
  content,
  rightNone,
  errState,
  action,
}: DrawerHeaderProps) => {
  const navigate = useNavigate();

  const isDisabled = () => {
    if (title === "화장실 제보하기" || title === "1:1 문의하기") {
      if (!reportTitle?.length || !reportContent?.length) return true;
      else return false;
    } else if (title === "리뷰") {
      if (!content?.length) return true;
      else return false;
    } else if (title === "프로필수정") {
      if (errState) return true;
      else return false;
    }
  };

  return (
    <>
      <div className="flex py-[15px] px-5 items-center justify-between border-b border-gray20">
        <img
          className="w-6 h-6 cursor-pointer"
          src="/images/common/back-icon.svg"
          alt="back-icon"
          onClick={() => navigate(-1)}
        />
        <div className="font-medium text-xl leading-8">{title}</div>
        {isAdmin ? (
          <div className="text-transparent">완료</div>
        ) : (
          <button
            onClick={action}
            disabled={isDisabled()}
            className={
              rightNone
                ? "text-transparent"
                : "disabled:text-gray20 disabled:font-normal text-base leading-[26px] text-tnBlue"
            }
          >
            완료
          </button>
        )}
      </div>
    </>
  );
};

export default DrawerHeader;
