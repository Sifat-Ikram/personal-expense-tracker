"use client";

import { useExpenseById } from "../hooks/useExpenseById";
import { RiDeleteBin6Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

export default function ExpenseDetailsCard({ id }) {
  const { expense, isLoading, error, refetch } = useExpenseById(id);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      alert("Expense deleted successfully!");
      router.push("/dashboard/expenses");
    } catch (err) {
      console.error(err);
      alert("Failed to delete expense.");
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
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-3xl mx-auto backdrop-blur-md"
    >
      <div className="flex justify-between items-start relative mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 pr-14 break-words truncate max-h-20 overflow-hidden">
          {expense.title}
        </h1>
        <div className="absolute top-0 right-0 flex gap-2">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl flex items-center gap-2 text-sm sm:text-base font-medium shadow-sm hover:shadow-md transition"
          >
            <FaEdit size={16} /> Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl flex items-center gap-2 text-sm sm:text-base font-medium shadow-sm hover:shadow-md transition"
          >
            <RiDeleteBin6Line size={16} /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-gray-700 dark:text-gray-300">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-gray-200">
            Category
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {expense.category}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-gray-200">
            Amount
          </span>
          <span className="text-green-600 dark:text-green-400 font-semibold">
            {expense.amount.toLocaleString()} taka
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-gray-200">
            Date
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {new Date(expense.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          {/* Optional: Add expense notes or description here if you have one */}
        </p>
      </div>
    </motion.div>
  );
}
