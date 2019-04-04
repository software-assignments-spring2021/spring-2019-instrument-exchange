const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
   if(!req.user){
      res.redirect('login');
   }
   res.render('buy_sell',{user:req.user});
  
});

module.exports = router;
