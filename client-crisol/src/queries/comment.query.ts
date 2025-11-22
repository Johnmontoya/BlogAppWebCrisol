import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { COMMENT_DATA } from "../constants";
import { addComment, approveComment, deleteComment, getCommentBlog, getCommentsUser } from "../repositories/comment/comment_repository";

export const useGetCommentUserIdQueries = (userId: string) => {
  return useQueries({
    queries: [
      {
        queryKey: [COMMENT_DATA],
        queryFn: () => getCommentsUser(userId).then((response) => response.data),
        staleTime: 20000,
      },
    ],
  });
};

export const useGetCommentBlogQueries = (id: string) => {  
  return useQuery({
    queryKey: [COMMENT_DATA, id],
    queryFn: () => getCommentBlog(id).then((response) => response.data),
    enabled: !!id,
    staleTime: 20000,
  });
};

export const useCreateCommentMutation = () =>
  useMutation({
    mutationFn: addComment
  })

export const useStateCommentMutation = () =>
  useMutation({
    mutationFn: approveComment,
  });

export const useDeleteCommentMutation = () =>
  useMutation({
    mutationFn: deleteComment,
  });