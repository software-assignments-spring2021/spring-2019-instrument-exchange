const express = require('express');
const router = express.Router();
const passport = require('passport');

// authenticated route
router.get('/buy_sell', function (req, res) {
    if (req.user) {
        console.log("user is authenticated");
        console.log(req.user);
        res.render("buy_sell", {user: req.user});
    }
    else res.render("login_required");
});

module.exports = router;