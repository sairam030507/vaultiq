import { Router } from "express";
import {
  getNextMonthPrediction,
  getSpendingAnomalies,
  getAIInsights,
  simulateBudgetAdjustment,
} from "../controllers/prediction.controller";

const router = Router();

router.get("/next-month", getNextMonthPrediction);
router.get("/anomalies", getSpendingAnomalies);
router.get("/insights", getAIInsights);
router.post("/simulate", simulateBudgetAdjustment);

export default router;
