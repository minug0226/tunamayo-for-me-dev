import DrawerHeader from "../components/common/DrawerHeader";
import { useNavigate } from "react-router-dom";

const Policy = () => {
  const navigate = useNavigate();

  return (
    <div>
      <DrawerHeader title="버전정보 v1.0.0" isAdmin={false} rightNone />
      <div
        onClick={() => navigate("/policy/privacy")}
        className="cursor-pointer flex items-center pl-[30px] pr-5 justify-between py-6 border-b border-[#E9E9E9]"
      >
        <div className="text-black text-base font-normal leading-[26px]">
          개인정보 처리방침
        </div>
        <img src="/images/policy/right-arrow-icon.svg" alt="right-arrow" />
      </div>

      <div
        onClick={() => navigate("/policy/service")}
        className="cursor-pointer flex items-center pl-[30px] pr-5 justify-between py-6 border-b border-[#E9E9E9]"
      >
        <div className="text-black text-base font-normal leading-[26px]">
          서비스 이용약관
        </div>
        <img src="/images/policy/right-arrow-icon.svg" alt="right-arrow" />
      </div>
    </div>
  );
};

export default Policy;
