"use client";

import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function AddExpense() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (expenseData) => {
    try {
      const res = await axiosPublic.post("/api/expenses/create", expenseData);

      if (res.data?._id) {
        Swal.fire({
          icon: "success",
          title: "Expense Added!",
          text: "Your expense has been successfully recorded.",
          confirmButtonColor: "#008080",
        });
        reset();
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error?.response?.data?.message ||
          "Something went wrong while adding the expense!",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Add New Expense
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-4 sm:p-6 rounded-lg shadow"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Groceries"
            className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Category & Amount */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <input
              {...register("category")}
              placeholder="Food"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("amount", { required: "Amount is required" })}
              placeholder="100.00"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-semibold">Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            defaultValue="2025-06-22"
            className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-1 font-semibold">Short Description</label>
          <textarea
            {...register("shortDescription")}
            placeholder="Bought fruits and vegetables"
            rows={2}
            className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block mb-1 font-semibold">Long Description</label>
          <textarea
            {...register("longDescription")}
            placeholder="Purchased groceries from the local market including apples, oranges, carrots, and milk."
            rows={4}
            className="w-full p-2 border border-gray-500 rounded-md focus:outline-teal-600"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#60E5AE] cursor-pointer text-[#1F1F1F] px-6 py-3 rounded-[8px] w-full sm:w-auto"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
