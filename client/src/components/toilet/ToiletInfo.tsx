import Header from "./Header";
import ToiletSummary from "./ToiletSummary";
import ToiletDetails from "./ToiletDetails";
import { useParams } from "react-router-dom";
import { useToiletQuery } from "../../api/toilet";

const ToiletInfo = () => {
  const { toiletId } = useParams();
  const toiletInfo = useToiletQuery(Number(toiletId));

  return (
    <>
      <Header toilet={toiletInfo.data} />
      <ToiletSummary toilet={toiletInfo.data} />
      <ToiletDetails toilet={toiletInfo.data} />
    </>
  );
};

export default ToiletInfo;
