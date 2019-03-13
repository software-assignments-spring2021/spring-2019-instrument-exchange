const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
   res.render('welcome', { greeting: "Good People" });
});

module.exports = router;
