const Preference = require("../models/preference.js");

function toResponseObj(obj) {
  return {
    id: obj._id,
    radius: obj.radius,
    price: obj.price,
    location: obj.location,
    userId: obj.userId
  };
}

async function createPreference(req, res, next) {
  try {
    let preference = await Preference.find({
      userId: req.params.userId || res.locals.userId
    });

    if (preference)
      res
        .status(403)
        .json({ error: "A preference already exists for the user" });

    preference = await Preference.create({
      radius: req.body.radius,
      price: req.body.price,
      location: req.body.location,
      userId: req.params.userId || res.locals.userId
    });
    return res.status(201).json(toResponseObj(preference));
  } catch (err) {
    return next(err);
  }
}

async function getPreference(req, res, next) {
  try {
    let preferences = await Preference.find({
      userId: req.params.userId || res.locals.userId
    });
    preferences = preferences.map(preference => {
      return toResponseObj(preference);
    });
    return res.status(200).json({ preferences });
  } catch (err) {
    return next(err);
  }
}

async function getPreferenceById(req, res, next) {
  try {
    const preference = await Preference.findById(req.params.preferenceId);
    if (!preference)
      return res.status(404).json({ error: "Preference not found" });
    return res.status(200).json(toResponseObj(preference));
  } catch (err) {
    return next(err);
  }
}

async function updatePreferenceById(req, res, next) {
  try {
    const preference = await Preference.findOneAndUpdate(
      {
        _id: req.params.preferenceId,
        userId: req.params.userId || res.locals.userId
      },
      {
        $set: {
          ...(req.body.radius && { radius: req.body.radius }),
          ...(req.body.price && { price: req.body.price }),
          ...(req.body.location && { location: req.body.location })
        }
      },
      { new: true }
    );

    if (!preference)
      return res.status(404).json({ error: "Preference not found" });

    return res.status(200).json(toResponseObj(preference));
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
