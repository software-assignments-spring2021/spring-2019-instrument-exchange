const express = require('express');
const router = express.Router();

// Iterate through the cart. Add all items.

router.get('/checkout', function (req, res) {
  if (req.user)
    res.render("checkout");
  else
    res.render("login_required");
});

module.exports = router;
