import { MyCommentProps } from "../lib/interfaces";
import { customAxios } from "../lib/customAxios";
import { useState, useEffect } from "react";
import { IToilet } from "../lib/interfaces";

const MyComment = ({
  content,
  createdAt,
  rating,
  toiletId,
}: MyCommentProps) => {
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
    <div className="mb-5">
      <div>내용: {content}</div>
      <div>작성일자: {createdAt}</div>
      <div>평점: {rating}</div>
      <div>화장실 명: {toilet?.toiletName}</div>
    </div>
  );
};

export default MyComment;
