const express = require("express");
const joi = require("joi");
const verifyRequestToken = require("../../../middleware/tokenValidation.js");
const authorizationValidation = require("../../../middleware/authorizationValidation.js");
const userController = require("../../../controllers/userController.js");
const validateRequest = require("../../../validation/validation.js");

const router = express.Router();

const createUserSchema = joi.object().keys({
  username: joi
    .string()
    .alphanum()
    .min(8)
    .required(),
  password: joi
    .string()
    .alphanum()
    .min(8)
    .required()
});

const updateUserSchema = joi.object().keys({
  username: joi
    .string()
    .alphanum()
    .min(8),
  password: joi
    .string()
    .alphanum()
    .min(8)
});

router.post("/", validateRequest(createUserSchema), userController.createUser);

router.get("/", verifyRequestToken, userController.getUser);

router.get(
  "/:userId",
  verifyRequestToken,
  authorizationValidation,
  userController.getUserById
);

router.patch(
  "/:userId",
  verifyRequestToken,
  authorizationValidation,
  validateRequest(updateUserSchema),
  userController.updateUserById
);

router.use(
  "/:userId/preference",
  verifyRequestToken,
  authorizationValidation,
  require("./preference")
);

router.use(
  "/:userId/generator",
  verifyRequestToken,
  authorizationValidation,
  require("./generator")
);

module.exports = router;
