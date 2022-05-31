import DrawerHeader from "../components/DrawerHeader";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customAxios } from "../lib/customAxios";
import { DispatchProp, useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../slices/isLoginSlice";
import { displayModal } from "../slices/modalSlice";
import { RootState } from "../store/store";
import { getQueryString } from "../lib/utils";
import { useChangeNickname, useSignOutQuery } from "../api/user";
import { Dispatch } from "@reduxjs/toolkit";
import { useQueryClient } from "react-query";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nickname = decodeURI(getQueryString());
  const modal = useSelector<RootState>((state) => state.modal.value);
  const [value, setValue] = useState(nickname);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [signOutState, setSignOutState] = useState<boolean>(false);
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [errState, setErrState] = useState<boolean>(true);

  useEffect(() => {
    if (
      nicknameMessage === "사용 가능한 닉네임입니다." &&
      modalTitle !== "이미 존재하는 닉네임입니다!" &&
      nickname.length >= 2
    )
      setErrState(false);
    else setErrState(true);
  }, [nicknameMessage, modalTitle, nickname]);

  const queryClient = useQueryClient();
  const signOut = useSignOutQuery(() => {
    queryClient.clear();
    navigate("/", { replace: true });
  });

  const changeNickname = useChangeNickname(
    () => {
      setModalTitle("닉네임 변경이 완료되었습니다!");
      dispatch(displayModal());
    },
    () => {
      setModalTitle("이미 존재하는 닉네임입니다!");
      dispatch(displayModal());
    }
  );

  const submitHandler = async () => {
    changeNickname.mutate(value);
    // await customAxios
    //   .patch("/users", { changedNickname: value })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setModalTitle("닉네임 변경이 완료되었습니다!");
    //       dispatch(displayModal());
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.response.status === 409) {
    //       setModalTitle("이미 존재하는 닉네임입니다!");
    //       dispatch(displayModal());
    //     }
    //   });
  };

  const onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
    const nicknameRegex = /^[가-힣]{2,8}$/;
    const currentNickname = e.currentTarget.value;
    setValue(currentNickname);
    if (!nicknameRegex.test(currentNickname)) {
      setNicknameMessage("닉네임은 공백없이 2~8자 국문으로 설정 가능합니다.");
      setIsNickname(false);
    } else {
      setNicknameMessage("사용 가능한 닉네임입니다.");
      setIsNickname(true);
    }
  };

  const nicknameInputClass = () => {
    const defaultClass =
      "w-full h-12 py-[10px] rounded-md border outline-none px-3 text-center font-noraml text-base leading-[26px] mb-2 focus:border-2 ";
    if (value === nickname) return defaultClass + "border-gray20";
    else if (isNickname && value.length) return defaultClass + "border-tnBlue";
    else if (!isNickname && value.length) return defaultClass + "border-tnRed";
    else return defaultClass + "border-gray20";
  };

  const secessionRequest = async () => {
    signOut.mutate();
    // await customAxios
    //   .delete("/users")
    //   .then((res) => {
    //     if (res.status === 200) {
    //       dispatch(logoutHandler());
    //       navigate("/");
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="relative">
      <>
        <DrawerHeader
          title="프로필수정"
          isAdmin={false}
          errState={errState}
          action={submitHandler}
        />
        <div className="flex flex-col items-center pt-8 px-[34px]">
          <div className="w-11 h-11 rounded-full shadow-search flex justify-center items-center mb-5">
            <img src="/images/main/profile-icon.svg" alt="profile-icon" />
          </div>

          <div className="w-full relative">
            <input
              onChange={onChangeValue}
              value={value}
              className={nicknameInputClass()}
              type="text"
            />
            {value.length > 0 ? (
              <img
                onClick={() => {
                  setValue("");
                }}
                className="cursor-pointer absolute right-3 top-3.5 z-10"
                src="/images/common/delete.svg"
                alt="clear-button"
              />
            ) : null}
          </div>

          {value === nickname || !value.length ? (
            <div className="font-normal text-sm leading-[22px] text-gray40 mb-[434px]">
              닉네임을 수정해 주세요
            </div>
          ) : value.length ? (
            <span
              className={
                isNickname
                  ? "font-normal text-sm leading-[22px] text-tnBlue mb-[434px]"
                  : "font-normal text-sm leading-[22px] text-tnRed mb-[434px]"
              }
            >
              {nicknameMessage}
            </span>
          ) : null}
        </div>
        <div
          onClick={() => {
            setModalTitle("정말 탈퇴하시겠습니까?😢");
            setSignOutState(true);
          }}
          className="font-normal text-base text-gray40 text-center leading-[26px]"
        >
          회원탈퇴
        </div>
        {modal && <Modal title={modalTitle} oneButton="확인" />}
        {signOutState && (
          <Modal
            setSignout={setSignOutState}
            title={modalTitle}
            left="취소"
            right="탈퇴하기"
            action={secessionRequest}
          />
        )}
      </>
    </div>
  );
};

export default EditProfile;
