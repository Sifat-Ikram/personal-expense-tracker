import AllExpenses from "@/components/AllExpenses";
import Head from "next/head";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | Personal Expense Tracker</title>
        <meta
          name="description"
          content="View and manage all your personal expenses in one place."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AllExpenses />
    </>
  );
}
