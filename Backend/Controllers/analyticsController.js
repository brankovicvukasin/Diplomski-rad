const { listeners, listenerCount } = require("../Models/Expense");
const UserModel = require("../Models/User");

exports.getExpenseCategoryAnalytics = async (req, res) => {
  try {
    let { userId } = req.query;

    const userWithExpenses = await UserModel.findById(userId)
      .populate({
        path: "expenses",
        select: "category expenseAmount everyonesPart",
      })
      .exec();

    if (!userWithExpenses) {
      return res.status(404).send({ message: "Korisnik nije pronadjen" });
    }

    const expenseSummary = {};

    userWithExpenses.expenses.forEach((expense) => {
      if (expenseSummary[expense.category]) {
        expenseSummary[expense.category] += expense.everyonesPart;
      } else {
        expenseSummary[expense.category] = expense.everyonesPart;
      }
    });

    let counter = 0;
    let formattedData = [["Category", "Expense Amount"]];

    for (const [category, amount] of Object.entries(expenseSummary)) {
      formattedData.push([category, amount]);
      counter++;
    }
    if (counter === 0) formattedData = null;
    res.status(200).json({
      status: "success",
      data: formattedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom pribavljanja analitike",
      error: error.message,
    });
  }
};

exports.getNegativeDebtAnalytics = async (req, res) => {
  try {
    let { userId } = req.query;
    const user = await UserModel.findById(userId).populate("friends.friend");

    if (!user) {
      return res.status(404).send({ message: "Korisnik nije pronadjen" });
    }

    let data = [["Prijatelj", "Dugovanje"]];

    let counter = 0;

    user.friends.forEach((friend) => {
      if (friend.balance < 0) {
        const friendName = friend.friend.username;
        const balance = Math.abs(friend.balance.toFixed(2));
        data.push([friendName, balance]);
        counter++;
      }
    });

    if (counter === 0) data = null;

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom pribavljanja analitike",
      error: error.message,
    });
  }
};

exports.getPositiveDebtAnalytics = async (req, res) => {
  try {
    let { userId } = req.query;
    const user = await UserModel.findById(userId).populate("friends.friend");

    if (!user) {
      return res.status(404).send({ message: "Korisnik nije pronadjen" });
    }

    let data = [["Prijatelj", "Dugovanje"]];

    let counter = 0;

    user.friends.forEach((friend) => {
      if (friend.balance > 0) {
        const friendName = friend.friend.username;
        const balance = Math.abs(friend.balance.toFixed(2));
        data.push([friendName, balance]);
        counter++;
      }
    });

    if (counter === 0) data = null;

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom pribavljanja analitike",
      error: error.message,
    });
  }
};

exports.getGroupsAnalytics = async (req, res) => {
  try {
    let { userId } = req.query;

    const userWithGroups = await UserModel.findById(userId)
      .populate({
        path: "groups",
        select: "name members totalSpending",
        populate: { path: "members.member" },
      })
      .exec();

    if (!userWithGroups) {
      return res.status(404).send({ message: "Korisnik nije pronadjen" });
    }

    let data = [["Grupe", "Ukupno", "Ja platio", "Ostali platili"]];

    let counter = 0;

    userWithGroups.groups.forEach((group) => {
      let totalPaidByUser = 0;
      let totalPaidByOthers = 0;

      group.members.forEach((member) => {
        if (member.member._id.toString() === userId) {
          totalPaidByUser += member.amountPaid;
        } else {
          totalPaidByOthers += member.amountPaid;
        }
      });

      data.push([
        group.name,
        group.totalSpending,
        totalPaidByUser,
        totalPaidByOthers,
      ]);

      counter++;
    });
    if (counter === 0) data = null;

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom pribavljanja analitike",
      error: error.message,
    });
  }
};
