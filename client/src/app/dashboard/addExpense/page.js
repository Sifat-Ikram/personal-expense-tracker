import AddExpense from "@/components/AddExpense";
import Head from "next/head";

const AddExpensePage = () => {
  return (
    <div>
      <Head>
        <title>Add Expense | Personal Expense Tracker</title>
        <meta
          name="description"
          content="Add a new expense to your personal expense tracker."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AddExpense />
    </div>
  );
};

export default AddExpensePage;
