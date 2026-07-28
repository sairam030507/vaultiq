import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useExpense } from "../../context/ExpenseContext";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#F97316",
];

function ExpenseChart() {
  const { expenses } = useExpense();

  const categoryTotals = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }

    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        Expense Breakdown
      </h2>

      {data.length === 0 ? (
        <div className="h-80 flex items-center justify-center text-gray-500">
          No expense data available.
        </div>
      ) : (
        <div className="w-full h-80">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}

export default ExpenseChart;