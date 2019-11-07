require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");

const app = express();

// TODO: Move initialization steps to own modules

mongoose
  .connect("mongodb://localhost/authorization", { useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb..."))
  .catch(() => console.log("Error connecting to mongodb..."));

app.use(express.json());
app.use("/api", require("./routes"));
app.use(
  "/api/v1/documentation",
  swaggerUI.serve,
  swaggerUI.setup(require("./documentation/doc.js"))
);
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send({ Error: "Internal Server Error" });
});
app.listen(
  process.env.PORT || 3000,
  console.log("Listening to connections...")
);
