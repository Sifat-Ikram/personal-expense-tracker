import ExpenseService from "../services/expense.service.js";

export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await ExpenseService.getAllExpenses();
    res.status(200).json(expenses);
  } catch (err) {
    next(err);
  }
};

export const getExpenseById = async (req, res, next) => {
  try {
    const expense = await ExpenseService.getExpenseById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (err) {
    next(err);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const expense = await ExpenseService.createExpense(req.body);
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

export const updateExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedExpense = await ExpenseService.updateExpenseById(id, req.body);
    if (!updatedExpense)
      return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(updatedExpense);
  } catch (err) {
    next(err);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const deletedExpense = await ExpenseService.deleteExpense(req.params.id);
    if (!deletedExpense)
      return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    next(err);
  }
};
