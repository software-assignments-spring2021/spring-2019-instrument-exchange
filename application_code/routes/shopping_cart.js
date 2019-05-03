const express = require('express');
const router = express.Router();
const db = require('../db');
const Cart = require('../cart');
const Studio = db.Studio;
const Instrument = db.Instrument;
const Order = db.Order;
const Notification = db.Notification;

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

   var cart = new Cart(req.session.cart);

   var stripe = require("stripe")(
       "sk_test_K8TpMHDjlapM1Vp5kjoaxppN00ccillGae"
   );

   stripe.charges.create({
       amount: cart.totalPrice * 100,
       currency: "usd",
       source: "tok_mastercard", // obtained with Stripe.js
       description: "Test Charge"
   }, function(err, charge) {
       if (err) {
           req.flash('error', err.message);
           console.log("An error occurred.");
           console.log(err + "\n");
           return res.redirect('/checkout');
       }

       var order = new Order({
            user: req.user,
            cart: cart,
            address: req.user.address,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            paymentId: charge.id
       });

  //      RESULT: { _id: 5ccb29cdfe467e130a10a674,
  // cart:
  //  Cart {
  //    items: { '5ccb23b9d0c3c41191f9d1e1': [Object] },
  //    totalPrice: 800,
  //    numItems: 1,
  //    addRental: [Function],
  //    addPurchase: [Function],
  //    deleteItem: [Function],
  //    generateArray: [Function] },
  // address: 'Times Square, Manhattan, New York, NY, USA',
  // firstName: 'T',
  // lastName: 'T',
  // paymentId: 'ch_1EVimHGmFJY0AUAPzPJha2PY',
  // __v: 0 }

       order.save(function(err, result) {
         if (err) {

         } else {
            console.log("RESULT: " + result);
            const cartEntries = Object.entries(result.cart.items);
            for (var entry of cartEntries) {
              var itemId = entry[0];
              var item = entry[1];

              var notification = new Notification({
                buyerId: req.user.id,
                sellerId: item.sellerID,
                itemId: itemId
              });
              console.log(notification);
              notification.save(function(err, result) {
                console.log("successfully saved!");
              });
            }

             req.flash('success', 'Successfully bought product!');
             req.session.cart = null;
             res.redirect('/');
         }
       });
   });
});

module.exports = router;
