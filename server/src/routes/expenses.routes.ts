import { Router } from "express";
import {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getMonthlyStatistics,
  resetDemoData,
} from "../controllers/expenses.controller";

const router = Router();

router.get("/", getExpenses);
router.get("/stats", getMonthlyStatistics);
router.get("/:id", getExpenseById);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.post("/seed-demo", resetDemoData);

export default router;
