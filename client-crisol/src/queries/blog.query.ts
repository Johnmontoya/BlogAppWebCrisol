import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import {
  addBlog,
  deleteBlog,
  generateAI,
  getBlogs,
  getBlogsId,
  getDashboard,
  getOwnBlogs,
  togglePublish,
} from "../repositories/blog/blog_repository";
import { BLOG_DATA, BLOG_DATA_ID, DASHBOARD_DATA } from "../constants";

export const useGetBlogQueries = () => {
  return useQueries({
    queries: [
      {
        queryKey: [BLOG_DATA],
        queryFn: () => getBlogs().then((response) => response.data),
        staleTime: 20000,
      },
    ],
  });
};

export const useGetBlogIdQueries = (id: string) => {
  return useQueries({
    queries: [
      {
        queryKey: [BLOG_DATA_ID],
        queryFn: () => getBlogsId(id).then((response) => response.data),
        staleTime: 20000,
      },
    ],
  });
};

export const useGetDashboardQueries = () => {
  return useQueries({
    queries: [
      {
        queryKey: [DASHBOARD_DATA],
        queryFn: () => getDashboard().then((response) => response.data),
        staleTime: 20000,
      },
    ],
  });
};

export const useGetOwnBlogQueries = (id: string) => {
  return useQuery({
    queryKey: [BLOG_DATA, id],
    queryFn: () => getOwnBlogs(id).then((response) => response.data),
    enabled: !!id,
    staleTime: 20000,
  });
};

export const useToggleBlogMutation = () =>
  useMutation({
    mutationFn: togglePublish,
  });

export const useDeleteBlogMutation = () =>
  useMutation({
    mutationFn: deleteBlog,
  });

export const useCreateBlogMutation = () =>
  useMutation({
    mutationFn: addBlog
  })

export const useGenerateAIMutation = () =>
  useMutation({
    mutationFn: generateAI
  })
