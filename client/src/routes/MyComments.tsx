import { customAxios } from "../lib/customAxios";
import { useEffect, useState } from "react";
import MyComment from "../components/MyComment";
import { IComment } from "../types/comment";
import DrawerHeader from "../components/DrawerHeader";
import { useMyCommentsQuery } from "../api/comment";

const MyComments = () => {
  const myComments = useMyCommentsQuery();

  // const [comments, setComments] = useState<IComment[]>([]);

  // useEffect(() => {
  //   customAxios
  //     .get("/users/comments")
  //     .then((res) => setComments(res.data.myComments));
  // }, []);

  return (
    <>
      <DrawerHeader isAdmin={false} title="내가 쓴 리뷰" rightNone />
      {myComments?.data?.map((comment: any) => {
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
