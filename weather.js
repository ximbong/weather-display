$(document).ready(function() {

  if (navigator.geolocation) {
    var lat;
    var lon;
    var api;  //weather-api
    var api2; //google-map-api
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      api =
      `  https://api.apixu.com/v1/current.json?key=ae30be2cfa894468ab8133011171106&q=${lat},${lon}`;

      var imageUrl;

      api2 =
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAnirP2AnjGvgUxLaE2w6a1V93hnS0x0Z8`;


      //get exact place from longitude and latitude
      $.getJSON(api2, function(data) {
      var cityLongName,countryName;


      //extract names from the api
        for (let value of data.results[0].address_components) {
          if (value.types[0]=='administrative_area_level_1'||value.types[0]=='locality') {
            cityLongName=value.long_name;
          }

         if (value.types[0]=='country') countryName= value.long_name;

  }

           $('#city').html(cityLongName + ', '+countryName);
       if ((cityLongName+countryName).length>25){
            $('.info').css("width","60%");
          if ((cityLongName+countryName).length>20){
            $('.info').css("width","50%");
          }
        }
  });

      $.getJSON(api, function(data) {
        //display stuffs

        $("#icon").html(`<img src= ${data.current.condition.icon}>`);
        $("#weather").html(data.current.condition.text);
        $("#temp").html(data.current.temp_c + " &#8451");
        $("#feelslike").html(
          `Feels like: ${ data.current.feelslike_c } &#176;C`
        );
        $("#visibility").html(`Visibility: ${data.current.vis_km} km`);

        $("#humidity").html(`Humidity: ${data.current.humidity}%`);

        $("#option1").click(function() {
          $("#option1").addClass("active");
          $("#option2").removeClass("active");
          $("#temp").html(`${data.current.temp_c}   &#176; C`);
          $("#feelslike").html(
            `Feels like: ${data.current.feelslike_c} &#176; C`
          );
        });
        $("#option2").click(function() {
          $("#option2").addClass("active");
          $("#option1").removeClass("active");
          $("#temp").html(`${data.current.temp_f}   &#176; F`);
          $("#feelslike").html(
             `Feels like: ${data.current.feelslike_f} &#176; F`
          );
        });


        //background-image and weather icons
        var sunnyDay="https://i.ytimg.com/vi/3EXe5cx5S-0/maxresdefault.jpg";
        var night="https://cdn.shutterstock.com/shutterstock/videos/15667753/thumb/1.jpg"
        var cloudyDay="https://cdn.wallpapersafari.com/38/59/fSpF8D.png";
        var cloudyNight="http://rezalution.ca/images/20070119_cloudy_night.jpg"
        var snowyDay="https://pre00.deviantart.net/9079/th/pre/i/2013/328/b/8/snowy_day_2_by_thunderi-d6vilnq.jpg";
        var snowyNight="https://s-media-cache-ak0.pinimg.com/originals/e0/01/a5/e001a516eac06713f6f3952ac5770d1e.jpg";

        var rainyDay="https://az616578.vo.msecnd.net/files/responsive/cover/main/desktop/2016/08/13/6360670335816709561877596775_635838328234606825-1082304514_rainy_day_wallpaper_2.jpeg";
        var rainyNight="https://walkinginthemountains.files.wordpress.com/2015/02/rainy-night.jpg?w=800";
        var defaultDay="https://cdn.wallpapersafari.com/38/59/fSpF8D.png"
        var defaultNight="https://ak8.picdn.net/shutterstock/videos/19940371/thumb/1.jpg"
         if (data.current.is_day !== 1) {              $("#appname").css("color", "#ffffcc");}
        switch (data.current.condition.code) {
          case 1000:
             (data.current.is_day === 1) ? (imageUrl = sunnyDay ) : (imageUrl = night);

          break;

          case 1003:
          case 1006:
          case 1009:
          (data.current.is_day === 1) ? (imageUrl = cloudyDay ) : (imageUrl = cloudyNight);



            break;

          case 1066:
          case 1069:
          case 1072:
          case 1114:
          case 1117:
 (data.current.is_day === 1) ? (imageUrl = snowyDay ) : (imageUrl = snowyNight);


            break;
          case 1153:
          case 1063:
          case 1150:
          case 1180:
          case 1183:
          case 1186:
             (data.current.is_day === 1) ? (imageUrl = rainyDay ) : (imageUrl = rainyNight);
            break;

          default:
             (data.current.is_day === 1) ? (imageUrl = defaultDay ) : (imageUrl = defaultNight);

        }
        $("body").css("background-image", "url(" + imageUrl + ")");
      });
    });
  }
});
