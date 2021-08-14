
const models = require('../models');
const { validatePro } = require('../validators/search');
const {isEmpty} = require("lodash");
const logger = require("../util/logger");

const save_pro_details = function(userDataValues, req,res,next) {
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
            userDataValues = userData.dataValues;
        }
    }).catch(err => {
        logger.info('Search error User: ', err);
        logger.info('req = ', req);
        next(createError(404));
    })
}

exports.get_landing = function(req, res, next) {
    let userDataValues = {};
    get_pro_details(userDataValues, req,res,next);
    res.render('landing', {user: req.user, userData: userDataValues});
}

const rerender_landing = function(errors, req, res, next) {
    get_pro_details(req,res,next);
    res.render('landing', {user: req.user, formData: req.body, errors: errors, userData: req.userData});
}

exports.update_pro = function(req, res, next) {
    let errors = {};
    return validatePro(errors, req).then(errors_ret => {
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
                res.render('results', { formData: req.body, professionals: professionals});
            }).catch(err => {
                logger.info('Search error: ', err);
                logger.info('req = ', req);
                next(createError(404));
            })
        }
    })
}