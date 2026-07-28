import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Expense } from "../types/expense";
import { expenses as initialExpenses } from "../data/expenses";

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: number) => void;
  updateExpense: (expense: Expense) => void;
}

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export function ExpenseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem("vaultiq-expenses");
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  useEffect(() => {
    localStorage.setItem(
      "vaultiq-expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  function addExpense(expense: Expense) {
    setExpenses((prev) => [expense, ...prev]);
  }

  function deleteExpense(id: number) {
    setExpenses((prev) =>
      prev.filter((expense) => expense.id !== id)
    );
  }

  function updateExpense(updatedExpense: Expense) {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpense must be used inside ExpenseProvider"
    );
  }

  return context;
}