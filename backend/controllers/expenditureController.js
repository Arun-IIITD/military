const Expenditure = require("../models/Expenditure");
const Equipment = require("../models/Equipment");
const Base = require("../models/Base");

exports.createExpenditure = async (req, res) => {
  try {
    const { equipment, base, quantity, reason } = req.body;

    // --- Find or create Equipment ---
    let equipmentDoc = await Equipment.findOne({ name: equipment });
    if (!equipmentDoc) {
      // If equipment doesn't exist, create it
      equipmentDoc = new Equipment({ name: equipment });
      await equipmentDoc.save();
    }

    // --- Find or create Base ---
    let baseDoc = await Base.findOne({ name: base });
    if (!baseDoc) {
      baseDoc = new Base({ name: base });
      await baseDoc.save();
    }

    // --- Create Expenditure ---
    const expenditure = new Expenditure({
      equipment: equipmentDoc._id,
      base: baseDoc._id,
      quantity,
      reason
    });

    await expenditure.save();

    res.json({
      message: "Expenditure logged",
      expenditure
    });

  } catch (err) {
    console.error("Create Expenditure Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getExpenditures = async (req, res) => {
  try {
    const expenditures = await Expenditure
      .find()
      .populate("equipment")
      .populate("base");

    res.json(expenditures);
  } catch (err) {
    console.error("Get Expenditures Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};