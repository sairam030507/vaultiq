import { useMemo, useState } from "react";

import Sidebar from "../components/layout/Sidebar";

import SummaryCard from "../components/dashboard/SummaryCard";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import SearchBar from "../components/dashboard/SearchBar";
import TransactionTable from "../components/dashboard/TransactionTable";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import CategoryFilter from "../components/dashboard/CategoryFilter";
import AIInsights from "../components/dashboard/AIInsights";

import AddExpenseModal from "../components/transactions/AddExpenseModal";
import EditExpenseModal from "../components/transactions/EditExpenseModal";

import { initialExpenses } from "../data/expenses";
import type { Expense } from "../types/expense";

function Dashboard() {
  const [expenses, setExpenses] =
    useState<Expense[]>(initialExpenses);

  const [isAddOpen, setIsAddOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedExpense, setSelectedExpense] =
    useState<Expense | null>(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const income = 50000;

  const budget = 60000;

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const balance = income - totalExpenses;

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        expense.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, category]);

  const handleAddExpense = (
    expense: Omit<Expense, "id">
  ) => {
    const newExpense: Expense = {
      id: Date.now(),
      ...expense,
    };

    setExpenses((prev) => [
      newExpense,
      ...prev,
    ]);

    setIsAddOpen(false);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses((prev) =>
      prev.filter((expense) => expense.id !== id)
    );
  };

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsEditOpen(true);
  };

  const handleUpdateExpense = (
    updatedExpense: Expense
  ) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );

    setIsEditOpen(false);
    setSelectedExpense(null);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <main className="flex-1 p-6 md:p-10">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

          <div>

            <h1 className="text-4xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Welcome back to VaultIQ 👋
            </p>

          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            + Add Expense
          </button>

        </div>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          <SummaryCard
            title="Total Balance"
            amount={balance}
            color="blue"
          />

          <SummaryCard
            title="Income"
            amount={income}
            color="green"
          />

          <SummaryCard
            title="Expenses"
            amount={totalExpenses}
            color="red"
          />

          <SummaryCard
            title="Budget"
            amount={budget}
            color="purple"
          />

        </div>

        {/* Budget Progress */}

        <BudgetProgress
          budget={budget}
          expenses={totalExpenses}
        />

        {/* Search and Filter */}

        <div className="bg-white rounded-2xl shadow p-6 mt-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <CategoryFilter
              category={category}
              setCategory={setCategory}
            />

          </div>

        </div>

        {/* Transactions */}

        <TransactionTable
          expenses={filteredExpenses}
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
        />

        {/* Expense Chart */}

        <ExpenseChart
          expenses={expenses}
        />

        {/* AI Insights */}

        <AIInsights
          expenses={expenses}
        />

      </main>

      {/* Add Expense Modal */}

      <AddExpenseModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddExpense={handleAddExpense}
      />

      {/* Edit Expense Modal */}

      <EditExpenseModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedExpense(null);
        }}
        expense={selectedExpense}
        onUpdateExpense={handleUpdateExpense}
      />

    </div>
  );
}

export default Dashboard;