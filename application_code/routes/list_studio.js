const express = require('express');
const router = express.Router();

router.get('/list_studio', function (req, res) {
    res.render('list_studio', { });
});

module.exports = router;