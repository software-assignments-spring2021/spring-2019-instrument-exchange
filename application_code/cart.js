module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalPrice = oldCart.totalPrice || 0 ;
  this.numItems = oldCart.numItems || 0;

  // Need to add daysRented functionality
  this.addRental = function(item, id) {
    var storedItem = this.items[id];
    if (!storedItem) {
      // Create a stored item if it doesn't exist and increment the fields
      storedItem = this.items[id] = {item: item, price: 0, daysRented: 0, cumulativeDaysPrice: 0};
      storedItem.daysRented = storedItem.item.daysRented;
      storedItem.price = storedItem.item.rentalPrice;
      storedItem.cumulativeDaysPrice = storedItem.price * storedItem.daysRented;
      // Total price of items in the cart
      this.totalPrice += storedItem.cumulativeDaysPrice;
    }
    this.numItems++;
  }

  this.addPurchase = function(item, id) {
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {item: item, price: 0};
      storedItem.price = storedItem.item.rentalPrice;
      this.totalPrice += storedItem.price;
    }
    this.numItems++;
  }

  this.deleteItem = function(id) {
    var storedPrice = this.items[id].price;
    delete this.items[id];
    this.numItems--;
    this.totalPrice -= storedPrice;
  }

  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  }

};
