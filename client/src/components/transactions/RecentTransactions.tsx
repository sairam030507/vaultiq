import { FaEdit, FaTrash } from "react-icons/fa";
import type { Expense } from "../../types/expense";
import { useExpense } from "../../context/ExpenseContext";

interface Props {
  expenses: Expense[];
}

function RecentTransactions({ expenses }: Props) {
  const { deleteExpense } = useExpense();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Recent Transactions
        </h2>

        <span className="text-gray-500">
          {expenses.length} Transactions
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Title
              </th>

              <th className="text-left py-3">
                Category
              </th>

              <th className="text-left py-3">
                Amount
              </th>

              <th className="text-left py-3">
                Date
              </th>

              <th className="text-center py-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {expenses.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No expenses found.
                </td>

              </tr>

            ) : (

              expenses.map((expense) => (

                <tr
                  key={expense.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="py-4 font-medium">
                    {expense.title}
                  </td>

                  <td>
                    {expense.category}
                  </td>

                  <td className="text-red-600 font-semibold">
                    ₹{expense.amount.toLocaleString()}
                  </td>

                  <td>
                    {new Date(expense.date).toLocaleDateString()}
                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          deleteExpense(expense.id)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentTransactions;