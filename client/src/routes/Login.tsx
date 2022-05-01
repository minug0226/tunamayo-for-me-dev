import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const kakaourl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  const googleurl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  return (
    <div className="pt-[114px] px-4 flex flex-col items-center bg-tnBlueLight h-[100vh]">
      <div className="mb-6">
        <div className="font-bold text-base leading-[26px] mb-2 text-tnBlack">
          아 똥마려~
        </div>
        <img
          src="/images/common/logo.png"
          alt="logo"
          className="w-[201px] h-[241px]"
        />
      </div>

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

      <div className="py-[11px]">
        <button
          onClick={() => navigate("/")}
          className="text-tnBlack font-normal text-base leading-[26px]"
        >
          로그인 없이 둘러보기
        </button>
      </div>
    </div>
  );
};

export default Login;
