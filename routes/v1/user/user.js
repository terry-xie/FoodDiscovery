const express = require("express");
const router = express.Router();
const verifyRequestToken = require("../../../middleware/tokenValidation.js");
const authorizationValidation = require("../../../middleware/authorizationValidation.js");
const joi = require("joi");
const userController = require("../../../controllers/userController.js");

router.use("*", verifyRequestToken);
router.use("/:userId", authorizationValidation);

router.post("/", validateRequest, userController.createUser);
router.get("/", userController.getUser);
router.get("/:userId", userController.getUserById);
 
router.use("/:userId/preference", require("./preference"));
router.use("/:userId/generator", require("./generator"));

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