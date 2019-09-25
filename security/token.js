const jwt = require("jsonwebtoken");


function generateJWT(payload, privateKey, options) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, privateKey, options, (err, token) => {
			if(err)
				return reject(err);
			resolve(token);
		});
	});
};

function verifyJWT(token, privateKey, options) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, privateKey, options, (err, payload) => {
			if(err)
				return reject(err)
			resolve(payload);
		});
	});
};

module.exports.generateToken = generateJWT;
module.exports.verifyToken = verifyJWT;