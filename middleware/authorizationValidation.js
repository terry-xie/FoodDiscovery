function authorizationValidation(req, res, next){
    console.log("in authorize");
    if(res.locals.userId !== req.params.userId)
        return res.status(400).send({ Error: "Unauthorized access" });

    next();
};

module.exports = authorizationValidation;