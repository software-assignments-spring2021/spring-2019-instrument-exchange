const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../db');

// Register
router.get('/register', (req, res) => res.render('Register'));

// Register Handle
router.post('/register_user', (req, res) => {
    const { firstName, lastName, username, email, password, password2, phoneNumber } = req.body;

    req.check('firstName', 'First name is required').notEmpty();
    req.check('lastName', 'Last name is required').notEmpty();
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Email is not valid').isEmail();
    req.check('username', 'Username is required').notEmpty();
    req.check('password', 'Password is required').notEmpty();
    req.check('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    // Check for all errors
    if (errors) {
        res.render('register', {
            errors:errors,
            firstName,
            lastName,
            username,
            email,
            password,
            password2,
            phoneNumber
        });
    } else {
        // Validation has passed
        const newUser = new db.User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        });

        // Hash the password
        bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save user
            newUser.save().then(user => {
                console.log('saving user to the database');
                console.log(user);
                res.redirect('/login');
            }).catch(err => console.log(err));
        })

    }

});


module.exports = router;
