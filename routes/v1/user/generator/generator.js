const express = require("express");
const generatorController = require("../../../../controllers/generatorController.js");

const router = express.Router({ mergeParams: true });

router.get("/next", generatorController.getNext);

router.get("/", generatorController.getGenerator);

// router.get("/:generatorId", generatorController.getGeneratorById);

router.post("/", generatorController.createGenerator);

module.exports = router;
