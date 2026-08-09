import type { Expense } from "../../types/expense";

type Props = {
  expenses: Expense[];
};

function AIInsights({ expenses }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 mt-8">
        <h2 className="text-2xl font-bold">
          🤖 AI Insights
        </h2>

        <p className="text-slate-500 mt-3">
          Add some expenses to receive insights.
        </p>
      </div>
    );
  }

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const highest = expenses.reduce((max, expense) =>
    expense.amount > max.amount ? expense : max
  );

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-8">

      <h2 className="text-2xl font-bold">
        🤖 AI Insights
      </h2>

      <div className="mt-4 space-y-3 text-slate-600">

        <p>
          Total spending:
          <strong className="text-slate-900">
            {" "}₹{total.toLocaleString()}
          </strong>
        </p>

        <p>
          Highest expense:
          <strong className="text-slate-900">
            {" "}{highest.title} (₹
            {highest.amount.toLocaleString()})
          </strong>
        </p>

        <p>
          Most attention needed:
          <strong className="text-slate-900">
            {" "}{highest.category}
          </strong>
        </p>

      </div>

    </div>
  );
}

export default AIInsights;