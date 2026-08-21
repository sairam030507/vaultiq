import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Expense, MLPredictionData } from "../types/expense";
import { initialExpenses } from "../data/expenses";
import {
  fetchExpenses,
  createExpenseApi,
  updateExpenseApi,
  deleteExpenseApi,
  fetchMLPredictions,
  resetDemoDataset,
} from "../services/api";
import { calculateClientMLPredictions } from "../utils/mlEngine";

interface ExpenseContextType {
  expenses: Expense[];
  predictionData: MLPredictionData;
  isLoading: boolean;
  activeTab: "dashboard" | "ai-predictor" | "budgets" | "transactions" | "split";
  setActiveTab: (tab: "dashboard" | "ai-predictor" | "budgets" | "transactions" | "split") => void;
  addExpense: (expense: Omit<Expense, "id">) => Promise<void>;
  deleteExpense: (id: string | number) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  resetToDemo: () => Promise<void>;
  refreshPredictions: () => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem("vaultiq-expenses");
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [predictionData, setPredictionData] = useState<MLPredictionData>(() =>
    calculateClientMLPredictions(expenses)
  );

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "ai-predictor" | "budgets" | "transactions" | "split">(
    "dashboard"
  );

  // Re-calculate ML predictions when expenses change
  const refreshPredictions = useCallback(async () => {
    try {
      const serverData = await fetchMLPredictions();
      if (serverData) {
        setPredictionData(serverData);
      } else {
        setPredictionData(calculateClientMLPredictions(expenses));
      }
    } catch {
      setPredictionData(calculateClientMLPredictions(expenses));
    }
  }, [expenses]);

  // Initial load from server
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchExpenses();
        if (mounted && data.length > 0) {
          setExpenses(data);
          localStorage.setItem("vaultiq-expenses", JSON.stringify(data));
        }
      } catch (err) {
        console.warn("Failed to load expenses on startup:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  // Update localStorage and refresh predictions
  useEffect(() => {
    localStorage.setItem("vaultiq-expenses", JSON.stringify(expenses));
    refreshPredictions();
  }, [expenses, refreshPredictions]);

  const addExpense = async (expense: Omit<Expense, "id">) => {
    // Optimistic client addition
    const tempId = `exp-${Date.now()}`;
    const newExp: Expense = { id: tempId, ...expense };
    setExpenses((prev) => [newExp, ...prev]);

    try {
      const serverResult = await createExpenseApi(expense);
      if (serverResult && serverResult.id) {
        setExpenses((prev) =>
          prev.map((e) => (e.id === tempId ? serverResult : e))
        );
      }
    } catch (err) {
      console.warn("API add failed, keeping local copy:", err);
    }
  };

  const deleteExpense = async (id: string | number) => {
    setExpenses((prev) => prev.filter((expense) => String(expense.id) !== String(id)));
    try {
      await deleteExpenseApi(id);
    } catch (err) {
      console.warn("API delete failed:", err);
    }
  };

  const updateExpense = async (updatedExpense: Expense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        String(expense.id) === String(updatedExpense.id) ? updatedExpense : expense
      )
    );
    try {
      await updateExpenseApi(updatedExpense.id, updatedExpense);
    } catch (err) {
      console.warn("API update failed:", err);
    }
  };

  const resetToDemo = async () => {
    setIsLoading(true);
    try {
      const serverData = await resetDemoDataset();
      if (serverData && serverData.length > 0) {
        setExpenses(serverData);
      } else {
        setExpenses([...initialExpenses]);
      }
    } catch {
      setExpenses([...initialExpenses]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        predictionData,
        isLoading,
        activeTab,
        setActiveTab,
        addExpense,
        deleteExpense,
        updateExpense,
        resetToDemo,
        refreshPredictions,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used inside ExpenseProvider");
  }
  return context;
}