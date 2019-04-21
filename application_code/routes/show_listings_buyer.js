const express = require('express');
const router = express.Router();
const Instrument = require('../db').Instrument;
const Studio = require('../db').Studio;
const Cart = require('../cart');
const StudioListing = require('../db').StudioListing;
const Range = require('../db').Range;
const moment = require('moment');
const InstrumentListing = require('../db').InstrumentListing;
const api = require('../api_keys').zipAPI;
const request = require('request');


// authenticated route
router.get('/studio_listings_buyer', function (req, res) {
    if (req.user) {
        StudioListing.find({sellerId: {$ne: req.user._id}})
            // getting all the studio ids from the studio listings schema
            // that do not include this user's id.
            .then(listings =>{
                const ids = listings.map(ele => {
                    return ele.studioId;
                });
                Studio.find({_id: {$in: ids}})
                    .then(studios => {
                        res.render("studio_listings_buyer", {studios: studios})
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
    else res.render("login_required");
});

// authenticated route
router.get('/instrument_listings_buyer', function (req, res) {
    if (req.user) {
        InstrumentListing.find({sellerId: {$ne: req.user._id}})
        // getting all the instrument ids from the instrument listings schema
        // that do not include this user's id.
            .then(listings =>{
                const ids = listings.map(ele => {
                    return ele.instrumentId;
                });
                Instrument.find({_id: {$in: ids}})
                    .then(instruments => {
                        res.render("instrument_listings_buyer", {instruments: instruments})
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
    else res.render("login_required");
});

// authenticated route
router.get("/studio_detail/:role/:id", function(req, res) {
    if (req.user) {
        const studioId = req.params.id;
        const buyer = req.params.role === "buyer";
        Studio.findOne({"_id": studioId})
            .then(studio => {
                res.render("studio_detail", {studio: studio, buyer: buyer});
            })
            .catch(err => console.log(err));
    }  else res.render("login_required");
});

//authenticated route
router.get("/instrument_detail/:role/:id", function(req, res) {
    if (req.user) {
        const instrumentId = req.params.id;
        const buyer = req.params.role === "buyer";
        Instrument.findOne({"_id": instrumentId})
            .then(instrument => {
                res.render("instrument_detail", {instrument: instrument, buyer: buyer});
            })
            .catch(err => console.log(err));
    }  else res.render("login_required");
});

// for location service for STUDIOS and price sorting
router.get('/studios/applyfilter', function(req, res) {
    if (req.user) {
        const distance = req.query.zip_slider;
        const price = req.query.sort_price;
        const userZip = req.user.zip;
        // creating the request url for zip api.
        const url = `https://www.zipcodeapi.com/rest/${api}/radius.json/${userZip}/${distance}/mile`;
        console.log(url);
        request(url, {json: true}, (err, response, body) => {
            if (err) console.log(err);
            zipCodes = body.zip_codes.map(function(ele) {
                return ele.zip_code;
            });

            // apply the filters
            if (price === "default") {
                StudioListing.find({sellerId: {$ne: req.user._id}})
                // getting all the studio ids from the studio listings schema
                // that do not include this user's id.
                    .then(listings =>{
                        const ids = listings.map(ele => {
                            return ele.studioId;
                        });
                        Studio.find({_id: {$in: ids}, zip: {$in: zipCodes}})
                            .then(studios => {
                                res.render("studio_listings_buyer", {studios: studios, sliderValue: distance, price: price})
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            } else if (price === "asc") {
                StudioListing.find({sellerId: {$ne: req.user._id}})
                // getting all the studio ids from the studio listings schema
                // that do not include this user's id.
                    .then(listings =>{
                        const ids = listings.map(ele => {
                            return ele.studioId;
                        });
                        Studio.find({_id: {$in: ids}, zip: {$in: zipCodes}}).sort({rentalPrice: 1})
                            .then(studios => {
                                res.render("studio_listings_buyer", {studios: studios, sliderValue: distance, price: price})
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            } else if (price === "desc") {
                StudioListing.find({sellerId: {$ne: req.user._id}})
                // getting all the studio ids from the studio listings schema
                // that do not include this user's id.
                    .then(listings =>{
                        const ids = listings.map(ele => {
                            return ele.studioId;
                        });
                        Studio.find({_id: {$in: ids}, zip: {$in: zipCodes}}).sort({rentalPrice: -1})
                            .then(studios => {
                                res.render("studio_listings_buyer", {studios: studios, sliderValue: distance, price: price})
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            }
        });
    } else res.render("login_required");
});


// for location service  for INSTRUMENTS and price sorting
router.get('/instruments/applyfilter', function(req, res) {
    if (req.user) {
        const distance = req.query.zip_slider;
        const price = req.query.sort_price;
        const userZip = req.user.zip;
        // creating the request url for zip api.
        const url = `https://www.zipcodeapi.com/rest/${api}/radius.json/${userZip}/${distance}/mile`;
        console.log(url);
        request(url, {json: true}, (err, response, body) => {
            if (err) console.log(err);
            zipCodes = body.zip_codes.map(function(ele) {
                return ele.zip_code;
            });
            if (price === "default") {
                InstrumentListing.find({sellerId: {$ne: req.user._id}})
                // getting all the studio ids from the studio listings schema
                // that do not include this user's id.
                    .then(listings =>{
                        const ids = listings.map(ele => {
                            return ele.instrumentId;
                        });
                        Instrument.find({_id: {$in: ids}, zip: {$in: zipCodes}})
                            .then(instruments => {
                                res.render("instrument_listings_buyer", {instruments: instruments, sliderValue: distance, price: price})
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            } else if (price === "asc") {
                InstrumentListing.find({sellerId: {$ne: req.user._id}})
                // getting all the studio ids from the studio listings schema
                // that do not include this user's id.
                    .then(listings =>{
                        const ids = listings.map(ele => {
                            return ele.instrumentId;
                        });
                        Instrument.find({_id: {$in: ids}, zip: {$in: zipCodes}}).sort({rentalPrice: 1})
                            .then(instruments => {
                                res.render("instrument_listings_buyer", {instruments: instruments, sliderValue: distance, price: price})
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            } else if (price === "desc") {
                InstrumentListing.find({sellerId: {$ne: req.user._id}})
                // getting all the studio ids from the studio listings schema
                // that do not include this user's id.
                    .then(listings =>{
                        const ids = listings.map(ele => {
                            return ele.instrumentId;
                        });
                        Instrument.find({_id: {$in: ids}, zip: {$in: zipCodes}}).sort({rentalPrice: -1})
                            .then(instruments => {
                                res.render("instrument_listings_buyer", {instruments: instruments, sliderValue: distance, price: price})
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            }
        });
    } else res.render("login_required");
});

// Add studio
router.post('/add_studio/:id', function(req, res) {
  if (req.user) {
    // Params indicates the URL passed.
    if (req.params.id) {
      // Validate listingDateRange using regex
      var regex = new RegExp("([0-9]{4})-([0-9]{2})-([0-9]{2}) to ([0-9]{4})-([0-9]{2})-([0-9]{2})");
      if (!regex.test(req.body.listingDateRange)) {
        Studio.findOne({"_id": req.params.id})
            .then(studio => {
                res.render("studio_detail", {studio: studio, error: "You must specify Rental Period"});
            })
            .catch(err => console.log(err));
      } else {
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
            studio.startDate = dateRange[0];
            studio.endDate = dateRange[2];

            cart.addRental(studio, studio._id);
            req.session.cart = cart;
            Studio.find()
                .then(studios => {
                    res.render("buyer_portal", {message: studio.name + " was added to your shopping cart."})
                })
                .catch(err => console.log(err));
          })
      }
    } else {
      return res.render("shopping_cart", {cart: req.session.cart});
    }
  } else res.render("login_required");
});

// Add instrument rental
router.post('/add_instrument_rental/:id', function(req, res) {
  if (req.user) {
    // Params indicates the URL passed.
    if (req.params.id) {
      var regex = new RegExp("([0-9]{4})-([0-9]{2})-([0-9]{2}) to ([0-9]{4})-([0-9]{2})-([0-9]{2})");
      if (!regex.test(req.body.listingDateRange)) {
        Instrument.findOne({"_id": req.params.id})
            .then(instrument => {
                res.render("instrument_detail", {instrument: instrument, buyer: "buyer", error: "You must specify Rental Period"});
            })
            .catch(err => console.log(err));
      } else {
        var instrumentId = req.params.id;
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

        Instrument.findById(instrumentId, function(err, instrument) {
          if (err) {
            return res.redirect('/shopping_cart');
          }

          InstrumentListing.find({instrumentId: instrumentId}, function(err, instrumentListing){

          });

          var range = new Range();
          range.start = dateOne;
          range.end = dateTwo;

          // Set datafields
          instrument.daysRented = days;
          instrument.booked.push(range);
          instrument.startDate = dateRange[0];
          instrument.endDate = dateRange[2];
          instrument.isRental = true;

          cart.addRental(instrument, instrument._id);
          req.session.cart = cart;
          Instrument.find()
              .then(instruments => {
                  res.render("buyer_portal", {message: instrument.name + " was added to your shopping cart."})
              })
              .catch(err => console.log(err));
        })
      }
    } else {
      return res.render("shopping_cart", {cart: req.session.cart});
    }
  } else res.render("login_required");
});

// Add instrument purchase
router.post('/add_instrument_purchase/:id', function(req, res) {
  if (req.user) {
    // Params indicates the URL passed.
    if (req.params.id) {
      var instrumentId = req.params.id;
      var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

      Instrument.findById(instrumentId, function(err, instrument) {
        if (err) {
          return res.redirect('/shopping_cart');
        }

        InstrumentListing.find({instrumentId: instrumentId}, function(err, instrumentListing){

        });

        cart.addPurchase(instrument, instrument._id);
        req.session.cart = cart;
        Instrument.find()
            .then(instruments => {
                res.render("buyer_portal", {message: instrument.name + " was added to your shopping cart."})
            })
            .catch(err => console.log(err));
      })
    } else {
      return res.render("shopping_cart", {cart: req.session.cart});
    }
  } else res.render("login_required");
});

// Delete item from cart
router.post('/delete_item/:id', function(req, res) {
  if (req.params.id) {
    var itemId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    cart.deleteItem(itemId);
    req.session.cart = cart;
    return res.render("shopping_cart", {cart: req.session.cart});
  }
  else res.render("login_required");
});

module.exports = router;
