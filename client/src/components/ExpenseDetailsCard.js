"use client";

import { useExpenseById } from "../hooks/useExpenseById";
import { RiDeleteBin6Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export default function ExpenseDetailsCard({ id }) {
  const axiosPublic = useAxiosPublic();
  const { expense, isLoading, error } = useExpenseById(id);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosPublic.delete(`/api/expenses/${id}`);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "This expense has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      router.push("/dashboard/expenses");
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    }
  };

  const handleUpdate = () => {
    router.push(`/dashboard/expenses/update/${id}`);
  };

  if (isLoading)
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Error loading expense.</p>
    );
  if (!expense)
    return <p className="text-center py-10 text-gray-500">No expense found.</p>;

  return (
    <motion.div className="w-3/4 mx-auto mt-10 md:mt-16 lg:mt-20 xl:mt-32 justify-center items-center">
      <div className="flex flex-col space-x-7">
        <div className="flex justify-between items-start relative mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 overflow-hidden">
            {expense.title}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col space-y-5">
            <div className="flex sm:flex-col max-sm:space-x-2 sm:space-y-2">
              <span className="font-semibold text-gray-900 text-base sm:text-lg lg:text-xl">
                Category
              </span>
              <span className="text-gray-600 text-sm sm:text-base lg:text-lg">
                {expense.category}
              </span>
            </div>
            <div className="flex sm:flex-col max-sm:space-x-2 sm:space-y-2">
              <span className="font-semibold text-gray-900 text-base sm:text-lg lg:text-xl">
                Amount
              </span>
              <span className="text-gray-600 text-sm sm:text-base lg:text-lg">
                {expense.amount.toLocaleString()} taka
              </span>
            </div>
            <div className="flex sm:flex-col max-sm:space-x-2 sm:space-y-2">
              <span className="font-semibold text-gray-900 text-base sm:text-lg lg:text-xl">
                Date
              </span>
              <span className="text-gray-600 text-sm sm:text-base lg:text-lg">
                {new Date(expense.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-col max-sm:mt-8 gap-5">
            <button
              onClick={handleUpdate}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 cursor-pointer rounded-xl flex items-center gap-2 text-sm sm:text-base font-medium shadow-sm hover:shadow-md transition"
            >
              <FaEdit size={16} /> Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 cursor-pointer rounded-xl flex items-center gap-2 text-sm sm:text-base font-medium shadow-sm hover:shadow-md transition"
            >
              <RiDeleteBin6Line size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
