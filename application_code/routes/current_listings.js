const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Instrument = require('../db').Instrument;
const InstrumentListing = require('../db').InstrumentListing;
const StudioListing = require('../db').StudioListing;
const Studio = require('../db').Studio;

// authenticated view
router.get('/current_listings', function(req, res) {
  if (req.user) {
    StudioListing.find({sellerId: req.user._id})
        .then(studioListings => {
            //console.log(studioListings);
            studioIds = studioListings.map(function(ele) {
            return mongoose.Types.ObjectId(ele.studioId);
          });
          // getting all the pictures from each of the studios
          Studio.find({'_id': {$in: studioIds}})
              .then(studios => {
                  // doing the same thing to get all the instruments
                  InstrumentListing.find({sellerId: req.user._id})
                      .then(instrumentListings => {
                          instrumentIds = instrumentListings.map(function(ele) {
                              return mongoose.Types.ObjectId(ele.instrumentId);
                          });
                          // getting all the pictures from each of the studios
                          Instrument.find({'_id': {$in: instrumentIds}})
                              .then(instruments => {
                                  //console.log(studios);
                                  res.render("current_listings", {studios: studios, instruments: instruments});
                              })
                              .catch(err => {console.log(err);});
                      })
                      .catch( err => {console.log(err);});
              })
              .catch(err => {console.log(err);});
        })
        .catch( err => {console.log(err);});
  } else res.render("login_required");
});

module.exports = router;
