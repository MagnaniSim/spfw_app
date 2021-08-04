let models = require('../models');
let validator = require('validator');


const validateCreateUserFields = function(errors, req) {
    if (!validator.isEmail(req.body.email)) {
        errors["email"] = "Please use a valid email address.";
    }
    if (!validator.isAscii(req.body.password)) {
        errors["password"] = "Invalid characters in password.";
    }
    if (!validator.isLength(req.body.password, {min: 8, max: 25})) {
        errors["password"] = "Please ensure that your password has a minimum of 8 and a maximum of 25 characters";
    }
}

exports.validateUser = function(errors, req) {
    return new Promise(function(resolve, reject) {
        validateCreateUserFields(errors, req);
        return models.Users.findOne({
            where: {
                email: req.body.email
            }
        }).then(user_found => {
            if (user_found !== null) {
                errors["email"] = "Email address already exists.";
            }
            resolve(errors);
        })
    })
}