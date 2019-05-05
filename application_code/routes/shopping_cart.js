const express = require('express');
const router = express.Router();
const db = require('../db');
const Cart = require('../cart');
const mongoose = require('mongoose');
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

       order.save(function(err, result) {
         if (err) {

         } else {
            const cartEntries = Object.entries(result.cart.items);
            const instrumentIds = [];
            const studioIds = [];

            // console.log("cart entries ", cartEntries);
            for (var entry of cartEntries) {
                const item = entry[1].item;
                if (item.classType === "Instrument") {
                    instrumentIds.push(mongoose.Types.ObjectId(item._id));
                } else {
                    studioIds.push(mongoose.Types.ObjectId(item._id));
                }
            }

             // console.log("studio ids ", studioIds);
             // console.log("instrument ids ", instrumentIds);

             if (studioIds.length !== 0 && instrumentIds.length !== 0) {
                 Studio.find({'_id': {$in: studioIds}})
                     .then(studios => {
                         console.log("both RENTED STUDIO and INS");
                         // create a notification for each studio
                         let notifications_studio = [];
                         for (const studio of studios) {
                             notifications_studio.push({buyerName: req.user.firstName + " " + req.user.lastName, buyerId: req.user.id, sellerId: studio.sellerId, itemId: studio.id, itemName: studio.name, itemType: "Studio"});
                         }
                         // console.log("notif array studio ", notifications_studio);
                         Notification.collection.insertMany(notifications_studio, (err, docs)=> {
                             if (err) {
                                 console.log("error inserting notification for studios");
                             } else {
                                 Instrument.find({'_id': {$in: instrumentIds}})
                                     .then(instruments => {
                                         // console.log("instruments found debug ", instruments);
                                         let notifications_instrument = [];
                                         for (const instrument of instruments) {
                                             notifications_instrument.push({buyerName: req.user.firstName + " " + req.user.lastName, buyerId: req.user.id, sellerId: instrument.sellerId, itemId: instrument.id, itemName: instrument.name, itemType: "Instrument"});
                                         }
                                         // console.log("notif array ins ", notifications_instrument);
                                         Notification.collection.insertMany(notifications_instrument, (err, docs) => {
                                             if (err) {
                                                 console.log("error inserting ins notif ", err);
                                                 console.log("error inserting instrument notifications");
                                             } else {
                                                 console.log("Successfully added instrument notifications");
                                             }
                                         });
                                     })
                                     .catch( err => {
                                         console.log("error finding instrument");
                                     });
                             }
                         });
                     })
                     .catch(err => {
                         console.log("mongo error ", err);
                         console.log("error finding studios");
                     });
             } else if (studioIds.length !== 0) {
                 Studio.find({'_id': {$in: studioIds}})
                     .then(studios => {
                         // create a notification for each studio
                         console.log("only RENTED STUDIO");
                         let notifications_studio = [];
                         for (const studio of studios) {
                             notifications_studio.push({buyerName: req.user.firstName + " " + req.user.lastName, buyerId: req.user.id, sellerId: studio.sellerId, itemId: studio.id, itemName: studio.name, itemType: "Studio"});
                         }
                         // console.log("notif array studio ", notifications_studio);
                         Notification.collection.insertMany(notifications_studio, (err, docs)=> {
                             if (err) {
                                 console.log("error inserting notification for studios");
                             } else {
                                 console.log("successfully added notification for studios.");
                             }
                         });
                     })
                     .catch(err => {
                         console.log("mongo error ", err);
                         console.log("error finding studios");
                     });
             } else if (instrumentIds.length !== 0) {
                 Instrument.find({'_id': {$in: instrumentIds}})
                     .then(instruments => {
                         console.log("only RENTED INSTRUMENT");
                         // console.log("instruments found debug ", instruments);
                         let notifications_instrument = [];
                         for (const instrument of instruments) {
                             notifications_instrument.push({buyerName: req.user.firstName + " " + req.user.lastName, buyerId: req.user.id, sellerId: instrument.sellerId, itemName: instrument.name, itemId: instrument.id, itemType: "Instrument"});
                         }
                         // console.log("notif array ins ", notifications_instrument);
                         Notification.collection.insertMany(notifications_instrument, (err, docs) => {
                             if (err) {
                                 console.log("error inserting ins notif ", err);
                                 console.log("error inserting instrument notifications");
                             } else {
                                 console.log("Successfully added instrument notifications");
                             }
                         });
                     })
                     .catch( err => {
                         console.log("error finding instrument");
                     });

             } else {
                 console.log("No notification for this user.");
             }

            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
         }
       });
   });
});

module.exports = router;
