const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// loading the User Model
const User = require('./db').User;


module.exports = function (passport) {
    console.log("using local strategy");
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            // checking if user exists
            console.log("inside local");
            User.findOne({ email: email })
                .then( user => {
                    console.log("inside then");
                    if (!user) {
                        // could not find a user
                        console.log("User is not registered");
                        return done(null, false, {message: "The user is not registered"});
                    }
                    // user exists
                    // matching the password
                    bcrypt.compare( password, user.password, (err, match) => {
                            if (err) console.log(err);
                            if (match) {
                                console.log("User found, successful login");
                                return done(null, user);
                            } else {
                                // password mismatch
                                console.log("Password does not match");
                                return done(null, false, {message:"Password does not match"});
                            }
                        }

                    );
                })
                .catch( err => console.log(err))
        })
    );

    // serializing and deserializing for to maintain login session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) =>{
            done(err, user);
        });
    });
};
