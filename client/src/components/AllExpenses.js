"use client";

import Link from "next/link";
import { useState } from "react";
import ExpenseCard from "./ExpenseCard";
import { useFetchExpenses } from "@/hooks/useFetchExpenses";
import { useFetchCategories } from "@/hooks/useFetchCategories";

export default function AllExpenses() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const { expenses, loading, error, refetch } = useFetchExpenses();
  const { categories } = useFetchCategories();

  if (loading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Oops! Something went wrong: {error}
      </p>
    );
  }

  const filteredExpenses = expenses.filter((expense) => {
    return categoryFilter === "All" || expense.category === categoryFilter;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-lg sm:text-xl lg:text-3xl font-bold">
          Expenses List
        </h2>

        <div className="flex items-center flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-[#E1E1E1] rounded-md px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-2 md:py-2 lg:py-3 text-xs sm:text-sm md:text-base lg:text-base text-[#667085] jakarta font-medium"
          >
            <option value="All">Select Task Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <Link href="/dashboard/addExpense">
            <button className="bg-[#008080] text-xs sm:text-sm md:text-base lg:text-base jakarta cursor-pointer text-white px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-2 md:py-2 lg:py-3 rounded-[8px] whitespace-nowrap">
              Add Expense
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              onDelete={refetch}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks found for selected filters.</p>
        )}
      </div>
    </div>
  );
}
