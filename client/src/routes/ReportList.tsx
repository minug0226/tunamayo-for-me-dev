import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DrawerHeader from "../components/DrawerHeader";
import Report from "../components/Report";
import { customAxios } from "../lib/customAxios";

interface IReport {
  id: number;
  reportTitle: string;
  reportContent: string;
  reportType: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface User {
  createdAt: string;
  email: string;
  nickname: string;
  oAuthProvider: string;
  oAuthProviderId: string;
  updatedAt: string;
}

const ReportList = () => {
  const location = useLocation();
  const queryString: string = location.search;
  const reportType: string = queryString.split("=")[1];
  const [reportList, setReportList] = useState<IReport[]>([]);
  const [page, setPage] = useState(1);
  const limit = 7;
  const offset = (page - 1) * limit;
  const numPages = Math.ceil(reportList.length / limit);
  const pageGroup = Math.ceil(page / 5) - 1;

  const reportListRequest = async () => {
    const request = await customAxios.get("/reports");
    const list = request.data.reportList;
    const reports = list.filter(
      (report: IReport) => report.reportType === reportType
    );
    setReportList(reports);
  };

  const indexClass = (index: number) => {
    if (index === page)
      return "cursor-pointer pt-2 pb-[9px] px-[10px] text-base font-normal leading-[26px] text-tnBlack";
    else
      return "cursor-pointer pt-2 pb-[9px] px-[10px] text-base font-normal leading-[26px] text-gray20";
  };

  const nextPageIconAction = () => {
    if (page === Math.ceil(reportList.length / 7)) return;
    else {
      setPage(page + 1);
    }
  };

  const prevPageIconAction = () => {
    if (page === 1) return;
    else {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    reportListRequest();
  }, []);

  return (
    <>
      <DrawerHeader
        title={reportType === "report" ? "제보리스트" : "문의리스트"}
        isAdmin={true}
      />

      <div className="min-h-[600px]">
        {reportList.slice(offset, offset + limit).map((report: IReport) => {
          return <Report key={report.id} report={report} />;
        })}
      </div>
      <div className="px-20 py-[17px] flex justify-center items-center h-full">
        <img
          className="w-6 h-6 cursor-pointer"
          onClick={prevPageIconAction}
          src={
            page === 1
              ? "/images/report/prev-icon-gray.svg"
              : "/images/report/prev-icon-black.svg"
          }
          alt="prev"
        />
        <div className="flex">
          {Array(numPages)
            .fill(0)
            .map((_, i) => {
              if (i >= pageGroup * 5 && i <= pageGroup * 5 + 4) {
                return (
                  <div
                    key={i + 1}
                    className={indexClass(i + 1)}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </div>
                );
              }
            })}
        </div>
        <img
          className="w-6 h-6 cursor-pointer"
          onClick={nextPageIconAction}
          src={
            page === Math.ceil(reportList.length / 7)
              ? "/images/report/next-icon-gray.svg"
              : "/images/report/next-icon-black.svg"
          }
          alt="next"
        />
      </div>
    </>
  );
};

export default ReportList;
