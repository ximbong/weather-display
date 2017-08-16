$(document).ready(function() {
  var lat;
  var lon;
  var api;
  var api2;
  function trans(str){
    str=str.replace(/ê|ế|ề|ể|ệ|ễ|é|è|ẻ|ẹ|ẽ/g,'e');
    str=str.replace(/á|à|ả|ã|ạ|ấ|ầ|ậ|ẫ|ẩ|ắ|ằ|ẳ|ẵ|ặ/g,'a');
    str=str.replace(/ú|ù|ủ|ũ|ụ|ứ|ừ|ử|ữ|ự/g,'u');
    str=str.replace(/ó|ò|ỏ|õ|ọ|ớ|ờ|ở|ỡ|ợ|ố|ồ|ổ|ỗ|ộ/g,'o');
    str=str.replace(/í|ì|ỉ|ĩ|ị/g,'o');
    return str;
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      api =
        "https://api.apixu.com/v1/current.json?key=ae30be2cfa894468ab8133011171106&q=" +
        lat +
        "," +
        lon;
      var imageUrl;

      api2 =
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        lon +
        "&key=AIzaSyAnirP2AnjGvgUxLaE2w6a1V93hnS0x0Z8";

      //test
      $.getJSON(api2, function(data) {
      var a,b;

          console.log(api2);
          console.log(data.results[0].formatted_address)

       for (var i=0; i<data.results[0].address_components.length; i++){
         if (data.results[0].address_components[i].types[0]=='administrative_area_level_1'||data.results[0].address_components[i].types[0]=='locality') a= data.results[0].address_components[i].long_name;

         if (data.results[0].address_components[i].types[0]=='country') b= data.results[0].address_components[i].long_name;

      }

           $('#city').html(trans(a) + ', '+trans(b));
        // if(b=='Việt Nam'||b=='Vietnam'){
          // $('#city').css("font-family","Maitree");
          if ((a+b).length>20){
            $('.info').css("width","50%");
          }
           if ((a+b).length>25){
            $('.info').css("width","60%");
          }
        // }

      });

      $.getJSON(api, function(data) {
        //display stuffs

        $("#icon").html('<img src="http:' + data.current.condition.icon + '">');
        $("#weather").html(data.current.condition.text);
        $("#temp").html(data.current.temp_c + " &#8451");
        $("#feelslike").html(
          "Feels like: " + data.current.feelslike_c + " &#176;C"
        );
        $("#visibility").html("Visibility: " + data.current.vis_km + "km");

        $("#humidity").html("Humidity: " + data.current.humidity + "%");

        $("#option1").click(function() {
          $("#option1").addClass("active");
          $("#option2").removeClass("active");
          $("#temp").html(data.current.temp_c + " &#176; C");
          $("#feelslike").html(
            "Feels like: " + data.current.feelslike_c + " &#176; C"
          );
        });
        $("#option2").click(function() {
          $("#option2").addClass("active");
          $("#option1").removeClass("active");
          $("#temp").html(data.current.temp_f + " &#176; F");
          $("#feelslike").html(
            "Feels like: " + data.current.feelslike_f + " &#176; F"
          );
        });

        //weather icon
        switch (data.current.condition.code) {
          case 1000:
            if (data.current.is_day === 1) {
              imageUrl = "https://i.ytimg.com/vi/3EXe5cx5S-0/maxresdefault.jpg";
            } else {
              imageUrl =
                "https://cdn.shutterstock.com/shutterstock/videos/15667753/thumb/1.jpg";
              $("#appname").css("color", "#ffffcc");
            }

            break;

          case 1003:
          case 1006:
          case 1009:
            if (data.current.is_day === 1) {
              imageUrl = "http://cdn.wallpapersafari.com/38/59/fSpF8D.png";
            } else {
              imageUrl =
                "http://rezalution.ca/images/20070119_cloudy_night.jpg";
              $("#appname").css("color", "#ffffcc");
            }

            break;

          case 1066:
          case 1069:
          case 1072:
          case 1114:
          case 1117:
            if (data.current.is_day === 1) {
              imageUrl =
                "http://www.menshealth.com/sites/menshealth.com/files/2015/04/snow-day.jpg";
            } else {
              imageUrl =
                "https://s-media-cache-ak0.pinimg.com/originals/e0/01/a5/e001a516eac06713f6f3952ac5770d1e.jpg";
              $("#appname").css("color", "#ffffcc");
            }
            break;
          case 1153:
          case 1063:
          case 1150:
          case 1180:
          case 1183:
          case 1186:
            if (data.current.is_day === 1) {
              imageUrl =
                "https://az616578.vo.msecnd.net/files/responsive/cover/main/desktop/2016/08/13/6360670335816709561877596775_635838328234606825-1082304514_rainy_day_wallpaper_2.jpeg";
            } else {
              imageUrl =
                "https://walkinginthemountains.files.wordpress.com/2015/02/rainy-night.jpg?w=800";
              $("#appname").css("color", "#ffffcc");
            }
            break;

          default:
            if (data.current.is_day === 1) {
              imageUrl = "http://cdn.wallpapersafari.com/38/59/fSpF8D.png";
            } else {
              imageUrl =
                "https://ak8.picdn.net/shutterstock/videos/19940371/thumb/1.jpg";
              $("#appname").css("color", "#ffffcc");
            }
        }
        $("body").css("background-image", "url(" + imageUrl + ")");
      });
    });
  }
});
