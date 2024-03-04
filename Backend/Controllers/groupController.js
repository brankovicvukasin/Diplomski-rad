const GroupModel = require("../Models/Group");
const UserModel = require("../Models/User");

exports.addGroup = async (req, res) => {
  try {
    const { userId, name, description, category, members } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Korisnik ne postoji" });
    }
    if (!name) {
      return res.status(404).json({ message: "Niste uneli ime grupe" });
    }
    if (!description) {
      return res.status(404).json({ message: "Niste uneli opis grupe" });
    }
    if (!category) {
      return res.status(404).json({ message: "Niste uneli kategoriju grupe" });
    }

    if (!members.includes(userId)) {
      members.push(userId);
    }

    const membersWithAmoutPaid = members.map((memberId) => ({
      member: memberId,
      amountPaid: 0,
    }));

    const newGroup = await GroupModel.create({
      name,
      category,
      description,
      members: membersWithAmoutPaid,
    });

    for (let memberId of members) {
      const member = await UserModel.findById(memberId);

      for (let otherMemberId of members) {
        if (memberId.toString() !== otherMemberId.toString()) {
          const isFriend = member.friends.some(
            (friend) => friend.friend.toString() === otherMemberId.toString()
          );

          if (!isFriend) {
            member.friends.push({ friend: otherMemberId });
          }
        }
      }

      await member.save();
    }

    res.status(200).json({
      message: "Grupa je uspesno dodata",
      status: "success",
      group: newGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom kreiranje grupe",
      error: error.message,
    });
  }
};

exports.getGroupsPagination = async (req, res) => {
  try {
    let { userId, page, limit, sortBy, filter, ascDsc } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    let filters = JSON.parse(decodeURIComponent(filter));

    let sortOrder = ascDsc === "dsc" ? -1 : 1;

    const userWithGroups = await UserModel.findById(userId)
      .populate({
        path: "groups",
        match: filters,
        select: "name description category members totalSpending",
        options: {
          skip: skip,
          limit: limit,
          sort: { [sortBy]: sortOrder },
        },
        populate: {
          path: "members.member",
          select: "username photo",
        },
      })
      .exec();

    if (!userWithGroups) {
      return res.status(404).send({ message: "Korisnik nije pronadjen" });
    }

    const zbogPaginacije = await UserModel.findById(userId)
      .populate({
        path: "groups",
        match: filters,
        select: "name description category members totalSpending",
      })
      .exec();

    const totalGroups = zbogPaginacije.groups.length;

    res.status(200).json({
      groups: userWithGroups.groups,
      currentPage: page,
      totalPages: Math.ceil(totalGroups / limit),
      totalGroups,
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom pribavljanja grupa",
      error: error.message,
    });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const { userId } = req.query;

    const userWithGroups = await UserModel.findById(userId)
      .populate({
        path: "groups",
        select: "name ",
        populate: {
          path: "members.member",
          select: "username photo",
        },
      })
      .exec();

    res.status(200).json({
      groups: userWithGroups.groups,
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom pribavljanja grupa",
      error: error.message,
    });
  }
};

exports.removeUserFromGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.query;
    console.log(groupId, userId);
    const group = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).send("Grupa nije pronadjena");
    }

    group.members = group.members.filter(
      (member) => !member.member.equals(userId)
    );

    if (group.members.length === 0) {
      await GroupModel.findByIdAndDelete(groupId);
      return res.send("Grupa je obrisana jer nema vise clanova");
    }

    await group.save();

    res.status(201).json({
      status: "success",
      message: "Korisnik je uspesno napustio grupu",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom napustanja grupe",
      error: error.message,
    });
  }
};
