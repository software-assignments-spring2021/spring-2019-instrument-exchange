const express = require('express');
const router = express.Router();
const db = require('../db');

const Studio = db.Studio;
const Instrument = db.Instrument;

router.get('/shopping_cart', function (req, res, next) {
    Studio.find({inCart: true}).then(studios => {
      console.log(studios);
      Instrument.find({inCart: true}).then(instruments => {
          res.render("shopping_cart", {studios: studios, instruments: instruments});
      });
    });

});

module.exports = router;
