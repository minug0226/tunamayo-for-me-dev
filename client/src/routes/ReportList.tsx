import { useEffect, useState } from "react";
import DrawerHeader from "../components/DrawerHeader";
import Report from "../components/Report";
import { IReport } from "../types/report";
import { getQueryString } from "../lib/utils";
import { useAllReportsQuery } from "../api/report";

const ReportList = () => {
  const reportType = getQueryString();
  // const [reportList, setReportList] = useState<IReport[]>([]);
  const allReports = useAllReportsQuery(reportType);
  const [page, setPage] = useState(1);
  const limit = 7;
  const offset = (page - 1) * limit;
  const numPages = Math.ceil(allReports?.data?.length / limit);
  const pageGroup = Math.ceil(page / 5) - 1;

  // console.log("fad", allReports.data);

  // const reportListRequest = async () => {
  // const request = await customAxios.get("/reports");
  // const list = request.data.reportList;
  // const reports = allReports?.data?.filter(
  //   (report: IReport) => report.reportType === reportType
  // );
  // setReportList(reports);
  // };

  const indexClass = (index: number) => {
    if (index === page)
      return "cursor-pointer pt-2 pb-[9px] px-[10px] text-base font-normal leading-[26px] text-tnBlack";
    else
      return "cursor-pointer pt-2 pb-[9px] px-[10px] text-base font-normal leading-[26px] text-gray20";
  };

  const nextPageIconAction = () => {
    if (page === Math.ceil(allReports?.data?.length / 7)) return;
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

  // useEffect(() => {
  //   reportListRequest();
  // }, []);

  return (
    <>
      <DrawerHeader
        title={reportType === "report" ? "제보리스트" : "문의리스트"}
        isAdmin={true}
      />

      <div className="min-h-[600px]">
        {allReports?.data?.length &&
          allReports?.data
            ?.slice(offset, offset + limit)
            .map((report: IReport) => {
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
          {numPages &&
            Array(numPages)
              .fill(0)
              .map((_: number, i) => {
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
            page === Math.ceil(allReports?.data?.length / 7)
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
