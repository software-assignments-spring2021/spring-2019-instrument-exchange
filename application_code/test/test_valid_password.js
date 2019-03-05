var assert = require('assert');
var loginController =  require('../../controllers/login.controller');

describe('LoginController', function () {

  describe('isValidUserId', function(){

    it('should return true if valid user id', function(){
      var isValid = loginController.isValidUserId('abcdefgh123')
      assert.equal(isValid, true);
    });

    it('should return false if invalid user id', function(){
      var isValid = loginController.isValidUserId('xyz12')
      assert.equal(isValid, false);
    });

    it('should return false if invalid user id', function(){
      var isValid = loginController.isValidUserId('xyzabcdedf')
      assert.equal(isValid, false);
    });

  });

});
