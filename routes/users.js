const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const DB = require('../models/User')

// Load User model
const User = require('../models/User');
const {forwardAuthenticated} = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({msg: 'Please enter all fields'});
    }

    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    if (password.length < 8) {
        errors.push({msg: 'Password must be at least 8 characters'});
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        console.log(email)
        let User = DB.User.prepare("SELECT  password,username,email from USERS where email like ? ").get(email)

        if (User !== undefined) {
            errors.push({msg: 'Email already exists'});
            res.render('register', {
                name,
            })
        } else {
            console.log("ani hna")
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    try {
                        DB.addUser(email, name, hash)
                        req.flash(
                            'success_msg',
                            'You are now registered and can log in'
                        );
                        res.redirect('/users/login');
                    } catch (error) {
                        req.flash(
                            'SERVER ERROR',
                            'TRY AGAIN'
                        );
                    }
                });
            })
        }
    }
})
// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;

