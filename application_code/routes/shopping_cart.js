const express = require('express');
const router = express.Router();
const db = require('../db');
const Cart = require('../cart');
const Studio = db.Studio;
const Instrument = db.Instrument;

router.get('/shopping_cart', function (req, res, next) {
    res.render("shopping_cart", {cart: req.session.cart});
});

// Proceed to Checkout button
router.post('/checkout', function (req, res) {
    if (req.user) {
      res.render("checkout", {cart: req.session.cart, user: req.user});
    } else res.render("login_required");
});

// Place Your Order Button
router.post('/place_order', function (req, res) {
    if (req.user) {
      res.render("buyer_portal", {message: "Your order has been successfully placed!"});
    } else res.render("login_required");
});

module.exports = router;
