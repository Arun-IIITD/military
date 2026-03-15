const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({

    equipment:{
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

    purchaseDate: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

module.exports = mongoose.model("Purchase",purchaseSchema)