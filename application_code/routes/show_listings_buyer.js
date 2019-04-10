const express = require('express');
const router = express.Router();
const Instrument = require('../db').Instrument;
const Studio = require('../db').Studio;
const Cart = require('../cart');

// authenticated route
router.get('/studio_listings_buyer', function (req, res) {
    if (req.user) {
        Studio.find()
            .then(studios => {
                console.log(studios);
                res.render("studio_listings_buyer", {studios: studios})
            })
            .catch(err => console.log(err));
    }
    else res.render("login_required");
});

// authenticated route
router.get('/instrument_listings_buyer', function (req, res) {
    if (req.user) {
        Instrument.find()
            .then(instruments => {
                console.log(instruments);
                res.render("instrument_listings_buyer", {instruments: instruments})
            })
            .catch(err => console.log(err));
    }
    else res.render("login_required");
});


router.get("/studio_detail/:role/:id", function(req, res) {
    if (req.user) {
        const studioId = req.params.id;
        buyer = req.params.role === "buyer";
        Studio.findOne({"_id": studioId})
            .then(studio => {
                res.render("studio_detail", {studio: studio, buyer: buyer});
            })
            .catch(err => console.log(err));
    }  else res.render("login_required");
});


router.get("/instrument_detail/:role/:id", function(req, res) {
    if (req.user) {
        const instrumentId = req.params.id;
        buyer = req.params.role === "buyer";
        Instrument.findOne({"_id": instrumentId})
            .then(instrument => {
                res.render("instrument_detail", {instrument: instrument, buyer: buyer});
            })
            .catch(err => console.log(err));
    }  else res.render("login_required");
});

router.get('/add-studio-to-cart', function(req, res){
  if (req.user) {
    if (req.query.id) {
      var studioId = req.query.id;
      var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

      Studio.findById(studioId, function(err, studio) {
        // Error handling
        if (err) {
          return res.redirect('/shopping_cart');
        }

        cart.add(studio, studio._id);
        req.session.cart = cart;
        console.log(req.session.cart.items);
        console.log(cart.items[studio._id]);
        res.redirect("studio_listings_buyer");
      })
    } else {
      return res.render("shopping_cart", {cart: req.session.cart});
    }
  }
  else res.render("login_required");

});

module.exports = router;
