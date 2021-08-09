let createError = require('http-errors')

exports.is_logged_in = function(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

exports.is_admin = function(req, res, next) {
    if (req.user && req.user.is_admin == true) {
        next();
    } else {
        next(createError(404, "Not Found"));
    }
}