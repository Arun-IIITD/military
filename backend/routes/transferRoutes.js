const express = require("express");
const router = express.Router();

const transferController = require("../controllers/transferController");

const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// Create transfer
router.post(
  "/",
  authMiddleware,
  authorize(["ADMIN", "LOGISTICS_OFFICER"]),
  transferController.createTransfer
);

// Transfer history
router.get(
  "/",
  authMiddleware,
  authorize(["ADMIN", "LOGISTICS_OFFICER", "BASE_COMMANDER"]),
  transferController.getTransfers
);

module.exports = router;