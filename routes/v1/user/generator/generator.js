const express = require("express");
const router = express.Router({mergeParams: true});
const generatorController = require("../../../../controllers/generatorController.js");

router.get("/next", generatorController.next);

router.get("/", generatorController.getGenerator);

//router.get("/:generatorId", generatorController.getGeneratorById);

router.post("/", generatorController.createGenerator);

module.exports = router;