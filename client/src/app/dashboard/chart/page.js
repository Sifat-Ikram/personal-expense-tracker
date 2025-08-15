import ChartComponent from "@/components/ChartComponent";
import Head from "next/head";

export const metadata = {
  title: "Expenses Chart | Personal Expense Tracker",
  description:
    "Visualize your personal expenses by category using interactive charts.",
  robots: "noindex, nofollow",
};

export default async function ChartPage() {
  let expenses = [];
  try {
    const res = await fetch("http://localhost:5000/api/expenses/get", {
      cache: "no-store",
    });
    expenses = await res.json();
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }

  return <ChartComponent expenses={expenses} />;
}
