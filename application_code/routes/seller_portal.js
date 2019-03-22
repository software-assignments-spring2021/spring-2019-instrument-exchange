const express = require('express');
const router = express.Router();
const passport = require('passport');

// authenticated route
router.get('/seller_portal', function (req, res) {
    res.render("seller_portal");
});

module.exports = router;