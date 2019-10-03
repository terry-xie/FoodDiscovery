const express = require("express");
const userController = require("../../../controllers/userController.js");
const verifyRequestToken = require("../../../middleware/tokenValidation.js");

const router = express.Router();

router.get("/", verifyRequestToken, userController.getUser);

router.use("/generator", verifyRequestToken, require("../user/generator"));

router.use("/preference", verifyRequestToken, require("../user/preference"));

module.exports = router;
