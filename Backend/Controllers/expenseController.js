const mongoose = require("mongoose");
const UserModel = require("../Models/User");
const ExpenseModel = require("../Models/Expense");
const TransactionModel = require("../Models/Transaction");
const GroupModel = require("../Models/Group");

exports.addExpense = async (req, res) => {
  try {
    const {
      group,
      paidby,
      members,
      category,
      expenseAmount,
      description,
      date,
      location,
      everyonesPart,
    } = req.body;

    if (!category)
      return res.status(404).json({ message: "Unesite kategoriju" });
    if (!expenseAmount)
      return res.status(404).json({ message: "Unesite vrednost" });
    if (!description) return res.status(404).json({ message: "Unesite opis" });
    if (!location) return res.status(404).json({ message: "Unesite lokaciju" });

    const newExpense = await ExpenseModel.create({
      group,
      paidby,
      members,
      category,
      expenseAmount,
      description,
      date: date || Date.now(),
      location,
      everyonesPart,
    });

    //Dodavanje na totalSpending grupe ako je grupni trosak
    if (group) {
      await GroupModel.findByIdAndUpdate(group, {
        $inc: { totalSpending: expenseAmount },
      });

      await GroupModel.findOneAndUpdate(
        { _id: group, "members.member": paidby },
        { $inc: { "members.$.amountPaid": expenseAmount } }
      );
    }

    const transactionPromises = members.map(async (memberId) => {
      const memberIdObj = new mongoose.Types.ObjectId(memberId);
      if (memberIdObj.equals(new mongoose.Types.ObjectId(paidby))) return null; //Nema potrebe za kreiranje transakcije ako je poseljilac isti kao primalac

      const transaction = await TransactionModel.create({
        expense: newExpense._id,
        settleFrom: new mongoose.Types.ObjectId(paidby),
        settleTo: memberIdObj,
        amount: expenseAmount / members.length,
      });

      await UserModel.findOneAndUpdate(
        { _id: transaction.settleFrom, "friends.friend": transaction.settleTo },
        { $inc: { "friends.$.balance": transaction.amount } }
      );

      await UserModel.findOneAndUpdate(
        { _id: transaction.settleTo, "friends.friend": transaction.settleFrom },
        { $inc: { "friends.$.balance": -transaction.amount } }
      );

      return transaction;
    });

    const transactions = await Promise.all(transactionPromises);

    res.status(201).json({
      message: "Trosak je uspesno dodat",
      expense: newExpense,
      transactions: transactions.filter((t) => t !== null),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom dodavanja troska",
      error: error.message,
    });
  }
};

exports.getExpensePagination = async (req, res) => {
  try {
    let { userId, page, limit, sortBy, filter, ascDsc } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    let filters = JSON.parse(decodeURIComponent(filter));

    let sortOrder = ascDsc === "dsc" ? -1 : 1;

    const userWithExpenses = await UserModel.findById(userId)
      .populate({
        path: "expenses",
        match: filters,
        select: "category date description expenseAmount everyonesPart",
        options: {
          skip: skip,
          limit: limit,
          sort: { [sortBy]: sortOrder },
        },
        populate: [
          {
            path: "group",
            select: "name",
          },
          {
            path: "members",
            select: "username photo",
          },
          {
            path: "paidby",
            select: "username",
          },
        ],
      })
      .exec();

    if (!userWithExpenses) {
      return res.status(404).send({ message: "User not found" });
    }

    const zbogPaginacije = await UserModel.findById(userId)
      .populate({
        path: "expenses",
        match: filters,
        select: "name",
      })
      .exec();

    const totalExpenses = zbogPaginacije.expenses.length;

    res.status(200).json({
      expenses: userWithExpenses.expenses,
      currentPage: page,
      totalPages: Math.ceil(totalExpenses / limit),
      totalExpenses,
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom pribavljanja troskova",
      error: error.message,
    });
  }
};

exports.getExpenseLocations = async (req, res) => {
  try {
    let { userId } = req.query;

    const userWithExpenses = await UserModel.findById(userId)
      .populate({
        path: "expenses",
        select:
          "category date description expenseAmount location everyonesPart",
        populate: [
          {
            path: "group",
            select: "name",
          },
          {
            path: "members",
            select: "username photo",
          },
          {
            path: "paidby",
            select: "username",
          },
        ],
      })
      .exec();

    if (!userWithExpenses) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).json({
      expenses: userWithExpenses.expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom pribavljanja troskova i lokacija",
      error: error.message,
    });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.query;

    const transactions = await TransactionModel.find({ expense: expenseId });

    for (const transaction of transactions) {
      await UserModel.findOneAndUpdate(
        { _id: transaction.settleFrom, "friends.friend": transaction.settleTo },
        { $inc: { "friends.$.balance": -transaction.amount } }
      );

      await UserModel.findOneAndUpdate(
        { _id: transaction.settleTo, "friends.friend": transaction.settleFrom },
        { $inc: { "friends.$.balance": transaction.amount } }
      );
    }

    await TransactionModel.deleteMany({ expense: expenseId });

    await ExpenseModel.findByIdAndDelete(expenseId);

    res.status(200).json({
      message: "Trosak je uspesno uklonjen",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom brisanja troska",
      error: error.message,
    });
  }
};
