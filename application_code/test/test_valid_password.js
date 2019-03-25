var assert = require('assert');
const db = require('../db');



describe('Testing Empty Password', function(){
  it('should return true if non-empty', function(){
      user = db.User();
      user.password = "password";
      assert.equal(user.password  !== "", true)
  });

  it('should return false if empty', function(){
      user = db.User();
      user.password = "";
      assert.equal(user.password  !== "", false)

  });


});

