const express = require('express');
const router = express.Router();
const db = require('../db');
const Cart = require('../cart');

const Studio = db.Studio;
const Instrument = db.Instrument;

router.get('/shopping_cart', function (req, res, next) {

  // Studio.find({inCart: true}).then(studios => {
  //   Instrument.find({inCart: true}).then(instruments => {
        res.render("shopping_cart");
  //   });
  // });

});

module.exports = router;
