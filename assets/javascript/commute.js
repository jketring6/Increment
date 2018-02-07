    


var departLocation = "";
var arriveLocation = "";

    var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + departLocation + "&destinations=" + arriveLocation + "&key=AIzaSyBV2ruXz-bzml8rk9eIJJyQypcERMeSVhQ"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
        console.log(response)
        
       });
