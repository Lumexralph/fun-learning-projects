app.controller('pizzaController', [
    '$scope',
    function ($scope) {
        $scope.model = { 
            title: 'Pizza Builder',
            availableToppings: ['Cheese', 'Pepperoni', 'Bacon', 'Pineapple', 'Sausage', 'Ham', 'Chicken', 'Mushrooms', 'Onion', 'Olives', 'Green Peppers'],
            toppings: [],
            clicked: false
        };

        $scope.addTopping = function (topping) {
            $scope.model.toppings.push(topping);
            
            $scope.model.clicked = false;
            
            // clear the search after picking
            $scope.model.search = null;
        }
    }
]);