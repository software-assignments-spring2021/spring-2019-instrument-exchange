const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Instrument = require('../db').Instrument;
const InstrumentListing = require('../db').InstrumentListing;

const storage = multer.diskStorage({
    destination: './public/uploads/instruments',
    filename: function (req, file, cb) {
        cb(null, req.user._id + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkType(file, cb);
    }
}).array('instrument_pictures', 10); // can upload maximum of 10 images


function checkType(file, cb) {
    const permitted = /jpeg|jpg|png|gif/;
    const ext = permitted.test(path.extname(file.originalname).toLowerCase());
    const mimetype = permitted.test(file.mimetype);

    if (ext && mimetype) {
        return cb(null, true);
    } else {
        cb("Images Only");
    }
}

// authenticated view
router.get('/instrument_list', function (req, res) {
    if (req.user) {
      res.render('list_instrument', {  });
      console.log("LIST INSTRUMENT RENDERED");
    }
    else res.render("login_required");
});

// something happening here
router.post('/list_instrument', function (req, res) {
    upload(req, res, (err) => {
        if (err) {
            if (err.code === "LIMIT_UNEXPECTED_FILE")
                res.render('list_instrument', {error: "Cannot upload more than 10 images"});
            else if (err === "Images Only")
                res.render('list_instrument', {error: "Uploaded files have to one of these types (jpeg | jpg | png | gif)"});
            else
                console.log(err);
        }
        else {
            // gathering necessary info and creating an instrument model.
            let pictures = req.files.map( ele => {
                return ele.filename;
            });

            // error checking
            // checking if at least three pictures are included or if all the fields are filled.
            if (pictures.length === 0) {
                res.render('list_instrument', {error: "You need to select at least one image"})
            } else if (req.body.name === "" || req.body.category === "" || req.body.weight === "" ||
            req.body.rental_price === "" || req.body.purchase_price === "" || req.body.description === "") {
                res.render('list_instrument', {error : "All fields must be filled out"});
            } else {
                const newInstrument = new Instrument({
                    name: req.body.name,
                    address: req.body.location,
                    zip: req.body.zip,
                    category: req.body.chosenCategory,
                    weight: req.body.weight,
                    pictures: pictures,
                    coverPicture: pictures[0],
                    description: req.body.description,
                    rentalPrice: req.body.rental_price,
                    purchasePrice: req.body.purchase_price
                });


                newInstrument.save()
                    .then(instrument => {
                        console.log("new instrument created");
                        console.log(instrument);
                        // creating a model for Instrumentlisting
                        const newInstrumentListing = new InstrumentListing({
                            instrumentId: instrument._id.toString(),
                            sellerId: req.user._id.toString()
                        });

                        // saving the entry in the database.
                        newInstrumentListing.save()
                            .then(listing => {
                                console.log("listing created");
                                console.log(listing);
                                res.redirect('/seller_portal');
                            })
                            .catch(err => {
                                console.log(err);
                            });

                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    });

});

module.exports = router;
