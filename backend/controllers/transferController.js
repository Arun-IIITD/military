const Transfer = require("../models/Transfer");
const Equipment = require("../models/Equipment");
const Base = require("../models/Base");

exports.createTransfer = async (req, res) => {
  try {

    const { equipment, fromBase, toBase, quantity } = req.body;
    console.log(req.body)

    if (!equipment || !fromBase || !toBase || !quantity) {
      return res.status(400).json({ message: "All fields required" });
    }

    const equipmentDoc = await Equipment.findOne({ name: equipment });

    if (!equipmentDoc) {
      return res.status(400).json({ message: "Equipment not found" });
    }

    let fromBaseDoc = await Base.findOne({ name: fromBase });

    if (!fromBaseDoc) {
      fromBaseDoc = new Base({ name: fromBase });
      await fromBaseDoc.save();
    }

    let toBaseDoc = await Base.findOne({ name: toBase });

    if (!toBaseDoc) {
      toBaseDoc = new Base({ name: toBase });
      await toBaseDoc.save();
    }

    const transfer = new Transfer({
      equipment: equipmentDoc._id,
      fromBase: fromBaseDoc._id,
      toBase: toBaseDoc._id,
      quantity
    });

    await transfer.save();

    res.json({
      message: "Transfer successful",
      transfer
    });

  } catch (err) {
    console.error("Create Transfer Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer
      .find()
      .populate("equipment")
      .populate("fromBase")
      .populate("toBase");

    res.json(transfers);
  } catch (err) {
    console.error("Get Transfers Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};