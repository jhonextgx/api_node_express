const { validationResult } = require("express-validator");

const validateResults = (req, res, next) =>{
    try {
        validationResult(req).throw()
        return next(); //TODO continue hacia el error
    } catch (error) {
        res.status(403);
        res.send({ errors: error.array() });
    }
};

module.exports = validateResults;