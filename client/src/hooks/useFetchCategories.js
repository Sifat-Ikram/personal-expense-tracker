"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useFetchCategories() {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/category/get");
      return res.data;
    },
  });

  return {
    categories: data || [],
    isLoading,
    error: isError,
    refetch,
  };
}
