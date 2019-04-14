const { verifyToken } = require("../security/token.js");

async function verifyRequestToken(req, res, next) {
	let authorizationHeader = req.headers["authorization"];
	if(!authorizationHeader)
		return res.status(400).send({ Error: "Missing Authorization Header" });
	if(!authorizationHeader.startsWith("Bearer "))
		return res.status(400).send({ Error: "Invalid Authorization Header" });
	let token = authorizationHeader.slice(7);
	let isTokenValid;
	try {
		isTokenValid = await verifyToken(token, "***PRIVATE KEY***");
	}
	catch(err)
	{
		console.log("Error verifying token");
		return res.status(500).send({ Error: "Internal Server Error" });
	}
	if(!isTokenValid)
		return res.status(400).send({ Error: "Invalid Token" });
	next();
};

module.exports = verifyRequestToken;