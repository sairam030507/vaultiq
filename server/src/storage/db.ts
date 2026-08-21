import fs from "fs";
import path from "path";
import { IExpense } from "../types";
import { sampleHistoricalExpenses } from "../data/seedData";

const DATA_DIR = path.resolve(__dirname, "../../data");
const DATA_FILE = path.join(DATA_DIR, "expenses.json");

class DatabaseStore {
  private expenses: IExpense[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
        const parsed = JSON.parse(fileContent);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.expenses = parsed;
          console.log(`[DB] Loaded ${this.expenses.length} expenses from disk.`);
          return;
        }
      }

      // Seed default historical data
      this.expenses = [...sampleHistoricalExpenses];
      this.persist();
      console.log(`[DB] Seeded ${this.expenses.length} historical expenses.`);
    } catch (err) {
      console.error("[DB] Failed to load data from disk, using fallback in-memory:", err);
      this.expenses = [...sampleHistoricalExpenses];
    }
  }

  private persist() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.expenses, null, 2), "utf-8");
    } catch (err) {
      console.error("[DB] Failed to persist data to disk:", err);
    }
  }

  public getAll(): IExpense[] {
    // Return sorted by date descending
    return [...this.expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  public getById(id: string | number): IExpense | undefined {
    return this.expenses.find((e) => String(e.id) === String(id));
  }

  public add(expense: Omit<IExpense, "id"> & { id?: string | number }): IExpense {
    const newExpense: IExpense = {
      id: expense.id || `exp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: expense.title,
      amount: Number(expense.amount),
      category: expense.category || "General",
      date: expense.date || new Date().toISOString().split("T")[0] || "2026-08-21",
      paymentMethod: expense.paymentMethod || "UPI",
      notes: expense.notes || "",
      createdAt: new Date().toISOString(),
    };

    this.expenses.unshift(newExpense);
    this.persist();
    return newExpense;
  }

  public update(id: string | number, updates: Partial<IExpense>): IExpense | null {
    const index = this.expenses.findIndex((e) => String(e.id) === String(id));
    if (index === -1) return null;

    const current = this.expenses[index]!;
    const updated: IExpense = {
      ...current,
      ...updates,
      amount: updates.amount !== undefined ? Number(updates.amount) : current.amount,
      id: current.id,
    };

    this.expenses[index] = updated;
    this.persist();
    return updated;
  }

  public delete(id: string | number): boolean {
    const initialLen = this.expenses.length;
    this.expenses = this.expenses.filter((e) => String(e.id) !== String(id));
    const deleted = this.expenses.length < initialLen;
    if (deleted) {
      this.persist();
    }
    return deleted;
  }

  public resetDemo(): IExpense[] {
    this.expenses = [...sampleHistoricalExpenses];
    this.persist();
    return this.getAll();
  }
}

export const db = new DatabaseStore();
