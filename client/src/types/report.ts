import { User } from "./user";

export interface IReport {
  id: number;
  reportTitle: string;
  reportContent: string;
  reportType: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Report {
  id: number;
  reportContent: string;
  reportTitle: string;
  reportType: string;
  updatedAt: string;
  createdAt: string;
  user: User;
}

export interface ReportProps {
  report: IReport;
}
