const Preference = require("../models/preference.js");

async function createPreference(req, res, next) {
  try {
    const preference = await Preference.create({
      rating: req.body.rating,
      distance: req.body.distance,
      price: req.body.price,
      location: req.body.location,
      userId: req.params.userId
    });
    return res.status(201).send(preference);
  } catch (err) {
    console.log("Error in POST ../preference");
    return next(err);
  }
}

async function getPreference(req, res, next) {
  try {
    const preferences = await Preference.find({});
    return res.status(200).send(preferences);
  } catch (err) {
    console.log("Error in GET ../preference");
    return next(err);
  }
}

async function getPreferenceById(req, res, next) {
  try {
    const preference = await Preference.findById(req.params.preferenceId);
    return res.status(200).send(preference);
  } catch (err) {
    console.log("Error in GET ../preference/:preferenceId");
    return next(err);
  }
}

// TODO: create update method

module.exports = {
  getPreference,
  getPreferenceById,
  createPreference
};
