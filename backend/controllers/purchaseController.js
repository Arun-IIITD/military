const Purchase = require("../models/Purchase");
const Equipment = require("../models/Equipment"); 
const Base = require("../models/Base");

exports.createPurchase = async (req, res) => {
  try {
    const { equipment, base, quantity } = req.body;
    const { id: userId, base: userBase } = req.user;

    // --- Handle Equipment ---
    let equipmentDoc = await Equipment.findOne({ name: equipment });
    if (!equipmentDoc) {
      equipmentDoc = new Equipment({ name: equipment });
      await equipmentDoc.save();
    }

    // --- Handle Base ---
    let baseDoc;
    if (userBase) {
      // Use user's assigned base
      baseDoc = await Base.findById(userBase);
      if (!baseDoc) {
        return res.status(400).json({ message: "Assigned base not found" });
      }
    } else {
      // Use provided base name
      baseDoc = await Base.findOne({ name: base });
      if (!baseDoc) {
        // Create base if it doesn't exist
        baseDoc = new Base({ name: base });
        await baseDoc.save();
      }
    }

    // --- Create Purchase ---
    const purchase = new Purchase({
      equipment: equipmentDoc._id,
      base: baseDoc._id,
      quantity,
      createdBy: userId
    });

    await purchase.save();

    res.json({
      message: "Purchase recorded",
      purchase
    });

  } catch (err) {
    console.error("Create Purchase Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase
      .find()
      .populate("equipment")
      .populate("base")
      .populate("createdBy");

    res.json(purchases);
  } catch (err) {
    console.error("Get Purchases Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};