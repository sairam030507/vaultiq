import type { Expense } from "../../types/expense";

type Props = {
  expense: Expense;
  onDelete: (id: string | number) => void;
  onEdit: (expense: Expense) => void;
};

function TransactionRow({
  expense,
  onDelete,
  onEdit,
}: Props) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
      <td className="py-3.5 font-semibold text-slate-900 text-sm">
        {expense.title}
      </td>

      <td className="text-slate-600 text-sm">
        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium">
          {expense.category}
        </span>
      </td>

      <td className="text-red-600 font-bold text-sm">
        ₹{expense.amount.toLocaleString()}
      </td>

      <td className="text-slate-500 text-sm">
        {expense.date}
      </td>

      <td>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(expense)}
            className="bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 px-3 py-1 rounded-lg text-xs font-medium transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(expense.id)}
            className="bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 px-3 py-1 rounded-lg text-xs font-medium transition"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TransactionRow;