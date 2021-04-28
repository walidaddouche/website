const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const DB = require('../models/User')
// Load User model

module.exports = function (passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            // Match USER
            let USER = DB.User.prepare("SELECT email, password  FROM USERS where email  like ?").get(email)
            if (USER === undefined) {
                return done(null, false, {message: 'That email is not registered'});
            }

            // Match password
            console.log(USER)
            const isMatch = bcrypt.compareSync(password, USER.password)
            if (isMatch) {
                return done(null, USER);
            } else {
                return done(null, false, {message: 'Password incorrect'});
            }
        })
    );
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};


