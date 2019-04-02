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
                  //console.log(studios);
                  // doing the same thing to get all the instruments
                  InstrumentListing.find({sellerId: req.user._id})
                      .then(instrumentListings => {
                          //console.log(studioListings);
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

// router.get('/show_listings', (req, res) => {
//   render('current_listings');
// })
// // authenticated view
// router.get('/current_listings', function (req, res) {
//     if (req.user) {
//       //res.render('current_listings', {user: req.user});
//       console.log(req.user.username);
//       console.log("CURRENT LISTINGS RENDERED");
//       console.log(req.user._id.toString());
//       InstrumentListing.find({sellerId: req.user._id.toString()}, (err, listing) => {
//         console.log("Before finding instrument");
//         console.log(listing[0].instrumentId);
//         listing.forEach(x => {
//           Instrument.findById(x.instrumentId, (err, instruments) =>{
//             if(err){
//               // res.render('current_listings', {'error': true});
//
//               res.send({ 'current_listings': null});
//             } else {
//               console.log("Something was found");
//               console.log(instruments);
//               console.log(x);
//               // res.render('current_listings', {'instruments_user': instruments});
//               res.send({ 'current_listings': x});
//
//             }
//
//         });
//         })
//
//         console.log("End of finding something");
//         // doc is  each row or a list of rows in the table.
//         // {user: john, ...}, [{}, {}, {}]
//         // {
//         //   instrumentId: "Something Here";
//         // }
//
//         //res.redirect('seller_portal');
//       })
//
//     }
//     else res.send("login_required");
// });






module.exports = router;
