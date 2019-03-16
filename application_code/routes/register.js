const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../db');

// Register
router.get('/register', (req, res) => res.render('Register'));

// Register Handle
router.post('/register_user', (req, res) => {
    const { firstName, lastName, username, email, password, password2, phoneNumber } = req.body;
    let errors = [];

    // Required fields
    if (!firstName || !lastName || !username || !email || !password || !password2
        || !phoneNumber) {
        errors.push({ msg: 'Please fill in all fields' });
        console.log("Missing");
    }

    // Check matching passwords
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstName,
            email,
            password,
            password2
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
