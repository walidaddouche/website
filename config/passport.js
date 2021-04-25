const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const DB = require('../models/User')
// Load User model
const User = require('../models/User');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('/home/walid/Bureau/log/models/DATABASE.sqlite');

module.exports = function (passport) {
    passport.use(
        /* db.get('SELECT salt FROM users WHERE username = ?', username, function(err, row) {
           if (!row) return done(null, false);
           var hash = hashPassword(password, row.salt);
           db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, hash, function(err, row) {
             if (!row) return done(null, false);
             return done(null, row);
           });
         });
       }));

       passport.serializeUser(function(user, done) {
         return done(null, user.id);
       });

       passport.deserializeUser(function(id, done) {
         db.get('SELECT id, username FROM users WHERE id = ?', id, function(err, row) {
           if (!row) return done(null, false);
           return done(null, row);
         });
       })}*/

        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
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


