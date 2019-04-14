const bcrypt = require("bcrypt");

module.exports.hash = async (plainText, saltRounds) => {
	try {
		let hashedText = await bcrypt.hash(plainText, saltRounds);
		return hashedText;
	}
	catch(err)
	{
		console.log(`Error hashing. Error message: ${err}`);
		throw(err);
	}
};

module.exports.compare = async (plainText, hashedText) => {
	try {
		let isMatch = await bcrypt.compare(plainText, hashedText);
		return isMatch;
	}
	catch(err)
	{
		console.log(`Error comparing. Error message: ${err}`);
		throw(err);
	}
};