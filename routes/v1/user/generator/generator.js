const express = require("express");
const generatorController = require("../../../../controllers/generatorController.js");

const router = express.Router({ mergeParams: true });

router.get("/next", generatorController.getNext);

router.get("/", generatorController.getGenerator);

// TODO: update generator route

router.post("/", generatorController.createGenerator);

module.exports = router;
