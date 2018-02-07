function getLocalWeather(city) {
   
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=d8d64a31b79e4c92c420bd81c4289876";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    	var tempF = Math.floor((9/5)*(response.main.temp - 273) + 32)
    	var conditions = response.weather[0].description
    	console.log(conditions)
        $(".show-weather").append('<p>'+ tempF)
        console.log(response)

        if (conditions == "clear sky") {
        	$(".show-weather").append("<img class='weather-img' src='assets/images/clear-sky-weather.png'>")
        }

        else if (conditions == "few clouds") {
        	$(".show-weather").append("<img class='weather-img' src='assets/images/few-clouds-weather.png'>")
        }

        else if (conditions == "scattered clouds") {
        	$(".show-weather").append("<img class='weather-img' src='assets/images/scattered-clouds-weather.png'>")
        }

        else if (conditions == "broken clouds") {
        	$(".show-weather").append("<img class='weather-img' src='assets/images/broken-clouds-weather.png'>")
        }

        else if (conditions == "shower rain") {
        	$(".show-weather").append("<img class='weather-img' src='assets/images/shower-rain-weather.png'>")
        }
        else if (conditions == "light rain") {
        	$(".show-weather").append("<img class='weather-img' src='assets/images/shower-rain-weather.png'>")
        }

        else if (conditions == "rain") {
        	$(".show-weather").append("<img class='weather-img' src='assets/images/rain-weather.png'>")
        }

        else if (conditions == "thunderstorm") {
        	$(".show-weather").append("<img class='weather-img' src='assets/images/thunderstorm-weather.png'>")
        }

        else if (conditions == "snow") {
        	$(".show-weather").append("<img class='weather-img' src='assets/images/snow-weather.png'>")
        }

        else if (conditions == "mist") {
        	$(".show-weather").append("<img class='weather-img' src='assets/images/mist-weather.png'>")
        }
        
       });

  }

  // Event handler for user clicking the select-weather button
  $("#addCity").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the weather name
    var city = $("#cityInput").val().trim();

    // Running the searchBandsInTown function (passing in the weather as an argument)
    getLocalWeather(city);
  });