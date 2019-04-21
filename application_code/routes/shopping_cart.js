const express = require('express');
const router = express.Router();
const db = require('../db');
const Cart = require('../cart');
const Studio = db.Studio;
const Instrument = db.Instrument;

router.get('/shopping_cart', function (req, res, next) {
    res.render("shopping_cart", {cart: req.session.cart});
});

router.post('/checkout', function (req, res) {
    if (req.user) {
      res.render("checkout", {cart: req.session.cart});
    } else res.render("login_required");
});

module.exports = router;
