import type { Expense, MLPredictionData, SimulationResult } from "../types/expense";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchExpenses(): Promise<Expense[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/expenses`);
    if (!res.ok) throw new Error("Failed to fetch expenses from API");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn("Backend API unavailable, using local cache:", err);
    const saved = localStorage.getItem("vaultiq-expenses");
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  }
}

export async function createExpenseApi(expense: Omit<Expense, "id">): Promise<Expense> {
  try {
    const res = await fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    if (!res.ok) throw new Error("Failed to create expense");
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn("API failed, creating locally:", err);
    return {
      id: `local-${Date.now()}`,
      ...expense,
    };
  }
}

export async function updateExpenseApi(id: string | number, expense: Partial<Expense>): Promise<Expense | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    if (!res.ok) throw new Error("Failed to update expense");
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn("API failed, updating locally:", err);
    return null;
  }
}

export async function deleteExpenseApi(id: string | number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.warn("API failed, deleting locally:", err);
    return true;
  }
}

export async function fetchMLPredictions(): Promise<MLPredictionData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/predict/next-month`);
    if (!res.ok) throw new Error("Failed to fetch ML predictions");
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn("Failed to fetch ML prediction from server:", err);
    return null;
  }
}

export async function resetDemoDataset(): Promise<Expense[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/expenses/seed-demo`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to seed demo data");
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn("Failed to reset demo via API:", err);
    return [];
  }
}

export async function simulateScenario(adjustments: Record<string, number>): Promise<SimulationResult | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/predict/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adjustments }),
    });
    if (!res.ok) throw new Error("Failed to simulate scenario");
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn("Failed to simulate scenario:", err);
    return null;
  }
}
