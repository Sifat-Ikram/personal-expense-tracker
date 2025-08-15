import Expense from "../models/expense.model.js";


export default class ExpenseService {
  static async getAllExpenses() {
    return await Expense.find().sort({ date: -1 });
  }


  static async getExpenseById(id) {
    return await Expense.findById(id);
  }

  
  static async createExpense(data) {
    const expense = new Expense(data);
    return await expense.save();
  }


  static async updateExpenseById(id, updateData) {
    const updatedExpense = await Expense.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedExpense) {
      const error = new Error("Expense not found");
      error.status = 404;
      throw error;
    }

    return updatedExpense;
  }

  static async deleteExpense(id) {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      const error = new Error("Expense not found");
      error.status = 404;
      throw error;
    }

    return deletedExpense;
  }
}
