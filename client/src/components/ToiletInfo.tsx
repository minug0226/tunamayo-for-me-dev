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
      <Header />
      <ToiletSummary />
      <ToiletDetails />
      {/* <div>화장실 명 : {toilet?.toiletName || "-"}</div>
      <div>화장실 주소 : {toilet?.roadName || "-"}</div>
      <div>개방시간: {toilet?.openTime || "-"}</div>
      <div>남녀공용 : {toilet?.isUnisex || "-"}</div>
      <div>관리기관명 : {toilet?.agency || "-"}</div>
      <div>전화번호 : {toilet?.agencyNumber || "-"}</div>
      <div>비상벨 여부 : {toilet?.hasAlarm || "-"}</div>
      <div>CCTV 설치여부 : {toilet?.hasCctv || "-"}</div>
      <div>기저귀 교환대 유무 : {toilet?.hasDiaperTable || "-"}</div>
      <div>남성용 대변기 수 : {toilet?.maleClosetCount}</div>
      <div>남성용 소변기 수 : {toilet?.urinalCount}</div>
      <div>남성 장애인용 대변기 수 : {toilet?.handiMaleClosetCount}</div>
      <div>남성 장애인용 소변기 수 : {toilet?.handiUrinalCount}</div>
      <div>남성 어린이용 대변기 수 : {toilet?.boyClosetCount}</div>
      <div>남성 어린이용 소변기 수 : {toilet?.boyUrinalCount}</div>
      <div>여성용 대변기 수 : {toilet?.femaleClosetCount}</div>
      <div>여성 장애인용 대변기 수 : {toilet?.handiFemaleClosetCount}</div>
      <div>여성 어린이용 대변기 수 : {toilet?.girlClosetCount}</div> */}
    </>
  );
};

export default ToiletInfo;
