const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const db = require('../db');

// Login
router.get('/login', (req, res) => res.send('Login Placeholder'));

// Register
router.get('/register', (req, res) => res.render('Register'));

// Register Handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check matching passwords
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
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
    // Validation has passed
      const newUser = new db.Use({
        firstName: name,
        lastName: "lastname",
        username: "username",
        email: email,
        password: password,
        phoneNumber: 10,
        dateRegistered: Date.now()
      });

      console.log(newUser);
      res.send('Success!');

      // Hash the password
      bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        // Set password to hashed
        newUser.password = hash;
        // Save user
        newUser.save().then(user => {
            // res.redirect('/users/login');
          }).catch(err => console.log(err));
      }))

  }

})


module.exports = router;
