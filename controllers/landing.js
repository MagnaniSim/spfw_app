
const models = require('../models');
const { validateSearch } = require('../validators/search');
const {isEmpty} = require("lodash");
const passport = require("passport");
const createError = require("http-errors");
const logger = require("../util/logger");

exports.get_landing = function(req, res, next) {
    res.render('landing', { title: 'Landing' , user: req.user });
}

const rerender_landing = function(errors, req, res, next) {
    res.render('landing', { formData: req.body, user: req.user, errors: errors});
}

exports.show_users = function(req, res, next) {
    return models.Users.findAll().then(users => {
        res.render('landing', { title: 'Users', users: users});
    })
}

exports.show_user = function(req, res, next) {
    return models.Users.findOne({
        where : {
            id : req.params.user_id
        }
    }).then(user => {
        res.render('landing', { user : user });
    });
}

exports.search = function(req, res, next) {
    let errors = {};
    return validateSearch(errors, req).then(errors_ret => {
        if (!isEmpty(errors_ret)) {
            return rerender_landing(errors_ret, req, res, next);
        } else {
            return models.Professionals.findAll({
                where: {
                    'profession' : req.body.profession
                },
            }).then(professionals => {
                if (professionals == null) {
                    errors["professionals"] = "Error in finding professionals";
                    return rerender_landing(errors_ret, req, res, next);
                }
                logger.info('professionals: ', professionals);
                res.render('results', { formData: req.body, user: req.user, professionals: professionals});
            }).catch(err => {
                logger.info('Search error: ', err);
                logger.info('req = ', req);
                next(createError(404));
            })
        }
    })
}