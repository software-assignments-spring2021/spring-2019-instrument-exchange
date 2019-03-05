function LoginController() {

  function isValidPrice(price) {
  	if(price < 1 || price > 10000){
      return false;
    }
    return true;
  }

  return {
    isValidPrice
  }

}

module.exports = LoginController();
