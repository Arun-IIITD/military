const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");

// All logged in users can view dashboard
router.get("/", authMiddleware, dashboardController.getDashboard);

module.exports = router;