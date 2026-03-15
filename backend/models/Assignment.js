const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({

  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment"
  },

  base: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Base"
  },

  personnel: {
    type: String,
    required: true
},

   quantity: {
        type: Number,
        required: true
    },

  assignedDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Assignment", assignmentSchema);