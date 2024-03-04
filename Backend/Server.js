const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const app = express();

dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Rute
const authRoute = require("./Routes/authRoutes");
const adminRoute = require("./Routes/adminRoutes");
const userRoute = require("./Routes/userRoutes");

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
