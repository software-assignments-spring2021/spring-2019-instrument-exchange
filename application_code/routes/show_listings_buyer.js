const express = require('express');
const router = express.Router();
const Instrument = require('../db').Instrument;
const Studio = require('../db').Studio;
const Cart = require('../cart');
const StudioListing = require('../db').StudioListing;
const Range = require('../db').Range;

const moment = require('moment');

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

// Only post is necessary

router.post('/add_studio/:id', function(req, res) {
  if (req.user) {
    // Params indicates the URL passed.
    if (req.params.id) {
      var studioId = req.params.id;
      var dateRange = req.body.listingDateRange.split(" ");
      var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
      //2019-04-17 to 2019-04-20

      var dayOne = moment(dateRange[0], 'YYYY-MM-DD');
      var dayTwo = moment(dateRange[2], 'YYYY-MM-DD');
      var days = dayTwo.diff(dayOne, 'days') + 1;

      var dayOneArray = dateRange[0].split("-");
      var dayTwoArray = dateRange[2].split("-");

      var dateOne = new Date(dayOneArray[0], dayOneArray[1], dayOneArray[2]);
      var dateTwo = new Date(dayTwoArray[0], dayTwoArray[1], dayTwoArray[2]);


      Studio.findById(studioId, function(err, studio) {
        if (err) {
          return res.redirect('/shopping_cart');
        }

        StudioListing.find({studioId: studioId}, function(err, studioListing){

        });

        var range = new Range();
        range.start = dateOne;
        range.end = dateTwo;

        // Set datafields
        studio.daysRented = days;
        studio.booked.push(range);

        cart.addRental(studio, studio._id);
        req.session.cart = cart;
        Studio.find()
            .then(studios => {
                res.render("studio_listings_buyer", {studios: studios})
            })
            .catch(err => console.log(err));
      })
    } else {
      return res.render("shopping_cart", {cart: req.session.cart});
    }
  } else res.render("login_required");
});

router.get('/add_instrument_to_cart_rental', function(req, res) {
  if (req.user) {
    if (req.query.id) {
      var instrumentId = req.query.id;
      var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

      Instrument.findById(instrumentId, function(err, instrument) {
        if (err) {
          return res.redirect('/shopping_cart');
        }

        cart.addRental(instrument, instrument._id);
        req.session.cart = cart;
        res.redirect("instrument_listings_buyer");
      })
    } else {
      return res.render("shopping_cart", {cart: req.session.cart});
    }
  } else res.render("login_required");
})


module.exports = router;
