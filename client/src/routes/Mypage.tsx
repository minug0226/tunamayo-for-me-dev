import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../lib/customAxios";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../slices/isLoginSlice";

interface IUser {
  nickname: string;
  email: string;
  isAdmin: boolean;
}
const Mypage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<IUser>();

  useEffect(() => {
    customAxios.get("/users").then((res) => setUserInfo(res.data.userInfo));
  }, []);

  const logoutRequest = async () => {
    const request = await customAxios.post("users/logout", {});
    if (request.status === 200) {
      dispatch(logoutHandler());
      navigate("/", { replace: true });
    } else navigate("/", { replace: true });
  };

  return (
    <div>
      <div>mypage</div>
      <div>닉네임 : {userInfo?.nickname}</div>
      <div>이메일 : {userInfo?.email}</div>
      <button
        onClick={() => navigate("/my/comments")}
        className="border bg-tnBlue"
      >
        내가 쓴 댓글 확인
      </button>
      <button className="border bg-tnBlue">단골 화장실</button>
      <button
        onClick={() => navigate("/report?type=report")}
        className="border bg-tnBlue"
      >
        화장실 제보
      </button>
      <button
        onClick={() => navigate("/report?type=inquiry")}
        className="border bg-tnBlue"
      >
        1:1 문의
      </button>
      <button className="border bg-tnBlue">내가 쓴 댓글 확인</button>

      <div onClick={logoutRequest} className="w-full bg-tnBlue cursor-pointer">
        로그아웃
      </div>
    </div>
  );
};

export default Mypage;
