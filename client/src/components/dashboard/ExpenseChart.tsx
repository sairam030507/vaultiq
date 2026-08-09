import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { Expense } from "../../types/expense";

type Props = {
  expenses: Expense[];
};

function ExpenseChart({ expenses }: Props) {
  const data = expenses.reduce(
    (result, expense) => {
      const existing = result.find(
        (item) => item.name === expense.category
      );

      if (existing) {
        existing.value += expense.amount;
      } else {
        result.push({
          name: expense.category,
          value: expense.amount,
        });
      }

      return result;
    },
    [] as { name: string; value: number }[]
  );

  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Expense Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ExpenseChart;