const express = require('express');
const router = express.Router();
const Instrument = require('../db').Instrument;
const Studio = require('../db').Studio;

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


router.get("/studio_detail/:id", function(req, res) {
    if (req.user) {
        const studioId = req.params.id;
        Studio.findOne({"_id": studioId})
            .then(studio => {
                res.render("studio_detail", {studio: studio});
            })
            .catch(err => console.log(err));
    }  else res.render("login_required");
});


router.get("/instrument_detail/:id", function(req, res) {
    if (req.user) {
        const instrumentId = req.params.id;
        Instrument.findOne({"_id": instrumentId})
            .then(instrument => {
                res.render("instrument_detail", {instrument: instrument});
            })
            .catch(err => console.log(err));
    }  else res.render("login_required");
});

module.exports = router;