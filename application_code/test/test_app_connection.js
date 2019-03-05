const assert = require('chai').assert;
const app = require('../app');

describe('Initial Test', function() {
    it('it should return hello', function() {
        assert(app.greet() === "hello", "hello is hello");
    });

    it('The type should be a string', function() {
        assert.typeOf(app.greet(), "string");
    });
});