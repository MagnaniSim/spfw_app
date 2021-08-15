let createError = require('http-errors')
const models = require("../models");

exports.is_logged_in = function(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

exports.is_admin = function(req, res, next) {
    if (!req.user || !req.user.is_admin) {
        res.redirect('/');
    } else {
        // confirm user is an administrator
        let user;
        user = models.Users.findOne({
            where: {
                id: req.params.user_id
            }
        })
        if (!user && !user.is_admin) {
            res.redirect('/');
        } else {
            next();
        }
    }
}