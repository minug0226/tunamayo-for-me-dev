import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>관리자 페이지</div>
      <div
        className="cursor-pointer"
        onClick={() => navigate("/admin/reports?type=report")}
      >
        제보 리스트
      </div>
      <div
        className="cursor-pointer"
        onClick={() => navigate("/admin/reports?type=inquiry")}
      >
        문의 리스트
      </div>
    </>
  );
};

export default Admin;
