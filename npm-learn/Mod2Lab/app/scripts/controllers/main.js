'use strict';

/**
 * @ngdoc function
 * @name mod2LabApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mod2LabApp
 */
angular.module('mod2LabApp')
  .controller('MainCtrl', [ 'MainService','$scope',
    function (mainService, $scope) {
      this.data = [];
      this.active = 0;
      this.toggleOn = 1;
      this.imageSrc = [];
      // this.randomNumber = function() {
      //   return Math.floor((Math.random() * this.imageSrc.length));
      // };

      let cart = JSON.parse(localStorage.getItem('cartItems'));

      if (!cart) {
        localStorage.setItem('cartItems', JSON.stringify([]));      
      }

      mainService.message().then(result => {
        this.data = result.data;
        console.log('data from mainController', this.data);
        let data = this.data;
               
        // generate items for the carousel imageSrc array
        for (let i = 0, j = 0; j < 4; j++, i++) {

          i = i < data.length ? i : 0;
          let subcategory = data[i].subcategories;

          let items = _.shuffle(subcategory)[0].items;

          // if items exist in the category
          if(items[0]) {
            // check the length of item
            let itemsLength = items.length;
            let item = _.shuffle(items)[0];

            // add item for image carousel
            this.imageSrc.push(item);
          }
          
        }
       
        
        console.log(this.imageSrc);
      });

    }
  ]);
