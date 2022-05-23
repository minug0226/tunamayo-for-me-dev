import { useNavigate } from "react-router-dom";

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

interface ReportProps {
  report: IReport;
}

const Report = ({ report }: ReportProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/admin/reports/${report.id}`)}
        className="cursor-pointer py-4 px-5 flex items-center justify-between border-b border-gray20"
      >
        <div>
          <div className="text-tnBlack text-base font-normal leading-[26px]">
            {report.reportTitle}
          </div>
          <div className="text-gray40 font-normal text-sm leading-[22px]">
            {report.user.nickname}
          </div>
        </div>
        <div className="text-gray40 font-normal text-sm leading-[22px]">
          {report.createdAt.slice(0, 10)}
        </div>
      </div>
    </>
  );
};

export default Report;
