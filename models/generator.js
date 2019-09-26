const mongoose = require("mongoose");

const Generator = mongoose.model(
  "Generator",
  new mongoose.Schema({
    limit: { type: Number, default: 1 },
    userId: mongoose.Types.ObjectId
    // TODO: add id reference to user
  })
);

module.exports = Generator;
