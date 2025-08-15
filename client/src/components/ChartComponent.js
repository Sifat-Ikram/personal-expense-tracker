"use client";

import { useFetchExpenses } from "@/hooks/useFetchExpenses";
import { useState, useEffect } from "react";
import {
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
} from "recharts";

export default function ChartComponent() {
  const { expenses, loading, error} = useFetchExpenses();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!Array.isArray(expenses) || expenses.length === 0) {
    return <p className="text-gray-500">No expense data available.</p>;
  }

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

  const categoryData =
    expenses?.reduce((acc, expense) => {
      const category = expense.category || "Others";
      if (!acc[category]) acc[category] = 0;
      acc[category] += Number(expense.amount) || 0;
      return acc;
    }, {}) || {};

  const chartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

  return (
    <div className="flex flex-col items-center w-full p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
        Expenses by Category
      </h1>

      {chartData.length > 0 ? (
        <div className="w-full max-w-3xl h-80 sm:h-96 md:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout={isMobile ? "horizontal" : "vertical"}
                verticalAlign={isMobile ? "bottom" : "middle"}
                align={isMobile ? "center" : "right"}
                iconSize={isMobile ? 12 : 14}
                wrapperStyle={
                  isMobile
                    ? { marginTop: 20, display: "flex", gap: 12 }
                    : {
                        paddingLeft: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-500">No expense data available.</p>
      )}
    </div>
  );
}
