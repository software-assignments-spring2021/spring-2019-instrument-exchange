const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/login', function (req, res) {
    res.render('login', { message: "Please Login" });
});


router.post('/authenticate',
    passport.authenticate('local', { successRedirect: '/buy_sell',
        failureRedirect: '/failure' }));


// router.post('/authenticate',
//     // wrap passport.authenticate call in a middleware function
//     function (req, res, next) {
//         // call passport authentication passing the "local" strategy name and a callback function
//         passport.authenticate('local', function (error, user, info) {
//             // this will execute in any case, even if a passport strategy will find an error
//             // log everything to console
//             console.log(error);
//             console.log(user);
//             console.log(info);
//
//             if (error) {
//                 res.status(401).send(error);
//             } else if (!user) {
//                 res.status(401).send(info);
//             } else {
//                 next();
//             }
//
//             res.status(401).send(info);
//         })(req, res);
//     },
//
//     // function to call once successfully authenticated
//     function (req, res) {
//         res.status(200).send('logged in!');
//     });

module.exports = router;
