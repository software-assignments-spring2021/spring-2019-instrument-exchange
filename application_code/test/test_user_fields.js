const assert = require('chai').assert;
const db = require('../db');

describe('Testing user fields', function() {
    var user = new db.Use();
    user.firstName = 'Jonathan';

    it('Firstname should equal given string', function() {
        assert(user.firstName === 'Jonathan', 'Equals given string');
    });

    it('Firstname should be type string', function() {
        assert.typeOf(user.firstName, "string");
    });
});
