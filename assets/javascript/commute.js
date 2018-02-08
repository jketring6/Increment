    


var departLocation = "";
var arriveLocation = "";


function getCommuteTime(departLocation, arriveLocation) {
    var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + departLocation + "&destinations=" + arriveLocation + "&key=AIzaSyBV2ruXz-bzml8rk9eIJJyQypcERMeSVhQ"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response)
        var commuteTime = response.rows[0].elements[0].duration.text;
        console.log(commuteTime)
       });

}    
  // Event handler for user clicking the select-weather button
  $("#addRoute").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the weather name
    var departLocation = $("#departInput").val().trim();
    var arriveLocation = $("#arriveInput").val().trim();

    // Running the searchBandsInTown function (passing in the weather as an argument)
    getCommuteTime(departLocation, arriveLocation);
  });


  function activatePlacesSearch() {
    var inputDepart = $("#departInput");
    var autocomplete = new google.maps.places.Autocomplete(inputDepart);
  }