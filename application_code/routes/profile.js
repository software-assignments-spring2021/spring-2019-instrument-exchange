const express = require('express');
const router = express.Router();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Profile
router.get('/profile', function (req, res){
  if (req.user) {
    // extracting month and year from the date.
    const monthIndex = req.user.dateRegistered.getMonth();
    const date = monthNames[monthIndex] + " " + req.user.dateRegistered.getFullYear();
    console.log(date);
    res.render('profile', {user: req.user, date: date});
  } else {
    res.render('login_required');
  }
});


module.exports = router;
