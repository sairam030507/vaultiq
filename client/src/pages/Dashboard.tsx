import { useMemo, useState } from "react";
import { Plus, Sparkles, PieChart, LayoutDashboard } from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import SummaryCard from "../components/dashboard/SummaryCard";
import BudgetProgress from "../components/dashboard/BudgetProgress";
import SearchBar from "../components/dashboard/SearchBar";
import TransactionTable from "../components/dashboard/TransactionTable";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import CategoryFilter from "../components/dashboard/CategoryFilter";
import AIInsights from "../components/dashboard/AIInsights";
import MLPredictionCenter from "../components/dashboard/MLPredictionCenter";
import BudgetsAnalytics from "../components/dashboard/BudgetsAnalytics";
import SplitExpenses from "../components/dashboard/SplitExpenses";

import AddExpenseModal from "../components/transactions/AddExpenseModal";
import EditExpenseModal from "../components/transactions/EditExpenseModal";

import { useExpense } from "../context/ExpenseContext";
import type { Expense } from "../types/expense";

function Dashboard() {
  const {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    activeTab,
    setActiveTab,
    predictionData,
  } = useExpense();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const income = 75000;
  const budget = 60000;

  // Current month (August 2026) expenses
  const currentMonthExpenses = useMemo(() => {
    return expenses.filter((e) => e.date?.startsWith("2026-08"));
  }, [expenses]);

  const totalCurrentExpenses = useMemo(() => {
    return currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [currentMonthExpenses]);

  const balance = income - totalCurrentExpenses;

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || expense.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, category]);

  const handleAddExpense = (expense: Omit<Expense, "id">) => {
    addExpense(expense);
    setIsAddOpen(false);
  };

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsEditOpen(true);
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    updateExpense(updatedExpense);
    setIsEditOpen(false);
    setSelectedExpense(null);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
        {/* Mobile Navigation Header */}
        <div className="md:hidden flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <div className="font-black text-2xl text-slate-900">
            Vault<span className="text-blue-600">IQ</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`p-2 rounded-lg ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}
              title="Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab("ai-predictor")}
              className={`p-2 rounded-lg ${activeTab === "ai-predictor" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}
              title="ML Predictor"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab("budgets")}
              className={`p-2 rounded-lg ${activeTab === "budgets" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}
              title="Budgets"
            >
              <PieChart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: AI Predictor View */}
        {activeTab === "ai-predictor" && <MLPredictionCenter />}

        {/* Tab 2: Budgets View */}
        {activeTab === "budgets" && <BudgetsAnalytics />}

        {/* Tab 3: Split Expenses View */}
        {activeTab === "split" && <SplitExpenses />}

        {/* Tab 4: All Expenses View */}
        {activeTab === "transactions" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">All Expenses</h1>
                <p className="text-slate-500 text-sm mt-1">
                  Complete ledger of {expenses.length} transactions across all months
                </p>
              </div>
              <button
                onClick={() => setIsAddOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Plus className="w-4 h-4" /> Add Expense
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <SearchBar search={search} setSearch={setSearch} />
                <CategoryFilter category={category} setCategory={setCategory} />
              </div>
            </div>

            <TransactionTable
              expenses={filteredExpenses}
              onDelete={deleteExpense}
              onEdit={handleEditExpense}
            />
          </div>
        )}

        {/* Tab 5: Main Overview Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                  Dashboard
                </h1>
                <p className="text-slate-500 mt-1 text-sm">
                  Welcome back to VaultIQ 👋 • August 2026 Overview
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab("ai-predictor")}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-5 py-3 rounded-xl font-semibold transition flex items-center gap-2 shadow-lg shadow-blue-600/25"
                >
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  {predictionData.nextMonthName} Forecast: ₹{predictionData.predictedTotal.toLocaleString()}
                </button>

                <button
                  onClick={() => setIsAddOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <Plus className="w-4 h-4" /> Add Expense
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <SummaryCard
                title="Current Balance"
                amount={balance}
                color="blue"
              />
              <SummaryCard
                title="Monthly Income"
                amount={income}
                color="green"
              />
              <SummaryCard
                title="Spent This Month"
                amount={totalCurrentExpenses}
                color="red"
              />
              <SummaryCard
                title="Monthly Budget"
                amount={budget}
                color="purple"
              />
            </div>

            {/* AI Insights Widget Banner */}
            <AIInsights />

            {/* Budget Progress */}
            <BudgetProgress
              budget={budget}
              expenses={totalCurrentExpenses}
            />

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
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

            {/* Transactions & Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TransactionTable
                  expenses={filteredExpenses.slice(0, 8)}
                  onDelete={deleteExpense}
                  onEdit={handleEditExpense}
                />
                {filteredExpenses.length > 8 && (
                  <div className="text-center mt-3">
                    <button
                      onClick={() => setActiveTab("transactions")}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      View all {filteredExpenses.length} transactions →
                    </button>
                  </div>
                )}
              </div>

              <div>
                <ExpenseChart expenses={currentMonthExpenses.length > 0 ? currentMonthExpenses : expenses} />
              </div>
            </div>
          </div>
        )}
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