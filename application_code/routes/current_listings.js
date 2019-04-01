const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const Instrument = require('../db').Instrument;
const InstrumentListing = require('../db').InstrumentListing;


router.get('/show_listings', (req, res) => {
  render('current_listings');
})
// authenticated view
router.get('/current_listings', function (req, res) {
    if (req.user) {
      //res.render('current_listings', {user: req.user});
      console.log(req.user.username);
      console.log("CURRENT LISTINGS RENDERED");
      console.log(req.user._id.toString());
      InstrumentListing.find({sellerId: req.user._id.toString()}, (err, listing) => {
        console.log("Before finding instrument");
        console.log(listing[0].instrumentId);
        listing.forEach(x => {
          Instrument.findById(x.instrumentId, (err, instruments) =>{ 
            if(err){
              // res.render('current_listings', {'error': true});

              res.send({ 'current_listings': null});
            } else {
              console.log("Something was found");
              console.log(instruments);
              console.log(x);
              // res.render('current_listings', {'instruments_user': instruments});
              res.send({ 'current_listings': x});

            }
          
        });
        })

        console.log("End of finding something");
        // doc is  each row or a list of rows in the table.
        // {user: john, ...}, [{}, {}, {}]
        // {
        //   instrumentId: "Something Here";
        // }

        //res.redirect('seller_portal');
      })

    }
    else res.send("login_required");
});






module.exports = router;
