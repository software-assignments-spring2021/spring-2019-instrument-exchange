const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Studio = require('../db').Studio;
const StudioListing = require('../db').StudioListing;

const storage = multer.diskStorage({
    destination: './public/uploads/studios',
    filename: function (req, file, cb) {
        cb(null, req.user._id + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    // fileFilter: function (req, file, cb) {
    //     checkType(file, cb);
    // }
}).array('studio_pictures', 3); // requiring at least three pictures


function checkType(file, cb) {
    const permitted = /jpeg|jpg|png|gif/;
    const ext = permitted.test(path.extname(file.originalname).toLowerCase());
    const mimetype = permitted.test(file.mimetype);

    if (ext && mimetype) {
        return cb(null, true);
    } else {
        cb("Images Only!");
    }
}


// authenticated view
router.get('/studio_list', function (req, res) {
    if (req.user) res.render('list_studio', {  });
    else res.render("login_required");
});



router.post('/list_studio', function (req, res) {
    upload(req, res, (err) => {
        if (err) console.log(err);
        else {
            // gathering necessary info and creating a studio model.
            let pictures = req.files.map( ele => {
                return ele.filename;
            });
            // error checking
            // checking if at least three pictures are included.
            if (pictures.length < 3) {
                res.render('list_studio', {error: "You need to select at least 3 images"})
            }
            // check for empty field in the form
            if (req.body.location === "" || req.body.rental_price === "" || req.body.description === "") {
                res.render('list_studio', {error : "All fields must be filled out"});
            }

            // creating the studio model and saving it to database.
            const newStudio = new Studio({
                address: req.body.location,
                pictures: pictures,
                description: req.body.description,
                rentalPrice: req.body.rental_price
            });

            newStudio.save()
                .then(studio => {
                    console.log("new studio created");
                    console.log(studio);
                    // creating a model for studiolisting
                    const newStudioListing = new StudioListing({
                        studioId: studio._id.toString(),
                        sellerId: req.user._id.toString(),
                        booked: []
                    });

                    // saving the entry in the database.
                    newStudioListing.save()
                        .then(listing => {
                            console.log("listing created");
                            console.log(listing);
                            res.redirect('/seller_portal');
                        })
                        .catch(err=> {
                            console.log(err);
                        });

                })
                .catch( err => {
                    console.log(err);
                });
        }
    });

});

module.exports = router;
