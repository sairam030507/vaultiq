import { Request, Response } from "express";
import { db } from "../storage/db";
import { aggregateMonthlyStats } from "../services/mlPredictor";

export const getExpenses = (req: Request, res: Response): void => {
  try {
    const expenses = db.getAll();
    res.json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching expenses", error });
  }
};

export const getExpenseById = (req: Request, res: Response): void => {
  try {
    const rawId = req.params.id;
    if (!rawId) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }
    const id = Array.isArray(rawId) ? rawId[0]! : rawId;
    const expense = db.getById(id);
    if (!expense) {
      res.status(404).json({ success: false, message: "Expense not found" });
      return;
    }
    res.json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching expense", error });
  }
};

export const createExpense = (req: Request, res: Response): void => {
  try {
    const { title, amount, category, date, paymentMethod, notes } = req.body;
    if (!title || amount === undefined || isNaN(Number(amount))) {
      res.status(400).json({ success: false, message: "Title and a valid amount are required" });
      return;
    }

    const newExpense = db.add({
      title,
      amount: Number(amount),
      category: category || "Food",
      date: date || new Date().toISOString().split("T")[0] || "2026-08-21",
      paymentMethod: paymentMethod || "UPI",
      notes: notes || "",
    });

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating expense", error });
  }
};

export const updateExpense = (req: Request, res: Response): void => {
  try {
    const rawId = req.params.id;
    if (!rawId) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }
    const id = Array.isArray(rawId) ? rawId[0]! : rawId;
    const updated = db.update(id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: "Expense not found" });
      return;
    }
    res.json({
      success: true,
      message: "Expense updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating expense", error });
  }
};

export const deleteExpense = (req: Request, res: Response): void => {
  try {
    const rawId = req.params.id;
    if (!rawId) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }
    const id = Array.isArray(rawId) ? rawId[0]! : rawId;
    const deleted = db.delete(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "Expense not found" });
      return;
    }
    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting expense", error });
  }
};

export const getMonthlyStatistics = (req: Request, res: Response): void => {
  try {
    const expenses = db.getAll();
    const stats = aggregateMonthlyStats(expenses);
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error calculating monthly statistics", error });
  }
};

export const resetDemoData = (req: Request, res: Response): void => {
  try {
    const expenses = db.resetDemo();
    res.json({
      success: true,
      message: "Seeded 6 months of demo historical transactions for ML prediction.",
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error resetting demo data", error });
  }
};
