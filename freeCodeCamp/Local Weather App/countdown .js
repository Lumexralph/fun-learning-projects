// It is a good idea to avoid making your variables and functions global
 var proj = {};

 proj.countdown = function (settings, callback) {  //method for app object
   var interval,
       counter = 0,
       
         //start and end timer
         beginAt = 0,
         endAt = 0;

         if (settings === undefined) {
            console.log('Please provide settings');
         }
         else {
            if (settings.beginAt === undefined || settings.endAt === undefined) {
               console.log('please provide start and end number..');
            } else {
               beginAt = parseInt(settings.beginAt, 10);
               endAt = parseInt(settings.endAt, 10);

               if (!isNaN(beginAt) && !isNaN(endAt)) {
                  //start countdown
                  counter = beginAt;

                  interval = setInterval(function () {
                     if (callback !== undefined) {
                        callback(counter);
                     };
                     counter++;

                     if(counter === endAt + 1) {
                        clearInterval(interval);
                     }
                  }, 1000);
                }
               };
            };
         }

         function displayCount (count) {
            console.log(count);
         }