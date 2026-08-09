import type { Expense } from "../../types/expense";
import TransactionRow from "../transactions/TransactionRow";

type Props = {
  expenses: Expense[];
  onDelete: (id: number) => void;
  onEdit: (expense: Expense) => void;
};

function TransactionTable({
  expenses,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow mt-8 p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Transactions
      </h2>

      {expenses.length === 0 ? (
        <p className="text-slate-500 text-center py-8">
          No expenses found.
        </p>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b text-left">

                <th className="pb-4">
                  Title
                </th>

                <th className="pb-4">
                  Category
                </th>

                <th className="pb-4">
                  Amount
                </th>

                <th className="pb-4">
                  Date
                </th>

                <th className="pb-4">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <TransactionRow
                  key={expense.id}
                  expense={expense}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default TransactionTable;