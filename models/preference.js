const mongoose = require("mongoose");

const Preference = mongoose.model(
  "Preference",
  new mongoose.Schema({
    distance: Number,
    price: Number,
    location: String,
    userId: mongoose.Types.ObjectId
  })
);

module.exports = Preference;
