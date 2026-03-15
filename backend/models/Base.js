const mongoose = require("mongoose");

const baseSchema = new mongoose.Schema({
    name:{

        type: String,
        required: true,
        unique:true
    },
})


module.exports = mongoose.model("Base", baseSchema)

