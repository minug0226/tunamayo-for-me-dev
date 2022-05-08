import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { customAxios } from "../lib/customAxios";

const WriteReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryString: string = location.search;
  const reportType: string = queryString.split("=")[1];

  const [reportTitle, setReportTitle] = useState("");
  const [reportContent, setReportContent] = useState("");

  const postReport = async (e: React.FormEvent) => {
    e.preventDefault();
    await customAxios.post("/reports", {
      reportTitle,
      reportContent,
      reportType,
    });
    navigate("/my", { replace: true });
  };

  return (
    <>
      <div>제보하기</div>
      <form>
        <div>제목</div>
        <input
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
          className="border w-full border-black"
          type="text"
        />
        <div>내용</div>
        <textarea
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
          className="border w-full border-black"
        />
        <button
          onClick={() => {
            navigate("/my", { replace: true });
          }}
          className="bg-tnBlue mr-2"
        >
          취소
        </button>
        <button
          type="submit"
          onClick={(e) => postReport(e)}
          className="bg-tnBlue"
        >
          제보하기
        </button>
      </form>
    </>
  );
};

export default WriteReport;
