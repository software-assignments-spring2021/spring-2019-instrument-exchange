const express = require('express');
const router = express.Router();

// Profile
router.get('/profile', function (req, res){
  res.render('profile',
  {firstName: req.user.firstName, lastName: req.user.lastName, username: req.user.username,
  email: req.user.email, phoneNumber: req.user.phoneNumber, dateRegistered: req.user.dateRegistered});
});


module.exports = router;
