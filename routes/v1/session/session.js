const express = require("express");
const joi = require("joi");
const sessionController = require("../../../controllers/sessionController.js");

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
  } catch (err) {
    return res
      .status(400)
      .send({ Error: err.details.map(x => x.message).join(",") });
  }
  return next();
}

router.post("/", validateRequest, sessionController.createSession);

module.exports = router;
