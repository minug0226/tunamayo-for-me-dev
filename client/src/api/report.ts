import { useMutation, useQuery } from "react-query";
import { customAxios } from "../lib/customAxios";

interface PostReportVariable {
  reportTitle: string;
  reportContent: string;
  reportType: string;
}

// 모든 제보, 문의 리스트 가져오기
const getAllReports = () => {
  return customAxios.get("/reports");
};

export const useAllReportsQuery = (reportType: string) =>
  useQuery(["allReports", reportType], getAllReports, {
    select: (res) => {
      const reports = res.data.reportList.filter(
        (report: any) => report.reportType === reportType
      );
      return reports.reverse();
    },
  });

// 특정 제보, 문의 상세 정보 가져오기
const getReportById = (id: string | undefined) => {
  return customAxios.get(`/reports/${id}`);
};
export const useReportQuery = (id: string | undefined) =>
  useQuery(["report", id], () => getReportById(id), {
    select: (res) => res.data.report,
  });

// 제보, 문의하기
const postReport = (reportInfo: PostReportVariable) => {
  return customAxios.post("/reports", {
    reportTitle: reportInfo.reportTitle,
    reportContent: reportInfo.reportContent,
    reportType: reportInfo.reportType,
  });
};

export const usePostReportQuery = (successFn: () => void) =>
  useMutation(postReport, {
    onSuccess: () => successFn(),
  });
