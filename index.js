const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./routes/user.js");
const session = require("./routes/session.js");

mongoose.connect("mongodb://localhost/authorization", {useNewUrlParser: true})
    .then(() => console.log("Connected to mongodb..."))
    .catch(() => console.log("Error connecting to mongodb..."));

app.use(express.json());
app.use("/api/session", session);
app.use("/api/user", user);
app.use((err, req, res, next) => {
	console.log(err);
	return res.status(500).send({ Error: "Internal Server Error" });
});
app.listen(3000, console.log("listening on port 3000..."));
