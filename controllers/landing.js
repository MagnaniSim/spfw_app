
const models = require('../models');

exports.get_landing = function(req, res, next) {
    res.render('landing', { title: 'Landing' , user: req.user });
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