const express = require("express");
const router = express.Router();

const purchaseController = require("../controllers/purchaseController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// Create purchase
router.post(
  "/",
  authMiddleware,
  authorize(["ADMIN", "LOGISTICS_OFFICER"]),
  purchaseController.createPurchase
);

// Get purchase history
router.get(
  "/",
  authMiddleware,
  authorize(["ADMIN", "LOGISTICS_OFFICER", "BASE_COMMANDER"]),
  purchaseController.getPurchases
);

module.exports = router;