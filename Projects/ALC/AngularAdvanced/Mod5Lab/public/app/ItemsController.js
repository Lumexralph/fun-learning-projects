angular.module('app')
      .controller('ItemsController', [
        function () {
          var vm = this;
          vm.items = [
            'first', 'second', 'third', 'fourth'
          ];
        }
      ]);

// There are different conventions for directory structure. There is no right or wrong, but remember that when you work on a team, it's best to follow an agreed upon convention. The most common is the structure we have used: - app - home - index.html - items - index.html - app.js - HomeController.js - ItemsController.js
// This is another convention: - app - views - home.html - items.html - controllers - HomeController.js - ItemsController.js - app.js