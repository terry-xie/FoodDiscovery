const express = require("express");
const joi = require("joi");
const userController = require("../../../controllers/userController.js");
const verifyRequestToken = require("../../../middleware/tokenValidation.js");
const validateRequest = require("../../../validation/validation.js");

const router = express.Router();

const updateMeSchema = joi.object().keys({
  password: joi
    .string()
    .alphanum()
    .min(8)
});

router.get("/", verifyRequestToken, userController.getUser);

router.patch(
  "/",
  verifyRequestToken,
  validateRequest(updateMeSchema),
  userController.updateUserById
);

router.use("/generator", verifyRequestToken, require("../user/generator"));

router.use("/preference", verifyRequestToken, require("../user/preference"));

module.exports = router;
