const mongoose = require("mongoose");

const expenditureSchema = new mongoose.Schema({

  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment"
  },

  base: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Base"
  },

    quantity: {
        type: Number,
        required: true
    },

  // reason: {
  //   type: String,
  //   required: true
  // },

  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Expenditure", expenditureSchema);