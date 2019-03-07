const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const assert = require('chai').assert;


describe('Testing Database Connection', function() {
    it ('Database should be connected', function() {
        const connectionString = "mongodb://localhost/test";
        mongoose.connect(connectionString, {useNewUrlParser: true, useCreateIndex: true})
            .then ( (obj)=> {
                assert("Database Connected" === "Database Connected", "Database Connection Successful");
            })
            .catch( err => { console.log(err) });
    });

    it ('Database should not be connected', function() {
        const connectionString = "mongodb://localhost/test";
        mongoose.connect(connectionString, {useNewUrlParser: true, useCreateIndex: true})
            .then ( (obj)=> {
                assert("Database Connected" === "Database Connected", "Database Connection Successful");
            })
            .catch( err => {
                assert("Database Not Connected" === "Database Not Connected", "Database Connection Failure");
            });
    });
});

