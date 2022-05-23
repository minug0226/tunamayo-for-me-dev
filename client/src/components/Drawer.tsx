import { useLocation, useNavigate } from "react-router-dom";
import { customAxios } from "../lib/customAxios";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../slices/isLoginSlice";
import { IUser } from "../lib/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";

interface DrawerProps {
  drawer: boolean;
  drawerClose: boolean;
  userInfo: IUser | null;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const Drawer = ({ drawer, drawerClose, userInfo, setModal }: DrawerProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useState(false);

  const logoutRequest = async () => {
    const request = await customAxios.post("users/logout", {});
    if (request.status === 200) {
      dispatch(logoutHandler());
      window.location.reload();
    } else window.location.reload();
  };

  const drawerClass = () => {
    if (drawerClose)
      return "animate-drawPopDown absolute top-0 left-0 z-50 w-[212px] h-full bg-white pl-4 pr-[17px] pt-[9px] pb-4 flex flex-col";
    else
      return "animate-drawPopUp absolute top-0 left-0 z-50 w-[212px] h-full bg-white pl-4 pr-[17px] pt-[9px] pb-4 flex flex-col";
  };

  return (
    <>
      {logoutModal && (
        <Modal
          title="로그아웃 하시겠습니까?"
          left="취소"
          right="로그아웃"
          setModal={setLogoutModal}
          action={logoutRequest}
        />
      )}

      {drawer ? (
        <div className={drawerClass()}>
          <div
            onClick={() => {
              userInfo
                ? navigate(`/profile?nickname=${userInfo.nickname}`)
                : navigate("/login");
            }}
            className="flex items-center justify-between mb-[55px] cursor-pointer"
          >
            <div className="flex items-center cursor-pointer">
              <div className="rounded-full mr-2 w-11 h-11 bg-[#FEFEFE] shadow-search flex items-center justify-center">
                <img src="/images/main/profile-icon.svg" alt="profile-icon" />
              </div>
              <div className="font-normal text-sm leading-[22px] text-tnBlack">
                {userInfo ? userInfo.nickname : "로그인이 필요합니다"}
              </div>
            </div>
            <img src="/images/main/right-arrow.svg" alt="right-arrow" />
          </div>

          <div className="flex-1 pl-2 font-normal text-base leading-[26px] text-tnBlack space-y-[60px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                userInfo ? navigate("/my/comments") : setModal(true);
              }}
            >
              내가 쓴 댓글
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                userInfo ? navigate("/report?type=report") : setModal(true);
              }}
            >
              화장실 제보하기
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                userInfo ? navigate("/report?type=inquiry") : setModal(true);
              }}
            >
              1:1 문의
            </div>
            <div className="cursor-pointer">버전정보</div>
            {userInfo?.isAdmin ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigate("/admin");
                }}
              >
                관리자 페이지
              </div>
            ) : null}
          </div>
          <div
            onClick={() => {
              userInfo ? setLogoutModal(true) : navigate("/login");
            }}
            className="text-gray40 text-center font-normal text-base leading-[26px] w-full cursor-pointer"
          >
            {userInfo ? "로그아웃" : "로그인"}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Drawer;
