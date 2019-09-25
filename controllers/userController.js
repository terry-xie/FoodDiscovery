const User = require("../models/user.js");
const { hash } = require("../security/encryptdecrypt.js");

async function createUser(req, res, next){
  try {
		let user = await User.findOne({ username: req.body.username });
		if(user)
			return res.status(400).send("User Exists");
		let hashedPassword = await hash(req.body.password, 10);
		user = await User.create({ username: req.body.username, password: hashedPassword });
		return res.status(201).send({ username: req.body.username });
	}
	catch(err) {
		console.log("Error in POST /user");
		next(err);
	}
};

async function getUser(req, res, next){
  try {
		let users = await User.find({_id: res.locals.userId});
		return res.status(200).send(users);
	}
	catch(err) {
		console.log("Error in GET /user");
		next(err);
	}
};

async function getUserById(req, res, next){
  try {
		let user = await User.findById(req.params.userId);
		return res.status(200).send(user);
	}
	catch(err){
		console.log("Error in GET /user/:id");
		next(err);
	}
};

//need a update method

module.exports = { 
    getUser: getUser,
    getUserById: getUserById,
    createUser: createUser
};