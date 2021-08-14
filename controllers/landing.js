
const models = require('../models');
const { validateSearch } = require('../validators/search');
const { validatePro} = require('../validators/professional');
const {isEmpty} = require("lodash");
const createError = require("http-errors");
const logger = require("../util/logger");

const assign_data_values = function(variable, value) {
    try {
        variable = value;
        logger.info('value: ', value);
    } catch(error) {
        logger.info('assign_data_values error');
    }
}

const get_pro_details = function(assign_data_values, userDataValues, req,res,next) {
    return models.Users.findOne({
        include: [{
            model: models.Professionals,
        }],
        where: {
            'email' : req.user.email
        },
    }).then(userData => {
        if (userData == null) {
            next(createError(404));
        } else {
            logger.info('userData.dataValues: ', userData.dataValues);
            assign_data_values(userDataValues, userData.dataValues);
        }
    }).catch(err => {
        logger.info('Search error User: ', err);
        logger.info('req = ', req);
        next(createError(404));
    })
}

exports.get_landing = function(req, res, next) {
    let userDataValues = {};
    get_pro_details(assign_data_values, userDataValues, req,res,next);
    logger.info('userDataValues: ', userDataValues);
    res.render('landing', {user: req.user, userData: userDataValues});
}

const rerender_landing = function(errors, req, res, next) {
    let userDataValues = {};
    get_pro_details(userDataValues, req,res,next);
    res.render('landing', {user: req.user, userData: userDataValues, formData: req.body, errors: errors, userData: req.userData});
}

exports.show_users = function(req, res, next) {
    return models.Users.findAll().then(users => {
        res.render('landing', {title: 'Users', users: users});
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

exports.update_pro = function(req, res, next) {
    let errors = {};
    return validatePro(errors, req).then(errors_ret => {
        if (!isEmpty(errors_ret)) {
            return rerender_landing(errors_ret, req, res, next);
        } else {
            return models.Users.findOne({
                where: {
                    'email' : req.user.email
                },
            }).then(userData => {
                if (userData == null) {
                    next(createError(404));
                } else {
                    return models.Professionals.findOne({
                        where: {
                            'UserId' : userData.id
                        },
                    }).then(proData => {
                        if (proData == null) {
                            next(createError(404));
                        } else {
                            if (proData === '') {
                                return new Promise(function (resolve, reject) {
                                    logger.info('userData: ', userData);
                                    let newPro;
                                    newPro = models.Professionals.build({
                                        UserId: userData.id,
                                        firstName: req.body.proName,
                                        lastName: req.body.proSurname,
                                        phoneNumber: req.body.proNumber,
                                        profession: req.body.proProfession,
                                        description: req.body.proDescription
                                    });
                                    return newPro.save().then(result => {
                                        next();
                                    })
                                })
                            } else {
                                return models.Professionals.update({
                                        firstName: req.body.proName,
                                        lastName: req.body.proSurname,
                                        phoneNumber: req.body.proNumber,
                                        profession: req.body.proProfession,
                                        description: req.body.proDescription
                                    }, {
                                        where: {
                                            UserId: userData.id
                                        }
                                }).then(result => {
                                    next();
                                }).catch(err =>{
                                    logger.info('Search error Pro: ', err);
                                    logger.info('req = ', req);
                                    next(createError(404));
                                })
                            }
                        }
                    })
                }
            }).catch(err => {
                logger.info('Search error User: ', err);
                logger.info('req = ', req);
                next(createError(404));
            })
        }
    })
}