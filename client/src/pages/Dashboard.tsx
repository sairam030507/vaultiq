import { useMemo, useState } from "react";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaPiggyBank,
} from "react-icons/fa";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SummaryCard from "../components/dashboard/SummaryCard";
import ExpenseChart from "../components/charts/ExpenseChart";
import RecentTransactions from "../components/transactions/RecentTransactions";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import AddExpenseModal from "../components/transactions/AddExpenseModal";
import TransactionToolbar from "../components/transactions/TransactionToolbar";

import { useExpense } from "../context/ExpenseContext";

function Dashboard() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");

  const { expenses } = useExpense();

  const filteredExpenses = useMemo(() => {
    let data = [...expenses];

    if (search) {
      data = data.filter(
        (expense) =>
          expense.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          expense.category
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter(
        (expense) => expense.category === category
      );
    }

    switch (sort) {
      case "highest":
        data.sort((a, b) => b.amount - a.amount);
        break;

      case "lowest":
        data.sort((a, b) => a.amount - b.amount);
        break;

      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );
    }

    return data;
  }, [expenses, search, category, sort]);

  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const totalIncome = 70000;
  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <div className="flex-1 p-8">

        <Topbar />

        <div className="flex justify-between items-center mt-8">
          <div>
            <h1 className="text-4xl font-bold">
              Dashboard
            </h1>

            <p className="text-gray-500">
              Welcome back 👋
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            + Add Expense
          </button>
        </div>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mt-8">

          <SummaryCard
            title="Balance"
            amount={`₹${balance.toLocaleString()}`}
            icon={<FaWallet />}
            color="bg-blue-600"
          />

          <SummaryCard
            title="Income"
            amount={`₹${totalIncome.toLocaleString()}`}
            icon={<FaArrowUp />}
            color="bg-green-600"
          />

          <SummaryCard
            title="Expenses"
            amount={`₹${totalExpenses.toLocaleString()}`}
            icon={<FaArrowDown />}
            color="bg-red-600"
          />

          <SummaryCard
            title="Transactions"
            amount={filteredExpenses.length.toString()}
            icon={<FaPiggyBank />}
            color="bg-purple-600"
          />

        </div>

        <div className="mt-8">
          <TransactionToolbar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <ExpenseChart />
          <BudgetProgress />
        </div>

        <RecentTransactions expenses={filteredExpenses} />

      </div>

      <AddExpenseModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default Dashboard;