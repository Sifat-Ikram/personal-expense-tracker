"use client";
import ExpenseCard from "@/components/ExpenseCard";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useFetchExpenses } from "@/hooks/useFetchExpenses";
import Link from "next/link";
import { useState } from "react";

export default function TaskListPage() {
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
    const categoryMatch =
      categoryFilter === "All" || expense.category === categoryFilter;
    return categoryMatch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold">
          Expenses List
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-[#E1E1E1] rounded-md px-3 py-2 text-sm sm:text-base text-[#667085] jakarta font-medium"
          >
            <option value="All">Select Task Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <Link href="/dashboard/addExpense">
            <button className="bg-[#60E5AE] text-sm sm:text-base jakarta cursor-pointer text-[#1F1F1F] px-2 sm:px-4 lg:px-6 py-[2px] sm:py-2 lg:py-3  rounded-[8px]">
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
          <p className="text-gray-500">No tasks found for selected filters.</p>
        )}
      </div>
    </div>
  );
}
