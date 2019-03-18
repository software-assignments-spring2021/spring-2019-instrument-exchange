const express = require('express');
const router = express.Router();

router.get('/studio_list', function (req, res) {
    res.render('list_studio', { });
});

router.post('/list_studio', function (req, res) {

});

module.exports = router;