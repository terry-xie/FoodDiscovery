const express = require("express");
const preferenceController = require("../../../../controllers/preferenceController.js");

const router = express.Router({ mergeParams: true });

router.post("/", preferenceController.createPreference);

router.get("/", preferenceController.getPreference);

router.get("/:preferenceId", preferenceController.getPreferenceById);

router.patch("/:preferenceId", preferenceController.updatePreferenceById);

// TODO: add validation

module.exports = router;
