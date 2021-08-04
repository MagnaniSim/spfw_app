let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
let flash = require('connect-flash');
const myPassport = require('../passport_setup')(passport);
const {isEmpty} = require('lodash');
const { validateUser } = require('../validators/signup');

exports.show_login = function(req, res, next) {
    res.render('user/login', { formData: {}, errors: {} });
}

exports.show_signup = function(req, res, next) {
    res.render('user/signup', { formData: {}, errors: {} });
}

const rerender_signup = function(errors, req, res, next) {
    res.render('user/signup', { formData: req.body, errors: errors});
}

const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.signup = function(req, res, next) {
    let errors = {};
    return validateUser(errors, req).then(errors => {
        if (!isEmpty(errors)) {
            rerender_signup(errors, req, res, next);
        } else {
            return models.Users.findOne({
                where: {
                    is_admin: true
                }
            }).then(user => {
                let newUser;
                newUser = models.Users.build({
                    email: req.body.email,
                    password: generateHash(req.body.password),
                    is_admin: false
                });
                return newUser.save().then(result => {
                    passport.authenticate('local', {
                        successRedirect: "/",
                        failureRedirect: "/signup",
                        failureFlash: true
                    })(req, res, next);
                })
            })
        }
    })
}

exports.login = function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
}

exports.logout = function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
}
