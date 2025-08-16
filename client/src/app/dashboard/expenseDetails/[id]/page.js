import ExpenseDetailsCard from "@/components/ExpenseDetailsCard";
import Head from "next/head";
import { cookies } from "next/headers";

export default async function ExpenseDetailsPage({ params }) {
  const { id } = params;

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-8 bg-gray-50">
      <Head>
        <title>Expense Details | Personal Expense Tracker</title>
        <meta name="description" content={`Details for expense ID: ${id}`} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <ExpenseDetailsCard id={id} />
    </div>
  );
}
