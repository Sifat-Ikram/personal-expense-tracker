"use client";

import { useState } from "react";
import { useExpenseById } from "../hooks/useExpenseById";
import { RiDeleteBin6Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import UpdateExpense from "./UpdateExpense";
import Link from "next/link";

export default function ExpenseDetailsCard({ id }) {
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const { expense, isLoading, error, refetch } = useExpenseById(id);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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

        router.push("/dashboard/expenses");
      }
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
    <motion.div className="w-3/4 mx-auto mt-10 md:mt-16 lg:mt-20 xl:mt-32">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4 text-center">
        Expense Details
      </h1>
      <div className="flex flex-col space-x-7">
        <div className="flex justify-between items-start relative mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 overflow-hidden">
            {expense.title}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col space-y-5">
            <div>
              <span className="font-semibold text-gray-900">Category</span>
              <div className="text-gray-600">{expense.category}</div>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Amount</span>
              <div className="text-gray-600">
                {expense.amount.toLocaleString()} taka
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Date</span>
              <div className="text-gray-600">
                {new Date(expense.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col max-sm:mt-8 gap-5">
            <button
              onClick={() => setShowUpdateModal(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded-xl flex items-center gap-2 text-sm sm:text-base font-medium shadow-sm hover:shadow-md"
            >
              <FaEdit size={16} /> Update
            </button>

            {showUpdateModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    ✖
                  </button>
                  <UpdateExpense
                    expense={expense}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={refetch}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl flex items-center gap-2 text-sm sm:text-base font-medium shadow-sm hover:shadow-md"
            >
              <RiDeleteBin6Line size={16} /> Delete
            </button>
            <Link
              href="/dashboard/allExpenses"
              className="bg-[#008080] text-white hover:bg-[#006666] text-center px-3 py-2 rounded-xl text-sm sm:text-base font-medium shadow-sm hover:shadow-md"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
