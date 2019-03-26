const express = require('express');
const router = express.Router();
const passport = require('passport');

// authenticated route
router.get('/seller_portal', function (req, res) {
    if (req.user) res.render("seller_portal");
    else res.render("login_required");
});

module.exports = router;