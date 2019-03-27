const express = require('express');
const router = express.Router();

// Profile
router.get('/profile', function (req, res){
  if (req.user) {
    res.render('profile', {user: req.user});
  } else {
    res.render('login_required');
  }
});


module.exports = router;
