const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { compare } = require("../security/encryptdecrypt.js");
const { generateToken } = require("../security/token.js");
const joi = require("joi");

router.post("/", validateRequest, async (req, res, next) => {
	try {
		let user = await User.findOne({ username: req.body.username });
		if(!user)
			return res.status(400).send({ Error: "Username exists or password is incorrect" });
		let isPasswordMatch = await compare(req.body.password, user.password);
		if(!isPasswordMatch)
			return res.status(400).send({ Error: "Username exists or password is incorrect" });
		let token = await generateToken({ username: req.body.username }, "***PRIVATE KEY***");
		return res.status(201).send({ Token: token });
	}
	catch(err)
	{
		console.log("Error in POST /session");
		next(err);
	}
});

const schema = joi.object().keys({
	username: joi.string().alphanum().min(8).required(),
	password: joi.string().alphanum().min(8).required()
});

async function validateRequest(req, res, next){
	try {
		await joi.validate(req, schema, { abortEarly: false });
		next();
	}
	catch(err)
	{
		console.log("Error validating");
		return res.status(400).send({ Error: err.details.map(x => x.message).join(",") });
	}
};

module.exports = router;