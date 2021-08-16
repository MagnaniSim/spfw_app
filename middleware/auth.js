let createError = require('http-errors')
const models = require("../models");
const logger = require("../util/logger");

exports.is_logged_in = function(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

exports.is_admin = function(req, res, next) {
    if(!req.user){
        logger.warn("Invalid admin access attempt: id: unknown");
        res.redirect('/');
    } else if(!req.user.is_admin){
            logger.warn("Invalid admin access attempt: id: " + req.user.id);
            res.redirect('/');
    } else {
        // confirm user is an administrator
        let user;
        user = models.Users.findOne({
            where: {
                id: req.user.id
            }
        })
        if (!user && !user.is_admin) {
            logger.warn("Invalid admin access attempt: id: " + req.user.id);
            res.redirect('/');
        } else {
            logger.info("Admin access: id: " + req.user.id);
            next();
        }
    }
}