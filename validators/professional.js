let models = require('../models');
let validator = require('validator');


const validateProFields = function(errors, req) {
    if (!validator.isAlpha(req.body.proName)) {
        errors["proName"] = "Please use only letters.";
    }
    if (!validator.isAlpha(req.body.proSurname)) {
        errors["proSurname"] = "Please use only letters.";
    }
    if (!validator.isAlpha(req.body.proProfession)) {
        errors["proProfession"] = "Please use only letters.";
    }
    if (!validator.isAlpha(req.body.proDescription)) {
        errors["proDescription"] = "Please use only letters.";
    }
    if (!validator.isNumeric(req.body.proNumber)) {
        errors["proNumber"] = "Please use only numbers.";
    }
}

exports.validatePro = function(errors, req) {
    return new Promise(function(resolve, reject) {
        validateProFields(errors, req);
        return resolve(errors);
    })
}
