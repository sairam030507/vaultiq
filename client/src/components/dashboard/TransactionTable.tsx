import type { Expense } from "../../types/expense";
import TransactionRow from "../transactions/TransactionRow";

type Props = {
  expenses: Expense[];
  onDelete: (id: string | number) => void;
  onEdit: (expense: Expense) => void;
};

function TransactionTable({
  expenses,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Transactions Ledger
      </h2>

      {expenses.length === 0 ? (
        <p className="text-slate-500 text-center py-8 text-sm">
          No expenses recorded yet. Click "+ Add Expense" to begin.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3">Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Action</th>
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