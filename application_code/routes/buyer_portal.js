const express = require('express');
const router = express.Router();

// authenticated route
router.get('/buyer_portal', function (req, res) {
    if (req.user) {
      res.render('buyer_portal');
    }
    else res.render('login_required');
});

module.exports = router;
