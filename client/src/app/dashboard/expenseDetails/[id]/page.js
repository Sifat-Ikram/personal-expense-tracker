// src/app/dashboard/expenseDetails/[id]/page.js
import ExpenseDetailsCard from "@/components/ExpenseDetailsCard";

// Optional: Pre-generate paths for SSG
export async function generateStaticParams() {
  const API_URL = process.env.API_URL || "http://localhost:5000";
  const res = await fetch(`${API_URL}/api/expenses/get`);
  const expenses = await res.json();

  return expenses.map((expense) => ({
    id: expense._id,
  }));
}

// Dynamic page component (Server Component)
export default async function ExpenseDetailsPage({ params }) {
  // Correct: Access params directly, no await needed
  const { id } = params;
  const API_URL = process.env.API_URL || "http://localhost:5000";

  // Fetch single expense data with ISR
  const res = await fetch(`${API_URL}/api/expenses/${id}`, {
    next: { revalidate: 60 }, // Revalidate every 60s
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Expense not found.
      </div>
    );
  }

  const expense = await res.json();

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-8 bg-gray-50 dark:bg-gray-900">
      <ExpenseDetailsCard expense={expense} />
    </div>
  );
}
