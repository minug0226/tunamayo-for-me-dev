import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { customAxios } from "../lib/customAxios";
import DrawerHeader from "../components/DrawerHeader";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { displayModal } from "../slices/modalSlice";
import { getQueryString } from "../lib/utils";
import { usePostReportQuery } from "../api/report";

const WriteReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reportType = getQueryString();
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const modal = useSelector<RootState>((state) => state.modal.value);
  const [reportTitle, setReportTitle] = useState("");
  const [reportContent, setReportContent] = useState("");
  // const [loading, setLoading] = useState(false);

  const postReport = usePostReportQuery(() => dispatch(displayModal()));

  const submitHandler = async () => {
    postReport.mutate({ reportTitle, reportContent, reportType });
    // setLoading(true);
    // await customAxios
    //   .post("/reports", {
    //     reportTitle,
    //     reportContent,
    //     reportType,
    //   })
    //   .then((res) => {
    //     if (res.status === 201) {
    //       setLoading(false);
    //       dispatch(displayModal());
    //     }
    //   });
  };

  return (
    <>
      {postReport.isLoading ? (
        <Loading
          content={reportType === "report" ? "화장실 제보하기" : "1:1 문의하기"}
        />
      ) : null}
      <DrawerHeader
        title={reportType === "report" ? "화장실 제보하기" : "1:1 문의하기"}
        isAdmin={false}
        action={submitHandler}
        reportTitle={reportTitle}
        reportContent={reportContent}
      />
      <div className="relative">
        <input
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
          placeholder="글 제목"
          className="w-full px-5 py-4 border-b border-[#F6F6F6] outline-none text-tnBlack"
          type="text"
        />
        <textarea
          autoComplete="off"
          ref={ref}
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
          className="min-h-[500px] w-full px-5 pt-4 outline-none no-scrollbar resize-none text-tnBlack"
        />
        {reportContent.length ? null : (
          <div
            onClick={() => ref.current?.focus()}
            className="absolute text-gray20 text-base font-normal leading-[26px] top-[72px] left-5"
          >
            {reportType === "report" ? (
              <div>
                <div>제보할 화장실 정보를 작성해 주세요.</div>
                <div>ex) 화장실 위치, 남녀공용 여부 등</div>
              </div>
            ) : (
              <div>불편한 사항이 있으면 자유롭게 문의해 주세요.</div>
            )}
          </div>
        )}
      </div>
      {modal && (
        <Modal
          title={
            reportType === "report"
              ? "제보 접수가 완료되었습니다!"
              : "문의 접수가 완료되었습니다!"
          }
          oneButton="확인"
          action={() => navigate("/", { replace: true })}
        />
      )}
    </>
  );
};

export default WriteReport;
