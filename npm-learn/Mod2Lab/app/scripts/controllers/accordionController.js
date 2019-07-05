
angular.module('mod2LabApp').controller('AccordionDemoCtrl', function ($scope) {
  $scope.oneAtATime = false;

  $scope.groups = [
    {
      title: 'CAtegory - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Category 2',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Category 2',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Category 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

});