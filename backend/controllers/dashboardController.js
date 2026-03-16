const mongoose = require("mongoose");
const Purchase = require("../models/Purchase");
const Transfer = require("../models/Transfer");
const Assignment = require("../models/Assignment");
const Expenditure = require("../models/Expenditure");

exports.getDashboard = async (req, res) => {
  try {
    const baseId = req.query.base ? mongoose.Types.ObjectId(req.query.base) : null;

    // if (!baseId) {
    //   return res.status(400).json({ message: "Base is required for dashboard" });
    // }

    const matchBase = baseId ? { base: baseId } : {};
    const openingBalance = 100;

    // Purchases for the base
    const purchases = await Purchase.aggregate([
      { $match: baseId ? { base: baseId } : {} },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]);

    //transfer in
    const transferIn = baseId
  ? await Transfer.aggregate([
      { $match: { toBase: baseId } },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ])
  : [{ total: 0 }];


  //transfer out
const transferOut = baseId
  ? await Transfer.aggregate([
      { $match: { fromBase: baseId } },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ])
  : [{ total: 0 }];

  

    // Assigned assets
    const assigned = await Assignment.aggregate([
      baseId ? { $match: { base: baseId } } : { $match: {} },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]);

    // Expended assets
    const expended = await Expenditure.aggregate([
      baseId ? { $match: { base: baseId } } : { $match: {} },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]);

    const purchaseTotal = purchases[0]?.total || 0;
    const transferInTotal = transferIn[0]?.total || 0;
    const transferOutTotal = transferOut[0]?.total || 0;
    const assignedTotal = assigned[0]?.total || 0;
    const expendedTotal = expended[0]?.total || 0;

    const closingBalance =
      openingBalance +
      purchaseTotal +
      transferInTotal -
      transferOutTotal -
      assignedTotal -
      expendedTotal;
    

    res.json({
      openingBalance,
      purchases: purchaseTotal,
      transferIn: transferInTotal,
      transferOut: transferOutTotal,
      assigned: assignedTotal,
      expended: expendedTotal,
      closingBalance

    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};