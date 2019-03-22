const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;