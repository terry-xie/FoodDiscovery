const express = require("express");
const router = express.Router();
const User = require("../../../models/user.js");
const { compare } = require("../../../security/encryptdecrypt.js");
const { generateToken } = require("../../../security/token.js");
const joi = require("joi");
const sessionController = require("../../../controllers/sessionController.js");

router.post("/", validateRequest, sessionController.createSession);

const schema = joi.object().keys({
	username: joi.string().alphanum().min(8).required(),
	password: joi.string().alphanum().min(8).required()
});

async function validateRequest(req, res, next){
	try {
		await joi.validate(req.body, schema, { abortEarly: false });
		next();
	}
	catch(err)
	{
		console.log("Error validating");
		return res.status(400).send({ Error: err.details.map(x => x.message).join(",") });
	}
};

module.exports = router;