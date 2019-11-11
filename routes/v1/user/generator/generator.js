const express = require("express");
const joi = require("joi");
const validateRequest = require("../../../../validation/validation.js");
const generatorController = require("../../../../controllers/generatorController.js");

const router = express.Router({ mergeParams: true });

const createGeneratorSchema = joi.object().keys({
  limit: joi
    .number()
    .integer()
    .positive()
    .min(1)
});

const updateGeneratorSchema = joi.object().keys({
  limit: joi
    .number()
    .integer()
    .positive()
    .min(1)
});

router.post(
  "/",
  validateRequest(createGeneratorSchema),
  generatorController.createGenerator
);

router.get("/", generatorController.getGenerator);

router.get("/next", generatorController.getNext);

router.get("/:generatorId", generatorController.getGeneratorById);

router.patch(
  "/:generatorId",
  validateRequest(updateGeneratorSchema),
  generatorController.updateGeneratorById
);

router.delete("/:generatorId", generatorController.deleteGeneratorById);

module.exports = router;
