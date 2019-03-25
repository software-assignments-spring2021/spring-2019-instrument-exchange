var assert = require('assert');
const db = require('../db');



describe('Testing phone number', function(){
  it('should return true if 10 digits long', function(){
      user = db.User();
      user.phoneNumber = 1234567890;
      assert.equal( user.phoneNumber.toString().length == 10, true);
  });

  it('should return true if less than 10 digits', function(){
    user = db.User();
    user.phoneNumber = 123456789;
    assert.equal( user.phoneNumber.toString().length < 10, true);
    assert.equal( user.phoneNumber.toString().length >= 10, false);
  });
  it('should return false if more than 10 digits', function(){
    user = db.User();
    user.phoneNumber = 12345678901;
    assert.equal( user.phoneNumber.toString().length > 10, true);
    assert.equal( user.phoneNumber.toString().length <= 10, false);
  });

});

