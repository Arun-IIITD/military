const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
    equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment"
    },

    fromBase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Base"
  },

  toBase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Base"
  },

  quantity: {
    type: Number,
    required: true
  },

  transferDate: {
    type: Date,
    default: Date.now
  }



})

module.exports  = mongoose.model("Transfer", transferSchema)