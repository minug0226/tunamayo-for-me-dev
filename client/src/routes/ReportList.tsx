import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { customAxios } from "../lib/customAxios";

interface Report {
  id: number;
  reportTitle: string;
  reportContent: string;
  reportType: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const ReportList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryString: string = location.search;
  const reportType: string = queryString.split("=")[1];
  const [reportList, setReportList] = useState<Report[]>([]);

  const reportListRequest = async () => {
    const request = await customAxios.get("/reports");
    const list = request.data.reportList;
    const reports = list.filter(
      (report: Report) => report.reportType === reportType
    );
    setReportList(reports);
  };

  console.log(reportList);

  useEffect(() => {
    reportListRequest();
  }, []);

  return (
    <div>
      <div className="bg-tnBlue cursor-pointer" onClick={() => navigate(-1)}>
        뒤로가기
      </div>
      <div>{reportType === "report" ? "제보리스트" : "문의리스트"}</div>
      {reportList.map((report: Report) => {
        return (
          <div key={report.id} className="mb-4 py-4 border-b-2">
            <div>제목 : {report.reportTitle}</div>
            <div>내용 : {report.reportContent}</div>
            <div>작성일자 : {report.createdAt}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportList;
