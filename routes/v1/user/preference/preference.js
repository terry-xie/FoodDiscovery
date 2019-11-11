const express = require("express");
const joi = require("joi");
const preferenceController = require("../../../../controllers/preferenceController.js");
const validateRequest = require("../../../../validation/validation.js");

const router = express.Router({ mergeParams: true });

const createPreferenceSchema = joi.object().keys({
  rating: joi.number().integer(),
  radius: joi.number().integer(),
  price: joi
    .number()
    .integer()
    .min(1)
    .max(4),
  location: joi.string().required()
});

const updatePreferenceSchema = joi.object().keys({
  rating: joi.number().integer(),
  radius: joi.number().integer(),
  price: joi
    .number()
    .integer()
    .min(1)
    .max(4),
  location: joi.string()
});

router.post(
  "/",
  validateRequest(createPreferenceSchema),
  preferenceController.createPreference
);

router.get("/", preferenceController.getPreference);

router.get("/:preferenceId", preferenceController.getPreferenceById);

router.patch(
  "/:preferenceId",
  validateRequest(updatePreferenceSchema),
  preferenceController.updatePreferenceById
);

router.delete("/:preferenceId", preferenceController.deletePreferenceById);

module.exports = router;
