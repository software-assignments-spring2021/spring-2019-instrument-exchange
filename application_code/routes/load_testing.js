const express = require('express');
const router = express.Router();
const db = require('../db');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// authenticated route
router.get('/loadtest', function (req, res) {
    console.time('time');
    let str = "";
    let count = 10000000;
    while(count--) {
        str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    }
    const hashCount = 10;
    for (let i = 0; i < hashCount; i++) {
        const hashed = bcrypt.hashSync(str, 10);
    }
    console.timeEnd('time');
    res.render('laod_testing');
});

module.exports = router;