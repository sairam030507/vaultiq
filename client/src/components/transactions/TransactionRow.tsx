import type { Expense } from "../../types/expense";

type Props = {
  expense: Expense;
  onDelete: (id: number) => void;
  onEdit: (expense: Expense) => void;
};

function TransactionRow({
  expense,
  onDelete,
  onEdit,
}: Props) {
  return (
    <tr className="border-b hover:bg-slate-50">

      <td className="py-4">
        {expense.title}
      </td>

      <td>
        {expense.category}
      </td>

      <td className="text-red-600 font-semibold">
        ₹{expense.amount.toLocaleString()}
      </td>

      <td>
        {expense.date}
      </td>

      <td>
        <div className="flex gap-2">

          <button
            onClick={() => onEdit(expense)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(expense.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
          >
            Delete
          </button>

        </div>
      </td>

    </tr>
  );
}

export default TransactionRow;