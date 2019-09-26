const express = require("express");
const joi = require("joi");
const verifyRequestToken = require("../../../middleware/tokenValidation.js");
const authorizationValidation = require("../../../middleware/authorizationValidation.js");
const userController = require("../../../controllers/userController.js");

const router = express.Router();

const schema = joi.object().keys({
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

async function validateRequest(req, res, next) {
  try {
    await joi.validate(req.body, schema, { abortEarly: false });
    return next();
  } catch (err) {
    console.log("Error validating");
    return res
      .status(400)
      .send({ Error: err.details.map(x => x.message).join(",") });
  }
}

router.use("*", verifyRequestToken);
router.use("/:userId", authorizationValidation);

router.post("/", validateRequest, userController.createUser);
router.get("/", userController.getUser);
router.get("/:userId", userController.getUserById);

router.use("/:userId/preference", require("./preference"));
router.use("/:userId/generator", require("./generator"));

module.exports = router;
