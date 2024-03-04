const UserModel = require("../Models/User");
const TransactionModel = require("../Models/Transaction");

exports.updateUserPhoto = async (req, res) => {
  try {
    let { userId, photoUrl } = req.query;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { photo: photoUrl },
      { new: true } //Mora kako bi se vratio nov dokument a ne stari
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "Korisnik nije pronadjen" });
    }

    res.status(200).json({
      message: "Slika je uspesno promenjena",
      status: "success",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom updejtovanja korisnika",
      error: error.message,
    });
  }
};

exports.addFriend = async (req, res) => {
  try {
    const userId = req.body.userId;
    const friendEmail = req.body.friendEmail;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Korisnik ne postoji" });
    }

    const friend = await UserModel.findOne({ email: friendEmail });
    if (!friend) {
      return res
        .status(404)
        .json({ message: "Korisnik sa ovim email-om ne postoji" });
    }

    if (
      user.friends.some((f) => f.friend.toString() === friend._id.toString())
    ) {
      return res.status(400).json({
        message: "Ovaj korisnik vec postoji u vasoj listi prijatelja",
      });
    }

    //OBOSTRANO PRIJATELJSTVO
    user.friends.push({ friend: friend._id, balance: 0 });
    friend.friends.push({ friend: user._id, balance: 0 });

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Prijatelj je uspesno dodat" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Greska na serveru" });
  }
};

exports.getFriendsPagination = async (req, res) => {
  try {
    let { userId, page, limit, sortBy, filter, ascDsc } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    let filters = JSON.parse(decodeURIComponent(filter));

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const count = user.friends.length;

    const userWithFriends = await UserModel.findById(userId)
      .populate({
        path: "friends.friend",
        match: filters,
        select: "photo name username email",
        options: {
          skip: skip,
          limit: limit,
        },
      })
      .exec();

    const friends = userWithFriends.friends
      .map((friend) => {
        if (friend.friend) {
          return {
            friend: {
              id: friend.friend._id,
              username: friend.friend.username,
              email: friend.friend.email,
              name: friend.friend.name,
              photo: friend.friend.photo,
            },
            balance: friend.balance,
          };
        } else {
          return null;
        }
      })
      .filter((friend) => friend !== null);

    if (sortBy) {
      const [key] = sortBy.split(":");
      friends.sort((a, b) => {
        if (a.friend[key] < b.friend[key]) {
          return ascDsc === "asc" ? -1 : 1;
        } else if (a.friend[key] > b.friend[key]) {
          return ascDsc === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    res.json({
      friends,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalUsers: Number(count),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const { userId } = req.query;
    const userWithFriends = await UserModel.findById(userId)
      .populate("friends.friend", "name username email photo")
      .exec();

    if (!userWithFriends) {
      return res.status(404).send({ message: "User not found" });
    }
    const friends = userWithFriends.friends.map((friend) => ({
      friend: {
        id: friend.friend._id,
        username: friend.friend.username,
        email: friend.friend.email,
        name: friend.friend.name,
        photo: friend.friend.photo,
      },
    }));

    res.send({ friends });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.query;
    console.log(userId, friendId);

    await UserModel.updateOne(
      { _id: userId },
      { $pull: { friends: { friend: friendId } } }
    );

    await UserModel.updateOne(
      { _id: friendId },
      { $pull: { friends: { friend: userId } } }
    );

    await TransactionModel.deleteMany({
      $or: [
        { settleFrom: userId, settleTo: friendId },
        { settleFrom: friendId, settleTo: userId },
      ],
    });

    res.status(200).json({
      status: "success",
      message: "Prijatelj je obrisan",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom brisanja prijatelja",
      error: error.message,
    });
  }
};
