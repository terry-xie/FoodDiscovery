const express = require("express");
const router = express.Router({mergeParams: true});
const Preference = require("../../../../models/preference.js");
//const joi = require("joi");
const preferenceController = require("../../../../controllers/preferenceController.js");

router.post("/", preferenceController.createPreference);

router.get("/", preferenceController.getPreference);

router.get("/:preferenceId", preferenceController.getPreferenceById);

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