const express = require('express');
const router = express.Router();
const db = require('../db');
const notification = db.Notification;

// authenticated route
router.get('/notifications', function (req, res) {
    if (req.user) {
        notification.find({sellerId: req.user.id})
            .then(notifs => {
                console.log("Notifications are ", notifs);
                res.render('notification', {});
            })
            .catch(err => {
                console.log("error getting notifications");
            });

    }
    else res.render('login_required');
});

module.exports = router;