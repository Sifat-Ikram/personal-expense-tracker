import ExpenseDetailsCard from "@/components/ExpenseDetailsCard";

export default function ExpenseDetailsPage({ params }) {
  const { id } = params;

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-8 bg-gray-50 dark:bg-gray-900">
      <ExpenseDetailsCard id={id} />
    </div>
  );
}
