const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  paidby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  category: {
    type: String,
    required: [true, ""],
  },
  expenseAmount: {
    type: Number,
    required: [true, ""],
  },
  description: {
    type: String,
    required: [true, ""],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    lat: {
      type: Number,
      required: [true, ""],
    },
    lng: {
      type: Number,
      required: [true, ""],
    },
  },
  everyonesPart: {
    type: Number,
    required: [true, ""],
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
