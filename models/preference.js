const mongoose = require("mongoose");

const Preference = mongoose.model(
  "Preference",
  new mongoose.Schema({
    radius: Number,
    price: Number,
    location: String,
    userId: mongoose.Types.ObjectId
  })
);

module.exports = Preference;
