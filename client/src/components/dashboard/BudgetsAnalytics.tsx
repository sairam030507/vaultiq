import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useExpense } from "../../context/ExpenseContext";

export default function BudgetsAnalytics() {
  const { expenses, predictionData } = useExpense();

  const income = 75000;
  const overallBudget = 60000;

  // Filter current month (August 2026)
  const currentMonthExpenses = expenses.filter((e) => e.date?.startsWith("2026-08"));
  const currentTotal = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Group by category for current month
  const categorySpending: Record<string, number> = {};
  for (const exp of currentMonthExpenses) {
    categorySpending[exp.category] = (categorySpending[exp.category] || 0) + exp.amount;
  }

  // 50/30/20 Rule Analysis
  const needsCategories = ["Housing", "Bills", "Food", "Transport", "Health"];
  const wantsCategories = ["Shopping", "Entertainment"];

  const needsSpent = currentMonthExpenses
    .filter((e) => needsCategories.includes(e.category))
    .reduce((sum, e) => sum + e.amount, 0);

  const wantsSpent = currentMonthExpenses
    .filter((e) => wantsCategories.includes(e.category))
    .reduce((sum, e) => sum + e.amount, 0);

  const actualSavings = Math.max(0, income - currentTotal);

  const budget503020 = [
    { name: "Needs (50%)", target: income * 0.5, actual: needsSpent, color: "#3B82F6" },
    { name: "Wants (30%)", target: income * 0.3, actual: wantsSpent, color: "#F59E0B" },
    { name: "Savings (20%)", target: income * 0.2, actual: actualSavings, color: "#10B981" },
  ];

  const pieData = Object.entries(categorySpending).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#6366F1"];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Budgets & Spending Limits</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Track category allocations, 50/30/20 financial balance, and predictive budget thresholds
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Monthly Budget
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">
            ₹{overallBudget.toLocaleString()}
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Spent: ₹{currentTotal.toLocaleString()}</span>
              <span>{Math.round((currentTotal / overallBudget) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  currentTotal > overallBudget ? "bg-red-500" : "bg-blue-600"
                }`}
                style={{ width: `${Math.min(100, (currentTotal / overallBudget) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Monthly Income vs Savings
          </div>
          <div className="text-3xl font-black text-emerald-600 mt-2">
            +₹{actualSavings.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Current net savings rate: <strong>{Math.round((actualSavings / income) * 100)}%</strong> of ₹{income.toLocaleString()} monthly salary.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            ML Projected Budget Status
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 flex items-center gap-2">
            {predictionData.predictedTotal <= overallBudget ? (
              <span className="flex items-center text-emerald-600">
                <CheckCircle2 className="w-6 h-6 mr-1" /> On Track
              </span>
            ) : (
              <span className="flex items-center text-amber-600">
                <AlertCircle className="w-6 h-6 mr-1" /> Cap Risk
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-4">
            {predictionData.nextMonthName} is projected at ₹{predictionData.predictedTotal.toLocaleString()} (
            {overallBudget - predictionData.predictedTotal >= 0
              ? `₹${(overallBudget - predictionData.predictedTotal).toLocaleString()} under budget`
              : `₹${(predictionData.predictedTotal - overallBudget).toLocaleString()} above budget`}
            ).
          </p>
        </div>
      </div>

      {/* 50/30/20 Rule Breakdown & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 50/30/20 Framework */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-1">50/30/20 Financial Framework</h2>
          <p className="text-xs text-slate-500 mb-6">
            Recommended benchmark: 50% Needs, 30% Wants, 20% Savings
          </p>

          <div className="space-y-6">
            {budget503020.map((item) => {
              const pctOfTarget = Math.round((item.actual / item.target) * 100);
              return (
                <div key={item.name}>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1">
                    <span className="text-slate-800">{item.name}</span>
                    <span className="text-slate-600">
                      ₹{item.actual.toLocaleString()} / ₹{item.target.toLocaleString()} ({pctOfTarget}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, pctOfTarget)}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Pie Distribution */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Current Month Spending Share</h2>
          <p className="text-xs text-slate-500 mb-2">Category distribution for August 2026</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {pieData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, ""]} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Budget Caps Matrix */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Category Limits & ML Recommended Caps
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Current Month Spent</th>
                <th className="pb-3 font-semibold">ML Next Month Forecast</th>
                <th className="pb-3 font-semibold">Recommended Budget</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {predictionData.categoryForecasts.map((cat) => {
                const spent = categorySpending[cat.category] || 0;
                const isOver = spent > cat.recommendedBudget;

                return (
                  <tr key={cat.category} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 font-bold text-slate-900">{cat.category}</td>
                    <td className="py-3.5 text-slate-700">₹{spent.toLocaleString()}</td>
                    <td className="py-3.5 font-semibold text-blue-600">
                      ₹{cat.predictedAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 font-bold text-slate-800">
                      ₹{cat.recommendedBudget.toLocaleString()}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          isOver ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {isOver ? "Over Recommended Cap" : "Within Safe Margin"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
