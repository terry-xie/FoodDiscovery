const express = require("express");

const v1 = express.Router();

v1.use("/user", require("./user"));
v1.use("/session", require("./session"));

module.exports = v1;
