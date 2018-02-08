// ===========================================================Firebase login/ user login ===========================================================

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAUZ6srtHsxIDDM-3zeuXAQr6C733mm_og",
    authDomain: "project-1-c7fd4.firebaseapp.com",
    databaseURL: "https://project-1-c7fd4.firebaseio.com",
    projectId: "project-1-c7fd4",
    storageBucket: "",
    messagingSenderId: "612657157904"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var auth = firebase.auth();
  var userID;

 $(document).on("click","#logIn", function() {
    event.preventDefault();
    var email = $("#emailInput").val();
    var pass = $("#passInput").val();
    console.log(email)
    console.log(pass)
    var auth = firebase.auth();
    var promise =   auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
    });


$(document).on("click","#signUp", function() {
  event.preventDefault();
    var email = $("#emailInput").val();
    var pass = $("#passInput").val();
    console.log(email)
    console.log(pass)
    var auth = firebase.auth();
    var promise =   auth.createUserWithEmailAndPassword(email, pass)
    promise.catch(e => console.log(e.message));
})



$(document).on("click","#logOut", function() {
  event.preventDefault();
  firebase.auth().signOut();
})

auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      $("#logOut").removeClass("hide");
      console.log(firebaseUser);
      console.log(firebaseUser.uid);
      userID = firebaseUser.uid
      //Need to make each of the first branches from firebase correspond to a single user
    } else {
      console.log("Not logged in");
      $("#logOut").addClass("hide");
  }

   database.ref("/user").set({
      userID: userID,
    });
});

$("#journal-entry").on("click", function(event) {
      event.preventDefault();
      journalEntry = $("#journal-entry").val().trim();
   database.ref("user").child(userID).append({
          journalEntry: journalEntry,
          dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
}); 


// =========================================================== NEWS ================================================================


     var queryURL = 'https://newsapi.org/v2/top-headlines?' +
         'country=us&' +
         'apiKey=90dcb619e6ce411f953e53b282297dee';

     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function(newsResponse) {
         console.log(newsResponse);

         var topHeadlineZero = newsResponse.articles[0].title;
         var topHeadlineZeroUrl = newsResponse.articles[0].url;
         var topHeadlineZeroSource = newsResponse.articles[0].source.name;
         var topHeadlineZeroSourceUrl = newsResponse.articles[0].source.name;

         $("#news1-here").append('<a href="' + topHeadlineZeroUrl + '">' + topHeadlineZero + '</a>');
         $("#source1-here").append('<a href="' + topHeadlineZeroSourceUrl + '">' + topHeadlineZeroSource + '</a><hr>');

         ////////////////////////

         var topHeadlineOne = newsResponse.articles[1].title;
         var topHeadlineOneUrl = newsResponse.articles[1].url;
         var topHeadlineOneSource = newsResponse.articles[1].source.name;
         var topHeadlineOneSourceUrl = newsResponse.articles[1].source.name;
         

         $("#news2-here").append('<a href="' + topHeadlineOneUrl + '">' + topHeadlineOne + '</a>');
         $("#source2-here").append('<a href="' + topHeadlineOneSourceUrl + '">' + topHeadlineOneSource + '</a><hr>');

         ////////////////////////

         var topHeadlineTwo = newsResponse.articles[2].title;
         var topHeadlineTwoUrl = newsResponse.articles[2].url;
         var topHeadlineTwoSource = newsResponse.articles[2].source.name;
         var topHeadlineTwoSourceUrl = newsResponse.articles[2].source.name;
         

         $("#news3-here").append('<a href="' + topHeadlineTwoUrl + '">' + topHeadlineTwo + '</a>');
         $("#source3-here").append('<a href="' + topHeadlineTwoSourceUrl + '">' + topHeadlineTwoSource + '</a><hr>');
     });



// =========================================================== Quote  =========================================================== 

var queryURL = "https://random-quote-generator.herokuapp.com/api/quotes/random"

$.ajax({
	url: queryURL,
	method: "GET"
}).then(function(quoteResponse) {
	console.log("askjdn;afbdjnsaskdfj",quoteResponse);

	var quote = quoteResponse.quote;
	var author = quoteResponse.author;

	$("#quote-here").append(quote);
	$("#author-here").append("-" + author);
});

/*========================================== Background =================================*/


var queryURL2 = "https://api.unsplash.com/users/kellysikkema/collections?client_id=c970dc76f602cc4e3a00b5108b19b36c937b43f31109a0709eaa0d2bd66f1b6f";
$.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function(imageResponse){    
    var arr = [];
    for (var i = 0; i < imageResponse.length; i++) {
      var currentObj = imageResponse[i]["preview_photos"]
      for(var j = 0; j < currentObj.length; j++){      
        arr.push(currentObj[j].urls.full)
      }
    }
    var backgroundImage = Math.floor(Math.random() * arr.length)

    $('body').css('background','linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(' + arr[backgroundImage] + ')');
  });

// ======================================================= Commute =============================================


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
  };

// =========================================================== Weather ===========================================================



function getLocalWeather(city) {
   
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=d8d64a31b79e4c92c420bd81c4289876";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    	var tempF = Math.floor((9/5)*(response.main.temp - 273) + 32)
    	var conditions = response.weather[0].description
    	console.log(conditions)
        $(".show-weather").append('<h3>'+ tempF)
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
  // getLocalWeather();



  // =========================================================== Journal =========================================================== 

var config = {
  apiKey: "AIzaSyAUZ6srtHsxIDDM-3zeuXAQr6C733mm_og",
  authDomain: "project-1-c7fd4.firebaseapp.com",
  databaseURL: "https://project-1-c7fd4.firebaseio.com",
  projectId: "project-1-c7fd4",
  storageBucket: "project-1-c7fd4.appspot.com",
  messagingSenderId: "612657157904"
};

firebase.initializeApp(config);

var database = firebase.database();

var journalInput = "";
var count = 0;

$(document).on("submit", function(event) {
  event.preventDefault();
  count++;

  journalInput = $("#journal-input").val().trim();

  database.ref().push({
    entryNumber: count,
    journalEntry: journalInput
  });

  $("#journal-input").val("");
});


// append as li + time stamp + divider 
database.ref().on("child_added", function(snapshotJ) {
  var newRow = $("<li>");
  var addRow = snapshotJ.val();
  var timeStamp = moment().format('lll');

  newRow.append("Entry " + addRow.entryNumber + "<br>" + timeStamp + "<li class='divider'> </li>");

  var entryItem = $("<p>");

  var deleteEntry = $("<button>");

  deleteEntry.attr("data-delete", count);
  deleteEntry.addClass("checkbox");
  deleteEntry.append("X");

  entryItem = entryItem.append(deleteEntry);

  $("#journal-entries").append(deleteEntry);

  $("#journal-entries").append(newRow);
});

//incomplete
$(document.body).on("click", ".checkbox", function() {
     var toDoNumber = $(this).attr("data-delete");

     database.ref().child(entryNumber).remove();
     database.ref().child(journalEntry).remove();

   });


     //TODO: 
     //remove the journal entry journal from Firebase upon X checkbox
     //display entry body upon clicking, maybe nice animated window
     //integrate into login to retain user profile




/*========================================== Background =================================*/

// Unsplash.OAuth.authorize_url! scope: "public read_user write_user read_photos write_photos write_likes" 
// Unsplash.OAuth.authorize!(code: auth_code_from_the_callback_above)