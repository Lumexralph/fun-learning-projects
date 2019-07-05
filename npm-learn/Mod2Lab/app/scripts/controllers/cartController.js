
angular.module('mod2LabApp')
    .controller('CartController', cartOperations);

function cartOperations() { 

  this.cartItems = JSON.parse(localStorage.getItem('cartItems'));

  this.calculateTotal = calculateTotal;
  this.removeItemFromCart = removeItemFromCart;
  this.totalCostOfItem = totalCostOfItem;
  this.checkoutOperation = checkoutOperation;
  this.finalCheckout = finalCheckout;

  this.shippingDetails = {};
  this.total  = 0;
  this.shippingCost = 10;
  this.tax = 10;
  this.sumAlltotal = 0;
  this.checkout = false; 

  if (!this.cartItems) {
    localStorage.setItem('cartItems', JSON.stringify([]));
  }
  
  console.log('from cart', Array.isArray(JSON.parse(localStorage.getItem('cartItems'))));
}

function totalCostOfItem(price, quantity) {
  let total = price  * quantity;

  // to 2 decimal places
   return precisionRound(total, 2);

}

function calculateTotal() {
  let items = JSON.parse(localStorage.getItem('cartItems'));

  let totalPrice = items.reduce((a, b) => a + (Number(b.price) * Number(b.quantity)), 0);

  // update total price
  this.total =  precisionRound(totalPrice, 2);

  // calculate the whole total
  let totalWithAdditionalCost = (this.total + ((this.total * this.tax) / 100) ) + this.shippingCost;

  this.sumAlltotal = precisionRound(totalWithAdditionalCost, 2);
  // let num = this.total + subtotal;

  // this.total = Math.round((num + 0.00001) * 100) / 100;

  // console.log('from calc total :', this.total);
  // console.log('from calc justNum :', justNum);
}

function removeItemFromCart(index, price, quantity) {
  // // reset the total because localStorage
  // // cartitems array will change and total recalculated
  // this.total = 0;
  // let presentItemCost = this.totalCostOfItem(price, quantity);

  // // as items are removed, it should be duducted from total
  // this.total = this.total - presentItemCost;

  let items = JSON.parse(localStorage.getItem('cartItems'));

  // remove that item from table
  items.splice(index, 1);

   // update the localStorage
   localStorage.setItem('cartItems', JSON.stringify(items));

   this.cartItems = JSON.parse(localStorage.getItem('cartItems'));

  //  update total
  this.calculateTotal();

   console.log('from remove item :', this.total);
  
}

// put value in decimal places
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

// handle user checkout
function checkoutOperation() {
  this.checkout = true;
}

// handle checkout after shipping details
// are correctly filled 
function finalCheckout(shippingInfo) {
  
  alert(`Username: ${shippingInfo.user}\n
         Address: ${shippingInfo.address}\n
         City: ${shippingInfo.city}\n
         Phonenumber: ${shippingInfo.phonenumber}\n`);

}