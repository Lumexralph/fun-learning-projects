angular.module('app')
      .controller('friendController', ['friendService',
        function (friendService) {
          var fvm = this;
          fvm.friends = [];
          fvm.getFriendList = getFriendList;
          
          // execute friend search
          function getFriendList() {
            friendService.getFriends().then((result) => {
              fvm.friends = result;
            });
          }
        }
      ]);