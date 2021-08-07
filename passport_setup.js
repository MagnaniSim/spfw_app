
let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt');
let models = require('./models');

const validPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
}

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });
    passport.deserializeUser(function(id, done) {
        models.Users.findOne({
            where: {
                'id' : id
            }
        }).then(user => {
            if (user == null) {
                done(new Error('Wrong user ID'))
            }
            done(null, user);
        })
    });
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            return models.Users.findOne({
                where: {
                    'email' : email
                },
            }).then(user => {
                if (user == null) {
                    req.flash('message', 'Incorrect Username or Password')
                    return done(null, false)
                }
                if (user.password == null || user.password == undefined) {
                    req.flash('message', 'Password must be reset')
                    return done(null, false)
                }
                if(!validPassword(user, password)) {
                    req.flash('message', 'Incorrect Username or Password')
                    return done(null, false)
                }
                return done(null, user);
            }).catch(err => {
                done(err, false);
            })
        }))
}