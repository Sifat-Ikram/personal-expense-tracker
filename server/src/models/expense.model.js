import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
