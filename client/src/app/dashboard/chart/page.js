import ChartComponent from "@/components/ChartComponent";
import Head from "next/head";

export const metadata = {
  title: "Expenses Chart | Personal Expense Tracker",
  description:
    "Visualize your personal expenses by category using interactive charts.",
  robots: "noindex, nofollow",
};

export default async function ChartPage() {
  return <ChartComponent />;
}
