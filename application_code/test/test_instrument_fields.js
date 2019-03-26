const assert = require('chai').assert;
const db = require('../db');

describe('Testing instrument fields', function(){
    var instrument = new db.Instrument();
    instrument.weight = 10;
    instrument.name = 'Oboe';
    it ('Instrument name should equal given string', function() {
        assert(instrument.name === 'Oboe', 'Should equal given string');
    })

    it ('Instrument weight should equal given int', function() {
        assert(instrument.weight == 10, 'Should equal given weight');
    })
})
