"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useExpenseById(id) {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["expense", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/expenses/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  return {
    expense: data || null,
    isLoading,
    error: isError,
    refetch,
  };
}
