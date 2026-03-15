const express = require("express");
const router = express.Router();

const expenditureController = require("../controllers/expenditureController");

const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// Log expenditure
router.post(
  "/",
  authMiddleware,
  authorize(["ADMIN", "BASE_COMMANDER"]),
  expenditureController.createExpenditure
);

// View expenditure history
router.get(
  "/",
  authMiddleware,
  // authorize(["ADMIN", "BASE_COMMANDER"]),
  expenditureController.getExpenditures
);

module.exports = router;