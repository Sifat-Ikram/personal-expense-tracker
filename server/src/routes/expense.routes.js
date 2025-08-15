import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";

const router = express.Router();

router.use(protect);

router.get("/get", getExpenses);

router.get("/:id", getExpenseById);

router.post("/create", createExpense);

router.patch("/:id", updateExpense);

router.delete("/:id", deleteExpense);

export default router;
