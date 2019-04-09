const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
   if(req.user) res.render('buy_sell', {user: req.user});
   else res.redirect('login');

});

module.exports = router;
