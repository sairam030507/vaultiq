const budgets = [
  {
    category: "Food",
    spent: 450,
    limit: 600,
  },
  {
    category: "Transport",
    spent: 180,
    limit: 400,
  },
  {
    category: "Shopping",
    spent: 1299,
    limit: 2000,
  },
  {
    category: "Bills",
    spent: 2100,
    limit: 2500,
  },
];

function BudgetProgress() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Budget Progress
      </h2>

      <div className="space-y-6">

        {budgets.map((budget) => {
          const percentage = Math.min(
            (budget.spent / budget.limit) * 100,
            100
          );

          return (
            <div key={budget.category}>

              <div className="flex justify-between mb-2">

                <span className="font-medium">
                  {budget.category}
                </span>

                <span className="text-gray-500">
                  ₹{budget.spent} / ₹{budget.limit}
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">

                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${percentage}%` }}
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default BudgetProgress;