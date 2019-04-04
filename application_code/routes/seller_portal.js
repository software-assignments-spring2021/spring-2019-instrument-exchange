const express = require('express');
const router = express.Router();
const passport = require('passport');

// authenticated route
router.get('/seller_portal', function (req, res) {
    if (req.user) {
    console.log(req.user._id.toString())
    res.render('seller_portal');
    }
    else res.render('login_required');
});

module.exports = router;