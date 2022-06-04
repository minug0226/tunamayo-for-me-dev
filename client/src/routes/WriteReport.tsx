import DrawerHeader from "../components/common/DrawerHeader";
import Modal from "../components/common/Modal";
import Loading from "../components/common/Loading";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { displayModal } from "../slices/modalSlice";
import { usePostReportQuery } from "../api/report";
import { getQueryString } from "../lib/utils";

const WriteReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reportType = getQueryString();
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const [reportTitle, setReportTitle] = useState<string>("");
  const [reportContent, setReportContent] = useState<string>("");
  const modal = useSelector<RootState>((state) => state.modal.value);

  const postReport = usePostReportQuery(() => dispatch(displayModal()));
  const submitHandler = async () => {
    postReport.mutate({ reportTitle, reportContent, reportType });
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
