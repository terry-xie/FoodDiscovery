const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { hash } = require("../security/encryptdecrypt.js");
const verifyRequestToken = require("../middleware/tokenvalidation.js");
const joi = require("joi");

router.post("/", validateRequest, async (req, res, next) => {
	try {
		let user = await User.findOne({ username: req.body.username });
		if(user)
			return res.status(400).send("User Exists");
		let hashedPassword = await hash(req.body.password, 10);
		user = await User.create({ username: req.body.username, password: hashedPassword });
		return res.status(201).send({ username: req.body.username });
	}
	catch(err) {
		console.log("Error in POST /user");
		next(err);
	}
});

router.get("/", verifyRequestToken, async (req, res, next) => {
	try {
		let users = await User.find({}, "username");
		return res.status(200).send(users);
	}
	catch(err) {
		console.log("Error in GET /user");
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
