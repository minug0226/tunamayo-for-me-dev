import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [signupErrorMessage, setSignupErrorMessage] = useState<string>("");
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const queryString: string = location.search;
  const oAuthProvider: string = queryString.split("&")[0].split("=")[1];
  const oAtuhId: string = queryString.split("&")[1].split("=")[1];
  const email: string = queryString.split("&")[2].split("=")[1];

  const onChangeNickname = (e: React.FormEvent<HTMLInputElement>) => {
    const nicknameRegex = /^[가-힣]{2,8}$/;
    const currentNickname = e.currentTarget.value;
    setNickname(currentNickname);

    if (!nicknameRegex.test(currentNickname)) {
      setNicknameMessage("닉네임은 공백없이 2~8자 국문으로 설정 가능합니다.");
      setIsNickname(false);
    } else {
      setNicknameMessage("사용가능한 닉네임을 입력하셨습니다");
      setIsNickname(true);
    }
  };

  const nicknameInputClass = () => {
    // 유효성 검사 통과 && 닉네임 입력한 경우
    if (isNickname && nickname.length)
      return "pl-4 box-border border-2 border-tnBlue rounded-lg text-base font-normal w-full h-12 focus:outline-none focus:border-tnBlue";
    else if (!isNickname && nickname.length)
      return "pl-4 box-border border-2 border-tnRed rounded-lg text-base font-normal w-full h-12 focus:outline-none focus: border-2";
    else if (!isNickname && !nickname.length)
      return "pl-4 box-border border-2 border-[#D3D3D3] rounded-lg text-base font-normal w-full h-12 focus:outline-none focus:border-tnBlue";
    else
      return "pl-4 box-border border-2 border-[#D3D3D3] rounded-lg text-base font-normal w-full h-12 focus:outline-none focus:border-tnBlue";
  };

  const signUpRequest = () => {
    axios
      .post("http://localhost:8080/users/signup", {
        nickname,
        email,
        oAuthProvider,
        oAtuhId,
      })
      .then((res) => {
        if (res.status === 201) navigate("/", { replace: true });
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setSignupErrorMessage("이미 사용 중인 닉네임입니다.");
        }
      });
  };

  return (
    <>
      <div className="pt-[128px] flex flex-col">
        <div className="pl-8 pb-8 font-normal font-sans not-italic text-2xl text-[#222222] leading-[38px]">
          닉네임 입력하고
          <br />
          1초만에 화장실 찾기
        </div>
        <form className="mx-4 relative mb-[129px]">
          <input
            value={nickname}
            onChange={onChangeNickname}
            className={nicknameInputClass()}
            placeholder="닉네임을 입력하세요."
          />
          {nickname.length > 0 ? (
            <img
              onClick={() => {
                setNickname("");
                setSignupErrorMessage("");
              }}
              className="cursor-pointer absolute right-3 top-3.5 z-10"
              src="/images/delete.svg"
              alt=""
            />
          ) : null}
          {signupErrorMessage ===
          "이미 사용 중인 닉네임입니다." ? null : nickname.length ? (
            <span
              className={
                isNickname
                  ? "pl-2 text-base font-normal text-tnBlue"
                  : "pl-2 text-base font-normal text-tnRed"
              }
            >
              {nicknameMessage}
            </span>
          ) : null}
          {signupErrorMessage === "이미 사용 중인 닉네임입니다." ? (
            <div className="pt-1 pl-2 text-base font-normal text-tnRed">
              {signupErrorMessage}
            </div>
          ) : null}
        </form>
        <div className="px-4">
          <button
            className="text-[#222222] text-base leading-[26px] bg-tnBlue rounded-lg font-bold h-12 py-[11px] w-full"
            onClick={signUpRequest}
          >
            시작하기
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
