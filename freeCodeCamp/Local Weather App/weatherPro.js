$(document).ready(function () {
  
  
  //display date and time
  var utcWeekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];     //caching the day of the week in array for utc integer
  var utcMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var today = new Date();
  var utcDay = today.getUTCDate();                                       //get today's date
  var weekDay = today.getUTCDay();                                       //get today's day of the week
  var month = today.getUTCMonth();                                      //get the month
  var year = today.getUTCFullYear();                                    //get the year

  $('#displayDate').text(utcWeekday[weekDay] + " " + utcDay + ", " + utcMonth[month] + " " + year);  //display the utc date


  //location and weather API
  var lat, lon, api_url,
      icons = new Skycons({"color": "white"});
  
  if ("geolocation" in navigator) {                                   //checking if geolocation is supported
    
    $(window).load(function () {
       navigator.geolocation.getCurrentPosition(gotLocation);

      function gotLocation(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        
        api_url = "https://api.forecast.io/forecast/325e8ba97ba243f26ba2a8b6252e66ed/" + lat + "," + lon + "?units=ca";

//WANT TO MAKE A HTTP REQUEST
    $.ajax({
      url: api_url,
      dataType: "jsonp",
      success: function (data) {
             console.log(data);
            //This is animation for cloud icon
            icons.set("showCloud", data.currently.icon);
            icons.play();

            var tempr = data.currently.temperature.toFixed(),                //temperature from the forecast API
                apparentTemp = data.currently.apparentTemperature.toFixed();
           
            $('#describe').text(data.currently.summary + ", it feels like " + apparentTemp + '°C');
            $('#result').text(tempr + '°C');
            $('#location').html('<b>'+ data.timezone + '</b>');
            $('#pressure').text('Pressure: ' + data.currently.pressure.toFixed() + 'mb |');
            $('#humidity').text('Humidity: ' + (data.currently.humidity * 100).toFixed() + '% |');
            $('#wind').text('Wind: ' + data["currently"]["windSpeed"].toFixed() + 'km/h');


            // Toggle Temperature in C or Fah
            $('#showTemp').on('click', function() {    //the anonymous function has closure over the outer function scope
             // displays the temp in Celsius

              var status = $('button').val();
              if(status == 'off') {
                fahrenheit();
               $('#showTemp').text('°C').toggleClass('fah');
               $('button').val('on');
              }
              else if(status == 'on') {
                celsius();
                $('#showTemp').text('°F').toggleClass('fah');
                 $('button').val('off');
              }
              
            });

            //converts celsius to fahrenheit

             function fahrenheit () {                                         
               var fah = tempr,
                   temp = apparentTemp;

               fah *= 9; temp *= 9;
               fah /= 5; temp /= 5;
               fah += 32; temp += 32;

               fah = fah.toFixed();
               temp = temp.toFixed();

               $('#result').text(fah + ' ° F');
               $('#describe').text(data.currently.summary + ", it feels like " + temp + '°F');
             }
            
            function celsius() {
              $('#result').text(tempr + ' ° C');
              $('#describe').text(data.currently.summary + ", it feels like " + apparentTemp + '°C');
            }


            }
         }); 
        }
    });
  }

  else {
    alert('Your browser doesnt support geolocation. Sorry.');
  }
  //FOOTER
  $('#footer').html('Lumex Creations &copy' + year + '. All Rights Reserved');

});
