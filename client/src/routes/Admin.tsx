import DrawerHeader from "../components/common/DrawerHeader";
import Loading from "../components/common/Loading";
import Modal from "../components/common/Modal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { displayModal } from "../slices/modalSlice";
import { useUserInfoQuery } from "../api/user";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modal = useSelector<RootState>((state) => state.modal.value);
  const userInfo = useUserInfoQuery();

  useEffect(() => {
    if (userInfo.isError) dispatch(displayModal());
  }, [userInfo]);

  return (
    <>
      {userInfo.isLoading ? (
        <Loading content="관리자 확인중.." />
      ) : (
        <div className="relative">
          <>
            <DrawerHeader title="관리자 페이지" isAdmin={true} />
            {modal ? null : (
              <>
                <div
                  onClick={() => navigate("/admin/reports?type=report")}
                  className="cursor-pointer py-9 text-center border-b border-gray20 text-base font-normal leading-[26px] text-tnBlack"
                >
                  제보 리스트
                </div>
                <div
                  onClick={() => navigate("/admin/reports?type=inquiry")}
                  className="cursor-pointer py-9 text-center border-b border-gray20 text-base font-normal leading-[26px] text-tnBlack"
                >
                  문의 리스트
                </div>
              </>
            )}
          </>
        </div>
      )}

      {modal && (
        <Modal
          title="관리자만 접근이 가능합니다."
          action={() => navigate("/", { replace: true })}
          oneButton="확인"
        />
      )}
    </>
  );
};

export default Admin;
