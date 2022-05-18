import { useNavigate } from "react-router-dom";

interface DrawerHeaderProps {
  title: string;
  isAdmin: boolean;
  action?: () => void;
}

const DrawerHeader = ({ title, isAdmin, action }: DrawerHeaderProps) => {
  const navigate = useNavigate();
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
          <div
            onClick={action}
            className="text-gray20 font-normal text-base leading-[26px]"
          >
            완료
          </div>
        )}
      </div>
    </>
  );
};

export default DrawerHeader;
