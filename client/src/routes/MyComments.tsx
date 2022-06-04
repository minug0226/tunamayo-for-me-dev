import MyComment from "../components/comment/MyComment";
import DrawerHeader from "../components/common/DrawerHeader";
import { useMyCommentsQuery } from "../api/comment";

const MyComments = () => {
  const myComments = useMyCommentsQuery();

  return (
    <>
      <DrawerHeader isAdmin={false} title="내가 쓴 리뷰" rightNone />
      {myComments?.data?.length ? null : (
        <div className="flex flex-col items-center pt-10">
          <img
            className="mb-2 w-14 h-14"
            src="/images/toilet/no-review-icon.svg"
            alt="no-reveiw-icon"
          />
          <div className="flex flex-col space-y-1 items-center font-normal text-base leadin-[26px] text-gray40">
            <div>아직 등록한 리뷰가 없어요.</div>
            <div>화장실의 리뷰를 다른 사람과 공유해 보세요!</div>
          </div>
        </div>
      )}

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
