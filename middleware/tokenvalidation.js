const { verifyToken } = require("../security/token.js");

async function verifyRequestToken(req, res, next) {
  if (req.method === "POST" && req.path === "/") return next();

  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader)
    return res.status(400).send({ Error: "Missing Authorization Header" });
  if (!authorizationHeader.startsWith("Bearer "))
    return res.status(400).send({ Error: "Invalid Authorization Header" });
  const token = authorizationHeader.slice(7);
  let payload;
  try {
    payload = await verifyToken(token, process.env.APP_PRIVATEKEY);
  } catch (err) {
    console.log("Error verifying token");
    return res.status(500).send({ Error: "Invalid Token" });
  }
  if (!payload) return res.status(400).send({ Error: "Invalid Token" });

  res.locals.userId = payload.sub;
  return next();
}

module.exports = verifyRequestToken;
