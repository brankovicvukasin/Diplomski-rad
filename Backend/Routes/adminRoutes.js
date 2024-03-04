const express = require("express");
const authenticationController = require("../Controllers/authenticationController");
const adminController = require("../Controllers/adminController");

const router = express.Router();

router
  .route("/allUsers")
  .get(
    authenticationController.protect,
    authenticationController.restrict("admin"),
    adminController.getAllUsers
  );

router
  .route("/deleteUser")
  .delete(
    authenticationController.protect,
    authenticationController.restrict("admin"),
    adminController.deleteUser
  );

module.exports = router;
