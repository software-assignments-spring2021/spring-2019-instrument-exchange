const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', function (req, res) {
    res.render('login', { message: "Please Login" });
});

router.post('/authenticate', function(req, res, next) {
    console.log('authentication called');
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/failure'
    })(req, res, next);
});

// router.post('/authenticate',
//     passport.authenticate('local', { failureRedirect: '/failure' }),
//     function(req, res) {
//         res.redirect('/');
//     });

module.exports = router;
