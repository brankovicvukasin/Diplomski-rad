const express = require("express");
const authenticationController = require("../Controllers/authenticationController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("./OAuth2");

const router = express.Router();

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

/*GOOGLE-AUTH*/
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }) //Scope odredjuje cemu hocemo da pristupimo
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/failure",
  }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const token = createToken(req.user._id);

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3600 * 1000 * 24 * 3),
        httpOnly: true,
        sameSite: "none",
        secure: "false",
      });
      res.redirect("http://localhost:5173/googleAuth");
    } else {
      res.redirect("/api/auth/failure");
    }
  }
);

router.get("/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

router.post("/login", authenticationController.login);
router.post("/logout", authenticationController.logout);
router.post("/registration", authenticationController.registration);
router.post("/validatejwt", authenticationController.validate);

module.exports = router;
