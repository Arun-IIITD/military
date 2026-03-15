const express = require("express");
const router = express.Router();

const assignmentController = require("../controllers/assignmentController");

const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// Assign assets
router.post(
  "/",
  authMiddleware,
  authorize(["ADMIN", "BASE_COMMANDER"]),
  assignmentController.createAssignment
);

// Get assignment history
router.get(
  "/",
  authMiddleware,
  // authorize(["ADMIN", "BASE_COMMANDER"]),
  assignmentController.getAssignments
);

module.exports = router;