const mongoose = require("mongoose");

const Generator = mongoose.model("Generator", new mongoose.Schema({
    limit: { type: Number, default: 1 },
    userId: mongoose.Types.ObjectId
    //id reference to user
}));

module.exports = Generator;