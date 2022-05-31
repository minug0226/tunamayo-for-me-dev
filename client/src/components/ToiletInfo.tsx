import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAxios } from "../lib/customAxios";
import { IToilet } from "../types/toilet";
import Header from "./Header";
import ToiletSummary from "./ToiletSummary";
import ToiletDetails from "./ToiletDetails";
import { useToiletQuery } from "../api/toilet";

const ToiletInfo = () => {
  const { toiletId } = useParams();
  const toiletInfo = useToiletQuery(Number(toiletId));

  // const [toilet, setToilet] = useState<IToilet>();
  // const toiletRequest = async () => {
  //   const request = await customAxios.get(`/toilets/${toiletId}`);
  //   const { toiletInfo } = request.data;
  //   setToilet(toiletInfo);
  // };

  // useEffect(() => {
  //   toiletRequest();
  // }, []);

  return (
    <>
      <Header toilet={toiletInfo.data} />
      <ToiletSummary toilet={toiletInfo.data} />
      <ToiletDetails toilet={toiletInfo.data} />
    </>
  );
};

export default ToiletInfo;
