const express = require('express');
const router = express.Router();
const db = require('../db');
const mongoose = require('mongoose');
const notification = db.Notification;

// authenticated route
router.get('/notifications', function (req, res) {
    if (req.user) {
        notification.find({sellerId: mongoose.Types.ObjectId(req.user.id)})
            .then(notifs => {
                console.log("notifications found ", notifs);
                const studioNotif = [];
                const insNotif = [];
                for (const notif of notifs) {
                    if (notif.itemType === "Instrument") {
                        insNotif.push({buyerName: notif.buyerName, itemName: notif.itemName});
                    } else {
                        console.log(notif.buyerName);
                        studioNotif.push({buyerName: notif.buyerName, itemName: notif.itemName});
                    }
                }
                // console.log("instrument notification ", insNotif);
                // console.log("studio notification " ,studioNotif);

                res.render('notification', {studioBuyers: studioNotif, instrumentBuyers: insNotif});
            })
            .catch(err => {
                console.log("error getting notifications");
            });

    }
    else res.render('login_required');
});

module.exports = router;