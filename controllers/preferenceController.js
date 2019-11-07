const Preference = require("../models/preference.js");

async function createPreference(req, res, next) {
  try {
    const preference = await Preference.create({
      rating: req.body.rating,
      distance: req.body.distance,
      price: req.body.price,
      location: req.body.location,
      userId: req.params.userId || res.locals.userId
    });
    return res.status(201).json(preference);
  } catch (err) {
    return next(err);
  }
}

async function getPreference(req, res, next) {
  try {
    const preferences = await Preference.find({
      userId: req.params.userId || res.locals.userId
    });
    return res.status(200).json(preferences);
  } catch (err) {
    return next(err);
  }
}

async function getPreferenceById(req, res, next) {
  try {
    const preference = await Preference.findById(req.params.preferenceId);
    return res.status(200).json(preference);
  } catch (err) {
    return next(err);
  }
}

async function updatePreferenceById(req, res, next) {
  try {
    const preference = await Preference.findByIdAndUpdate(
      req.params.preferenceId,
      {
        $set: {
          ...(req.body.rating && { rating: req.body.rating }),
          ...(req.body.distance && { distance: req.body.distance }),
          ...(req.body.price && { price: req.body.price }),
          ...(req.body.location && { location: req.body.location })
        }
      },
      { new: true }
    );
    return res.status(200).json(preference);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getPreference,
  getPreferenceById,
  createPreference,
  updatePreferenceById
};
