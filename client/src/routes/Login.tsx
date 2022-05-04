import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const kakaourl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  const googleurl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  return (
    <div className="pt-[70px] flex relative flex-col overflow-y-scroll bg-tnBlueLight h-[100vh]">
      <div className="py-[10px] px-8 mb-[354px] z-10">
        <div className="font-maple font-bold leading-[70px] text-tnBlack">
          <div className="text-[44px]">화장실 급할땐</div>
          <div className="text-[55px]">참지마요!</div>
        </div>
      </div>
      <img
        src="/images/login/logo.png"
        alt="logo"
        className="max-w-[90%] absolute right-0 top-[180px] z-0"
      />
      <div className="px-4 z-10">
        <a
          href={kakaourl}
          className="w-full bg-[#FFE812] rounded-lg flex itmes-center justify-center mb-4 cursor-pointer"
        >
          <img
            className="mr-2 py-3"
            src="/images/login/kakao-login.svg"
            alt="kakao icon"
          />
          <div className="py-[11px] font-normal text-base leading-[26px] text-tnBlack">
            카카오로 로그인
          </div>
        </a>

        <a
          href={googleurl}
          className="w-full bg-white rounded-lg flex itmes-center justify-center"
        >
          <img
            className="mr-2 py-3"
            src="/images/login/google-login.svg"
            alt="google icon"
          />
          <div className="py-[11px] font-normal text-base leading-[26px] text-tnBlack mb-">
            구글로 로그인
          </div>
        </a>

        <div className="py-[11px] flex justify-center z-10">
          <button
            onClick={() => navigate("/")}
            className="text-tnBlack font-normal text-base leading-[26px]"
          >
            로그인 없이 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
