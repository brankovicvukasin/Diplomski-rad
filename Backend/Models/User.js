const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Molimo vas unesite vaš username!"],
  },
  googleId: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Molimo vas unesite vaše ime i prezime"],
  },
  email: {
    type: String,
    required: [true, "Molimo vas unesite vaš imejl"],
    unique: [true, "Zao nam je ali ovaj imejl već postoji"],
    lowercase: true,
    validate: [validator.isEmail, "Molimo vas unesite validan imejl"],
  },
  password: {
    type: String,
    required: [true, "Molimo vas unesite šifru"],
    select: false,
    minlength: 4,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  photo: {
    type: String,
    default: "https://api.dicebear.com/7.x/adventurer/svg?seed=Midnight",
  },
  friends: [
    {
      friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      balance: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual populate
userSchema.virtual("groups", {
  ref: "Group",
  foreignField: "members.member",
  localField: "_id",
});

userSchema.virtual("expenses", {
  ref: "Expense",
  foreignField: "members",
  localField: "_id",
});

userSchema.virtual("expensePaid", {
  ref: "Expense",
  foreignField: "paidby",
  localField: "_id",
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
