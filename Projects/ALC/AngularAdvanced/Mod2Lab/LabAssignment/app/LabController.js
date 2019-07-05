angular.module('app').controller('LabController', [
    function () {
        var vm = this;

        vm.displayName = displayName;

        vm.authors = [
            {
                name: 'Ogundele Olu',
                nationality: 'Nigeria',
                date: '1999 - 2006'
            },
            {
                name: 'Ogundele Olumi',
                nationality: 'Nigeria',
                date: '1999 - 2006'
            },
            {
                name: 'Ogunbiyi Olusola',
                nationality: 'Nigeria',
                date: '1999 - 2006'  
            },
            {
                name: 'Ogundele Olumide',
                nationality: 'Nigeria',
                date: '1999 - 2006'
            },
            {
                name: 'Aya Adefala',
                nationality: 'Nigeria',
                date: '1999 - 2006'
            },
            {
                name: 'Nworiji Ikechukwu',
                nationality: 'Nigeria',
                date: '1999 - 2006'
            }
      ];

      function displayName(data) {
          alert(`The name is ${data.name}`);          
      }
    }
]);