import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawerHeader from "../components/DrawerHeader";
import Modal from "../components/Modal";
import { customAxios } from "../lib/customAxios";

const Admin = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(true);

  useEffect(() => {
    customAxios.get("/users").then((res) => {
      if (res.data.userInfo.isAdmin) {
        setModal(false);
      }
    });
  }, []);

  return (
    <>
      <div className="relative">
        <DrawerHeader title="관리자 페이지" isAdmin={true} />
        {modal && (
          <Modal
            title="관리자만 접근이 가능합니다."
            setModal={setModal}
            action={() => navigate("/", { replace: true })}
            oneButton="확인"
          />
        )}

        {modal ? null : (
          <>
            <div
              onClick={() => navigate("/admin/reports?type=report")}
              className="py-9 text-center border-b border-gray20 text-base font-normal leading-[26px] text-tnBlack"
            >
              제보 리스트
            </div>
            <div
              onClick={() => navigate("/admin/reports?type=inquiry")}
              className="py-9 text-center border-b border-gray20 text-base font-normal leading-[26px] text-tnBlack"
            >
              문의 리스트
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Admin;
