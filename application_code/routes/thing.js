const express = require('express');
const router = express.Router();

router.get('/thing', function (req, res) {
    res.render('thing', { message: "Please Login" });
 });

 module.exports = router;