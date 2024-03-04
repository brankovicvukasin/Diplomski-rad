const { promisify } = require("util"); //Vadi promisify destructuring
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

/*KREIRANJE TOKENA*/
const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

/*AUNTENTIKACIJA*/
exports.protect = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return next(new Error("Niste ulogovani, nemate token", 401));
    }
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new Error("Korisnik sa datim tokenom ne postoji", 401));
    }
    req.user = currentUser;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: "Greska prilikom autentikacije",
      error: error.message,
    });
  }
};

/*AUTORIZACIJA*/
exports.restrict =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error("Nemas dozvolu za ovo", 403));
    }
    next();
  };

/*REGISTRACIJA*/
exports.registration = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = createToken(newUser._id);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 3),
      httpOnly: true,
      sameSite: "none",
      secure: "false",
    });

    newUser.password = undefined;
    res.status(200).json({
      status: "success",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Greska prilikom registracije",
      error: error.message,
    });
  }
};

/*LOGIN*/
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new Error("Molimo vas unesite email i sifru!"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || user.password !== password) {
      return next(new Error("Netacan email i sifra"));
    }
    user.password = undefined;

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 3),
      httpOnly: true,
      sameSite: "none",
      secure: "false",
    });

    res.status(200).json({
      status: "success",
      token,
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: "Greska tokom prijavljivanja",
      error: error.message,
    });
  }
};

/*LOGOUT*/
exports.logout = (req, res, next) => {
  try {
    res.cookie("jwt", "logout", {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: "false",
    });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: "Greska tokom prijavljivanja",
      error: error.message,
    });
  }
};

//validacija tokena
exports.validate = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      return next(new Error("Korisnik sa datim tokenom ne postoji", 401));
    }
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new Error("Korisnik sa datim tokenom ne postoji", 401));
    }

    res.status(200).json({
      status: "success",
      user: currentUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: "Greska prilikom logout-a",
      error: error.message,
    });
  }
};
