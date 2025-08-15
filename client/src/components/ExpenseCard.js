"use client";

import { RiDeleteBin6Line } from "react-icons/ri";
import { LuClipboardPen } from "react-icons/lu";
import { motion } from "framer-motion";
import Link from "next/link";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Swal from "sweetalert2";

export default function ExpenseCard({ expense, onDelete }) {
  const axiosPublic = useAxiosPublic();

  const handleDeleteExpense = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
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

        if (onDelete) onDelete();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <Link href={`/dashboard/expenseDetails/${expense._id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 md:p-6 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-lg mx-auto cursor-pointer"
      >
        <div className="flex flex-col justify-between gap-3">
          <div className="relative">
            <h3
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 pr-10 
truncate max-h-12 sm:max-h-14 md:max-h-16 lg:max-h-20 overflow-hidden"
            >
              {expense.title}
            </h3>
            <button
              onClick={(e) => handleDeleteExpense(expense._id, e)}
              className="text-red-500 hover:text-red-600 absolute top-0 right-0"
              title="Delete expense"
            >
              <RiDeleteBin6Line size={16} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-700 text-sm sm:text-base md:text-lg">
            <span className="font-medium">Category:</span>
            <span className="truncate">{expense.category}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-700 text-sm sm:text-base md:text-lg">
            <span className="font-medium">Amount:</span>
            <span className=" font-semibold">
              {expense.amount.toLocaleString()} taka
            </span>
          </div>

          <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm mt-2">
            <LuClipboardPen className="w-4 h-4" />
            <span>
              {new Date(expense.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
