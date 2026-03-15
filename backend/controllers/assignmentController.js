const Assignment = require("../models/Assignment");
const Equipment = require("../models/Equipment");
const Base = require("../models/Base");

exports.createAssignment = async (req, res) => {
  try {
    const { equipment, base, personnel, quantity } = req.body;

    // --- Find Equipment ---
    const equipmentDoc = await Equipment.findOne({ name: equipment });
    if (!equipmentDoc) {
      return res.status(400).json({ message: "Equipment not found" });
    }

    // --- Find Base ---
    let baseDoc = await Base.findOne({ name: base });
    if (!baseDoc) {
      // If base doesn't exist, create it
      baseDoc = new Base({ name: base });
      await baseDoc.save();
    }

    // --- Create Assignment ---
    const assignment = new Assignment({
      equipment: equipmentDoc._id,
      base: baseDoc._id,
      personnel,
      quantity
    });

    await assignment.save();

    res.json({
      message: "Asset assigned",
      assignment
    });

  } catch (err) {
    console.error("Create Assignment Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment
      .find()
      .populate("equipment")
      .populate("base");

    res.json(assignments);
  } catch (err) {
    console.error("Get Assignments Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};