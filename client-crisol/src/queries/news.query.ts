import { useMutation, useQueries } from "@tanstack/react-query";
import { addNews, deleteNews, getNews, updateNews } from "../repositories/news/news_repository";
import { NEWS_DATA } from "../constants";

export const useGetNewsQueries = () => {
  return useQueries({
    queries: [
      {
        queryKey: [NEWS_DATA],
        queryFn: () => getNews().then((response) => response.data),
        staleTime: 20000,
      },
    ],
  });
};

export const useCreateNewsMutation = () =>
  useMutation({
    mutationFn: addNews
  })

export const useDeleteNewsMutation = () =>
  useMutation({
    mutationFn: deleteNews,
  });

export const useStateNewsMutation = () =>
  useMutation({
    mutationFn: updateNews
  });