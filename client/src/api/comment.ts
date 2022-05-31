import { useMutation, useQuery } from "react-query";
import { customAxios } from "../lib/customAxios";

interface DeleteCommentVariable {
  toiletId: number;
  commentId: number;
}

interface PatchCommentVariable {
  toiletId: number;
  commentId: number;
  content: string;
  rating: number;
}

interface PostCommentVariable {
  toiletId: number;
  content: string;
  rating: number;
}

// 화장실(:id)의 모든 댓글 리스트 가져오기
const getAllComments = (toiletId: number | undefined) => {
  return customAxios.get(`/toilets/${toiletId}/comments`);
};

export const useAllCommentsQuery = (toiletId: number | undefined) =>
  useQuery(["allComments", toiletId], () => getAllComments(toiletId), {
    select: (res) => {
      return res.data.commentList;
    },
  });

// 내가 작성한 댓글 리스트 가져오기
const getMyComments = () => {
  return customAxios.get("/users/comments");
};

export const useMyCommentsQuery = () =>
  useQuery("myComments", getMyComments, {
    select: (res) => res.data.myComments,
  });

// 댓글 수정시 원본 댓글 가져오기
const getOriginComment = (toiletId: number, commentId: number) => {
  return customAxios.get(
    `/toilets/${toiletId}/comments?commentId=${commentId}`
  );
};

export const useCommentQuery = (
  toiletId: number,
  commentId: number,
  successCallback: (data: any) => void
) =>
  useQuery(
    ["myComment", commentId],
    () => getOriginComment(toiletId, commentId),
    {
      select: (res) => res.data.comment,
      onSuccess: (data) => successCallback(data),
    }
  );

// 댓글 수정
const patchComment = (commentInfo: PatchCommentVariable) => {
  return customAxios.patch(
    `/toilets/${commentInfo.toiletId}/comments/${commentInfo.commentId}`,
    {
      content: commentInfo.content,
      rating: commentInfo.rating,
    }
  );
};

export const usePatchCommentQuery = () => useMutation(patchComment);

// 새 댓글 작성
const postComment = (commentInfo: PostCommentVariable) => {
  return customAxios.post(`/toilets/${commentInfo.toiletId}/comments`, {
    content: commentInfo.content,
    rating: commentInfo.rating,
  });
};

export const usePostCommentQuery = () => useMutation(postComment);

// 댓글 삭제
const deleteComment = (commentInfo: DeleteCommentVariable) => {
  return customAxios.delete(
    `/toilets/${commentInfo.toiletId}/comments/${commentInfo.commentId}`
  );
};

export const useDeleteComment = () => useMutation(deleteComment);

// 지도의 마커 클릭시 팝업되는 모달에 담길 댓글정보(댓글별점평균, 댓글수) 가져오기
export const useToiletModalInfoQuery = (
  toiletId: number,
  successCallback: (data: any) => void
) =>
  useQuery(["modalInfo", toiletId], () => getAllComments(toiletId), {
    select: (res: any) => {
      const commentList = res.data.commentList;
      const length = commentList?.length;
      const ratingList = commentList?.map((comment: any) => comment.rating);
      const sum = ratingList?.reduce((prev: number, curr: number) => {
        return prev + curr;
      }, 0);
      const avg = Math.round((sum / length) * 10) / 10;
      return { length, sum, avg };
    },
    onSuccess: (data) => successCallback(data),
  });
