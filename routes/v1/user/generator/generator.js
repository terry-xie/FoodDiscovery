const express = require("express");
const joi = require("joi");
const validateRequest = require("../../../../validation/validation.js");
const generatorController = require("../../../../controllers/generatorController.js");

const router = express.Router({ mergeParams: true });

const createGeneratorSchema = joi.object().keys({
  limit: joi.number()
});

router.get("/next", generatorController.getNext);

router.get("/", generatorController.getGenerator);

// TODO: update generator route

router.post(
  "/",
  validateRequest(createGeneratorSchema),
  generatorController.createGenerator
);

module.exports = router;
