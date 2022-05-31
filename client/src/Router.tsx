import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Main from "./routes/Main";
import Toilet from "./routes/Toilet";
import WriteComment from "./routes/WriteComment";
import Token from "./components/Token";
import MyComments from "./routes/MyComments";
import WriteReport from "./routes/WriteReport";
import Admin from "./routes/Admin";
import ReportList from "./routes/ReportList";
import EditProfile from "./routes/EditProfile";
import ReportDetail from "./routes/ReportDetail";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Token />
        <Routes>
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="toilet/:toiletId" element={<Toilet />} />
          <Route path="toilet/:toiletId/comment" element={<WriteComment />} />
          <Route path="my/comments" element={<MyComments />} />
          <Route path="report" element={<WriteReport />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/reports" element={<ReportList />} />
          <Route path="admin/reports/:id" element={<ReportDetail />} />
          <Route path="profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
