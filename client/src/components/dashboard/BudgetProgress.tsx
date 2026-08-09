type BudgetProgressProps = {
  budget: number;
  expenses: number;
};

function BudgetProgress({
  budget,
  expenses,
}: BudgetProgressProps) {
  const percentage = Math.min((expenses / budget) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-8">

      <h2 className="text-xl font-bold mb-4">
        Budget Usage
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-4">

        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        />

      </div>

      <p className="mt-3 text-slate-600">
        ₹{expenses.toLocaleString()} / ₹{budget.toLocaleString()}
      </p>

    </div>
  );
}

export default BudgetProgress;