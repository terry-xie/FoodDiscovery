const jwt = require("jsonwebtoken");


function generateJWT(payload, privateKey, options) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, privateKey, options || null, (err, token) => {
			if(err)
				return reject(err);
			resolve(token);
		});
	});
};

function verifyJWT(token, privateKey, options) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, privateKey, options || null, (err, payload) => {
			resolve(!err);
		});
	});
}

module.exports.generateToken = generateJWT;
module.exports.verifyToken = verifyJWT;