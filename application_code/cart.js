module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalPrice = oldCart.totalPrice || 0 ;

  this.add = function(item, id) {
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {item: item, price: 0};
      storedItem.price = storedItem.item.rentalPrice;
      this.totalPrice += storedItem.price;
    }
  }

  this.generateArray = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  }

};
