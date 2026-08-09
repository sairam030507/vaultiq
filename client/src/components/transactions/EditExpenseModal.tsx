import { useEffect, useState } from "react";
import type { Expense } from "../../types/expense";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
  onUpdateExpense: (expense: Expense) => void;
};

function EditExpenseModal({
  isOpen,
  onClose,
  expense,
  onUpdateExpense,
}: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(expense.category);
      setDate(expense.date);
    }
  }, [expense]);

  if (!isOpen || !expense) return null;

  const handleUpdate = () => {
    onUpdateExpense({
      ...expense,
      title,
      amount,
      category,
      date,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-2xl p-8 w-[450px]">

        <h2 className="text-2xl font-bold mb-6">
          Edit Expense
        </h2>

        <input
          className="w-full border rounded-lg p-3 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          className="w-full border rounded-lg p-3 mb-4"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <select
          className="w-full border rounded-lg p-3 mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Bills</option>
        </select>

        <input
          type="date"
          className="w-full border rounded-lg p-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="flex justify-end gap-4 mt-6">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Update
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditExpenseModal;