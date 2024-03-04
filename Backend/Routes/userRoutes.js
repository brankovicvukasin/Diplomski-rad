const express = require("express");
const authenticationController = require("../Controllers/authenticationController");
const friendController = require("../Controllers/friendController");
const groupController = require("../Controllers/groupController");
const expenseController = require("../Controllers/expenseController");
const analyticsController = require("../Controllers/analyticsController");

const router = express.Router();

router.get(
  "/analyticsCategory",
  authenticationController.protect,
  analyticsController.getExpenseCategoryAnalytics
);

router.get(
  "/analyticsDebtNegative",
  authenticationController.protect,
  analyticsController.getNegativeDebtAnalytics
);

router.get(
  "/analyticsDebtPositive",
  authenticationController.protect,
  analyticsController.getPositiveDebtAnalytics
);

router.get(
  "/groupsAnalytics",
  authenticationController.protect,
  analyticsController.getGroupsAnalytics
);

router.get(
  "/expenseLocations",
  authenticationController.protect,
  expenseController.getExpenseLocations
);

router
  .route("/photoChange")
  .put(authenticationController.protect, friendController.updateUserPhoto);

router
  .route("/friends")
  .get(authenticationController.protect, friendController.getFriendsPagination)
  .post(authenticationController.protect, friendController.addFriend)
  .delete(authenticationController.protect, friendController.removeFriend);

router
  .route("/friendsForm")
  .get(authenticationController.protect, friendController.getFriends);

router
  .route("/group")
  .get(authenticationController.protect, groupController.getGroupsPagination)
  .post(authenticationController.protect, groupController.addGroup)
  .delete(
    authenticationController.protect,
    groupController.removeUserFromGroup
  );

router
  .route("/groupForm")
  .get(authenticationController.protect, groupController.getGroups);

router
  .route("/expense")
  .get(authenticationController.protect, expenseController.getExpensePagination)
  .post(authenticationController.protect, expenseController.addExpense)
  .delete(authenticationController.protect, expenseController.deleteExpense);

module.exports = router;
