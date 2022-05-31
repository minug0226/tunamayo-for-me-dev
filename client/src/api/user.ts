import { useMutation, useQuery } from "react-query";
import { customAxios } from "../lib/customAxios";

interface SignUpVariable {
  nickname: string;
  email: string;
  oAuthProvider: string;
  oAuthId: string;
}

// 유저정보 가져오기
const getUserInfo = () => {
  return customAxios.get("/users");
};

export const useUserInfoQuery = () =>
  useQuery("userInfo", getUserInfo, {
    select: (res) => {
      return res.data.userInfo;
    },
  });

// 닉네임 변경하기
const changeNickname = (nickname: string) => {
  return customAxios.patch("/users", { changedNickname: nickname });
};

export const useChangeNickname = (
  successFn: (data: any) => void,
  errorFn: (data: any) => void
) =>
  useMutation(changeNickname, {
    onSuccess: (data) => {
      successFn(data);
    },
    onError: (data) => {
      errorFn(data);
    },
  });

// 회원가입
const signUp = (signUpInfo: SignUpVariable) => {
  return customAxios.post("/users/signup", {
    nickname: signUpInfo.nickname,
    email: signUpInfo.email,
    oAuthProvider: signUpInfo.oAuthProvider,
    oAuthId: signUpInfo.oAuthId,
  });
};

export const useSignUpQuery = (successFn: () => void, errorFn: () => void) =>
  useMutation(signUp, {
    onSuccess: successFn,
    onError: errorFn,
  });

// 로그아웃
const userLogout = ({}) => {
  return customAxios.post("/users/logout", {});
};

export const useLogoutQuery = () => useMutation(userLogout);

// 회원탈퇴
const signOut = () => {
  return customAxios.delete("/users");
};

export const useSignOutQuery = (successFn: () => void) =>
  useMutation(signOut, {
    onSuccess: successFn,
  });

// 쿠키에 있는 토큰 유효성 검증
const tokenValidation = () => {
  return customAxios.get("/users/token");
};

export const useTokenValidationQuery = () =>
  useQuery("token", tokenValidation, {
    select: (res) => {
      return { status: res.status, id: res.data.id };
    },
  });
