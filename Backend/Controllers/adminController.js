const UserModel = require("../Models/User");
const GroupModel = require("../Models/Group");
const ExpenseModel = require("../Models/Expense");
const TransactionModel = require("../Models/Transaction");

exports.getAllUsers = async (req, res) => {
  const { page, limit, sortBy, filter, ascDsc } = req.query;

  let filters = JSON.parse(decodeURIComponent(filter));

  let sortOrder = ascDsc === "dsc" ? -1 : 1;

  try {
    const users = await UserModel.find(filters)
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await UserModel.countDocuments(filters);

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalUsers: Number(count),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const user = await UserModel.findById(userId);

    if (user && user.role === "admin") {
      return res.status(403).json({
        status: "fail",
        message: "Korisnici koji su admin ne mogu biti obrisani.",
      });
    }

    await UserModel.findByIdAndDelete(userId);

    await GroupModel.updateMany(
      {}, // Obuhvata sve dokumente
      { $pull: { members: { member: userId } } }
    );

    await UserModel.updateMany(
      { "friends.friend": userId },
      { $pull: { friends: { friend: userId } } }
    );

    await ExpenseModel.deleteMany({
      $or: [{ paidby: userId }, { members: userId }],
    });

    await TransactionModel.deleteMany({
      $or: [{ settleFrom: userId }, { settleTo: userId }],
    });

    res.status(200).json({
      status: "success",
      message: "Korisnik je uspesno obrisan dodata",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom brisanja korisnika",
      error: error.message,
    });
  }
};
