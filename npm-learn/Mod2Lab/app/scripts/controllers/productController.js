'use strict';

angular.module('mod2LabApp')
    .controller('ProductController', ['MainService', '$routeParams',
    function (mainService, $routeParams) {

      this.params = $routeParams;
      this.quantity = 1;
      this.addItemToCart = addItemToCart;

      console.log(this.quantity);

      // check if cart exists or initialize
      let cartProduct = JSON.parse(localStorage.getItem('cartItems'));

      if (!cartProduct) {
        localStorage.setItem('cartItems', JSON.stringify([]));      
      }

      let allProducts = [];

      // inject data from API
      mainService.message().then(result => {
        let data = result.data;

        // spread out all the items
        data.forEach(el => {
          el.subcategories.forEach(el => {
              allProducts.push(...el.items);
        
          });
        });

        this.product = allProducts.find(el => el.name === this.params.name);

        console.log('data from ProductController', this.product);
      }
    );

    function addItemToCart(item) {
      let quantity = this.quantity;
      console.log(quantity);

      let cart = JSON.parse(localStorage.getItem('cartItems'));

      let productExistIndex = cart.findIndex(element => element.name === item.name);
      

      // check if product exists
      if (productExistIndex >= 0) {
          // get that product
          cart[productExistIndex].quantity = cart[productExistIndex].quantity + quantity;
          
          // update the localStorage
          localStorage.setItem('cartItems', JSON.stringify(cart));

      } else {
        item.quantity = quantity;
        cart.push(item);

        // update the localStorage
        localStorage.setItem('cartItems', JSON.stringify(cart));
      }       

      console.log(cart, Array.isArray(cart), item);      
    }
      
    }
  ]);
