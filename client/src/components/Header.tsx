import { useNavigate } from "react-router-dom";
import { IToilet } from "../lib/interfaces";

interface HeaderProps {
  toilet?: IToilet;
}

const Header = ({ toilet }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between px-5 border-b pb-1 border-gray20 ">
        <img
          className="w-6 h-6 cursor-pointer"
          src="/images/common/back-icon.svg"
          alt="back-icon"
          onClick={() => navigate(-1)}
        />
        <div className="flex flex-col items-center">
          <div className="py-1 font-medium text-xl leading-8 text-tnBlack break-words text-center">
            {toilet?.toiletName.includes("(") ? (
              <div>
                <div>{toilet?.toiletName.split("(")[0]}</div>
                <div>({toilet?.toiletName.split("(")[1]}</div>
              </div>
            ) : (
              <div> {toilet?.toiletName}</div>
            )}
          </div>
          <div className="py-1 text-sm text-gray80">{toilet?.roadName}</div>
        </div>

        <div className="w-6 h-6"></div>
      </div>
    </>
  );
};

export default Header;
