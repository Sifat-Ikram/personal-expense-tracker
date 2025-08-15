"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export function useFetchExpenses() {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/expenses/get");
      return res.data;
    },
  });

  return {
    expenses: data || [],
    isLoading,
    error: isError,
    refetch,
  };
}
