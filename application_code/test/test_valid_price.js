var assert = require('assert');
var loginController =  require('../../controllers/test_valid_price');

describe('LoginController', function () {

  describe('isValidPrice', function(){

    it('should return true if valid price', function(){
      var isValid = loginController.isValidPrice('1000')
      assert.equal(isValid, true);
    });

    it('should return false if invalid price', function(){
      var isValid = loginController.isValidPrice('-5')
      assert.equal(isValid, false);
    });

    it('should return false if invalid user id', function(){
      var isValid = loginController.isValidPrice('100000')
      assert.equal(isValid, false);
    });

  });

});
