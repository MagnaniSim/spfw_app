let validator = require('validator');

const validateSearchField = function(errors, req) {
    if (!validator.isAlpha(req.body.profession)) {
        errors["professionals"] = "Invalid characters. Please use just letters.";
    }
}

exports.validateSearch = function(errors, req) {
    return new Promise(function(resolve, reject) {
            validateSearchField(errors, req);
            return resolve(errors);
        })
}