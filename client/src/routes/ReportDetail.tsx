import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReportQuery } from "../api/report";
import DrawerHeader from "../components/DrawerHeader";
import { customAxios } from "../lib/customAxios";
import { Report } from "../types/report";

const ReportDetail = () => {
  const params = useParams();
  const { id } = params;
  const report = useReportQuery(id);
  // const [report, setReport] = useState<null | Report>(null);

  // useEffect(() => {
  //   customAxios.get(`/reports/${id}`).then((res) => setReport(res.data.report));
  // }, [id]);

  return (
    <>
      <DrawerHeader
        title={
          report?.data?.reportType === "report" ? "제보 내용" : "문의 내용"
        }
        isAdmin={true}
      />
      <div>
        <div className="py-4 px-5 border-b border-[#F6F6F6] text-tnBlack">
          {report?.data?.reportTitle}
        </div>
        <div className="flex justify-between px-5 py-4 font-normal text-sm leading-[22px] text-gray40">
          <div>{report?.data?.user.nickname}</div>
          <div>{report?.data?.createdAt.slice(0, 10)}</div>
        </div>
        <div className="h-full px-5 text-base font-normal leading-[26px] text-gray60">
          {report?.data?.reportContent}
        </div>
      </div>
    </>
  );
};

export default ReportDetail;
