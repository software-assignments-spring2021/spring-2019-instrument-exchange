const assert = require('chai').assert;
const test = require('../app');

describe('Initial Test', function() {
    it('it should return hello', function() {
        assert(test.greet() === "hello", "hello is hello");
    });
});

