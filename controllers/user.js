let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
let flash = require('connect-flash');
const myPassport = require('../passport_setup')(passport);
const {isEmpty} = require('lodash');
const { validateUserSignup } = require('../validators/signup');
const logger = require("../util/logger");

exports.show_login = function(req, res, next) {
    res.render('user/login', { formData: {}, errors: {} });
}

const rerender_login = function(errors, req, res, next) {
    res.render('user/login', { formData: req.body, errors: errors});
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
    return validateUserSignup(errors, req).then(errors_ret => {
        if (!isEmpty(errors_ret)) {
            rerender_signup(errors_ret, req, res, next);
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
    res.redirect('/login');
}

exports.show_users = function(req, res, next) {
    return models.Users.findAll({
        where : {
            is_admin: false
        }
    }).then(users => {
        res.render('user/users', {user: req.user, users_result: users});
    })
}

exports.show_user = function(req, res, next) {
    return models.Users.findOne({
        where : {
            id : req.params.user_id
        }
    }).then(user => {
        res.render('user/user', { user : req.user, user_result: user });
    });
}

exports.show_edit_user = function(req, res, next) {
    return models.Users.findOne({
        where : {
            id : req.params.user_id
        }
    }).then(user => {
        res.render('user/edit_user', { user : req.user, user_result: user });
    });
}

exports.edit_user = function(req, res, next) {
    return models.Users.update({
        email: req.body.user_email
    }, {
        where: {
            id: req.params.user_id
        }
    }).then(result => {
        res.redirect('/user/' + req.params.user_id);
    })
}

exports.delete_user = function(req, res, next) {
    return models.Users.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(result => {
        res.redirect('/users');
    })
}

exports.delete_user_json = function(req, res, next) {
    return models.Users.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(result => {
        res.send({ msg: "Success" });
    })
}
