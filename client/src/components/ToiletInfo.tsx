import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAxios } from "../lib/customAxios";
import { IToilet } from "../lib/interfaces";
import Header from "./Header";
import ToiletSummary from "./ToiletSummary";
import ToiletDetails from "./ToiletDetails";

const ToiletInfo = () => {
  const { toiletId } = useParams();
  const [toilet, setToilet] = useState<IToilet>();

  const toiletRequest = async () => {
    const request = await customAxios.get(`/toilets/${toiletId}`);
    const { toiletInfo } = request.data;
    setToilet(toiletInfo);
  };

  useEffect(() => {
    toiletRequest();
  }, []);

  return (
    <>
      <Header toilet={toilet} />
      <ToiletSummary toilet={toilet} />
      <ToiletDetails toilet={toilet} />
    </>
  );
};

export default ToiletInfo;
