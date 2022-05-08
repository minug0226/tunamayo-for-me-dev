import { useNavigate } from "react-router-dom";
import { PropsType } from "../lib/interfaces";

const ModalPopUp = ({ toiletInfo, commentInfo }: PropsType) => {
  const navigate = useNavigate();

  return (
    <div className="sticky bottom-2 w-[95%] mx-auto h-[500px] rounded-md bg-red-400 z-10">
      <div>Toilet Name: {toiletInfo.title}</div>
      <div>Toilet Address: {toiletInfo.roadName}</div>
      <div>Comment avg: {commentInfo.avg}</div>
      <div>Comments: {commentInfo.length}</div>
      <button
        className="border"
        onClick={() => navigate(`/toilet/${toiletInfo.id}`)}
      >
        상세보기
      </button>
    </div>
  );
};

export default ModalPopUp;
