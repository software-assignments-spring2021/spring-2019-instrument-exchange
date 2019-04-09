const express = require('express');
const router = express.Router();

// authenticated route
router.get('/shopping_cart', function (req, res) {
    if (req.user) {
      res.render('shopping_cart');
    }
    else res.render('login_required');
});

module.exports = router;
