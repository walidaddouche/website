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
router.get('/register', forwardAuthenticated, (req, res) => res.render('login'));

// Register
router.post('/register', (req, res) => {
    const {name, email, password, password2, choice} = req.body;
    let errors = []
    if (!name || !email || !password || !password2) {
        errors.push({msg: 'Please enter all fields'});
    }

    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    if (password.length < 8) {
        errors.push({msg: 'Password must be at least 8 characters'});
    }
    if (choice === null) {
        errors.push({msg: 'Veuillez choisir un type de compte '});

    }
    if (errors.length > 0) {
        res.render('login', {
            errors,
            name,
            email,
            password,
            password2,
            choice
        });
    } else {
        let User = DB.User.prepare("SELECT  password,username,email from USERS where email like ? ").get(email)

        if (User !== undefined) {
            errors.push({msg: 'Email already exists'});
            res.render('login', {
                name,
            })
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    try {
                        let type = 0
                        if (choice.value === "Professionel") {
                            type = 1
                        }
                        DB.addUser(email, name, hash, type)
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
        successRedirect:  '/dashboard',
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

