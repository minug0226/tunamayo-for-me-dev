import { customAxios } from "../lib/customAxios";
import { useEffect, useState } from "react";
import MyComment from "../components/MyComment";
import { IComment } from "../lib/interfaces";

const MyComments = () => {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    customAxios
      .get("/users/comments")
      .then((res) => setComments(res.data.myComments));
  }, []);
  return (
    <>
      <div>내가 쓴 댓글</div>
      {comments?.map((comment) => {
        return (
          <div key={comment.id}>
            <MyComment
              content={comment.content}
              createdAt={comment.createdAt}
              rating={comment.rating}
              toiletId={comment.toiletId}
            />
          </div>
        );
      })}
    </>
  );
};

export default MyComments;
