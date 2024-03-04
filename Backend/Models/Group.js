const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Obavezno ime grupe"],
  },
  category: {
    type: String,
    required: [true, "Obavezna kategorija grupe"],
  },
  description: {
    type: String,
    required: [true, "Obavezan opis grupe"],
  },
  members: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      amountPaid: {
        type: Number,
        default: 0,
      },
    },
  ],
  totalSpending: {
    type: Number,
    default: 0,
  },
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
