require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// TODO: Move initialization steps to own modules

mongoose
  .connect("mongodb://localhost/authorization", { useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb..."))
  .catch(() => console.log("Error connecting to mongodb..."));

app.use(express.json());
app.use("/api", require("./routes"));
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send({ Error: "Internal Server Error" });
});
app.listen(3000, console.log("listening on port 3000..."));
