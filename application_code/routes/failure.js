const express = require('express');
const router = express.Router();


router.get('/failure', function (req, res) {
    res.render('failure', { message: "login failed" });
});

module.exports = router;
