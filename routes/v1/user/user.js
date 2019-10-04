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
    return res
      .status(400)
      .send({ Error: err.details.map(x => x.message).join(",") });
  }
}

router.post("/", validateRequest, userController.createUser);

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
