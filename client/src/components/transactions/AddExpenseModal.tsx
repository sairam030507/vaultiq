import { useState } from "react";
import { useExpense } from "../../context/ExpenseContext";
import type { Expense } from "../../types/expense";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddExpenseModal({
  isOpen,
  onClose,
}: AddExpenseModalProps) {
  const { addExpense } = useExpense();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title || !amount || !date) {
      alert("Please fill all fields");
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date,
    };

    addExpense(newExpense);

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[450px] rounded-2xl p-8 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          Add Expense
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-3 rounded-lg"
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Bills</option>
            <option>Other</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Expense
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddExpenseModal;