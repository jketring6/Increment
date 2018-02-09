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
});

$(document).on("click","#logOut", function() {
event.preventDefault();
firebase.auth().signOut();
})

auth.onAuthStateChanged(firebaseUser => {
 if(firebaseUser) {
   $("#logOut").removeClass("hide");
   // console.log(firebaseUser);
   // console.log(firebaseUser.uid);
   userID = firebaseUser.uid
   //Need to make each of the first branches from firebase correspond to a single user
 } else {
   console.log("Not logged in");
  $("#logOut").addClass("hide");
  // alert("login!")
 
  $("#myModal").modal("show");
  var message = "You haven't made an account with us yet?! What are you thinking??? Get started right away below!";
  $(".modal-body").append(message + '<br><form><input type="text" id="emailInput" placeholder="E-mail"><input type="password" id="passInput" placeholder="Password"><button id="logIn">Log in</button><button id="signUp">Sign Up</button><button id="logOut">Log Out</button></form>');
 }


$(document).on("submit", function(event) {
 event.preventDefault();
 journalInput = $("#journal-input").val().trim();

  database.ref().child("user/" + userID + "/journalLog").push({
         journalEntry: journalInput,
         dateAdded: firebase.database.ServerValue.TIMESTAMP

   });

 $("#journal-input").val("");
});

database.ref("user/" + userID + "/journalLog").on("child_added", function(snapshotJ) {
   $("#journal-entries").prepend("<p>" + moment(snapshotJ.val().dateAdded).format('lll') + ": " + snapshotJ.val().journalEntry)

});


});


// =========================================================== NEWS ================================================================


     var queryURLnews = 'https://newsapi.org/v2/top-headlines?' +
         'country=us&' +
         'apiKey=90dcb619e6ce411f953e53b282297dee';

     $.ajax({
         url: queryURLnews,
         method: "GET"
     }).then(function(newsResponse) {

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

var queryURLquote = "https://random-quote-generator.herokuapp.com/api/quotes/random"

$.ajax({
	url: queryURLquote,
	method: "GET"
}).then(function(quoteResponse) {

	var quote = quoteResponse.quote;
	var author = quoteResponse.author;

	$("#quote-here").append(quote);
	$("#author-here").append("- " + author);
});



// =========================================================== Weather ===========================================================

function getLocalWeather(city) {
   
    var queryURLweather = "https://api.openweathermap.org/data/2.5/weather?q=san+francisco&APPID=d8d64a31b79e4c92c420bd81c4289876";

    $.ajax({
      url: queryURLweather,
      method: "GET"
    }).then(function(response) {
    	var tempF = Math.floor((9/5)*(response.main.temp - 273) + 32)
    	var conditions = response.weather[0].description
        $(".show-weather").append('<h3>'+ tempF + " " + "&#8457;");
        $(".weather-icons").append('<h4>' + "San Francisco, CA" + '</h4>');

        if (conditions == "clear sky") {
        	$(".weather-icons").append("<img class='weather-img' src='https://cdn4.iconfinder.com/data/icons/wthr-color/32/sunny-512.png'>")
        }

        else if (conditions == "few clouds") {
        	$(".weather-icons").append("<img class='weather-img' src='http://www.mountainweather.com/wp-content/plugins/gCAST/images/icons/mostly-sunny-skies.png'>")
        }

        else if (conditions == "scattered clouds") {
        	$(".weather-icons").append("<img class='weather-img' src='https://cdn4.iconfinder.com/data/icons/wthr-color/32/cloud-fog-512.png'>")
        }

        else if (conditions == "broken clouds") {
        	$(".weather-icons").append("<img class='weather-img' src='https://cdn4.iconfinder.com/data/icons/wthr-color/32/cloud-fog-512.png'>")
        }

        else if (conditions == "shower rain") {
        	$(".weather-icons").append("<img class='weather-img' src='http://clipground.com/images/scattered-cloud-clipart-14.jpg'>")
        }
        else if (conditions == "light rain") {
        	$(".weather-icons").append("<img class='weather-img' src='http://www.free-icons-download.net/images/sunny-to-rain-icon-9913.png'>")
        }

        else if (conditions == "rain") {
        	$(".weather-icons").append("<img class='weather-img' src='https://www.bigstatehomebuyers.com/wp-content/uploads/cloud.rain_.png'>")
        }

        else if (conditions == "thunderstorm") {
        	$(".weather-icons").append("<img class='weather-img' src='assets/images/thunderstorm-weather.png'>")
        }

        else if (conditions == "snow") {
        	$(".weather-icons").append("<img class='weather-img' src='https://www.shareicon.net/data/2016/07/22/799900_cloud_512x512.png'>")
        }

        else if (conditions == "mist") {
        	$(".weather-icons").append("<img class='weather-img' src='https://cdn4.iconfinder.com/data/icons/wthr-color/32/cloud-fog-512.png'>")
        }
        
       });

  }

  // // Event handler for user clicking the select-weather button
  // $("#addCity").on("click", function(event) {
  //   // Preventing the button from trying to submit the form
  //   event.preventDefault();
  //   // Storing the weather name
  //   var city = $("#cityInput").val().trim();

  //   // Running the searchBandsInTown function (passing in the weather as an argument)
  //   getLocalWeather(city);
  // });
  getLocalWeather();



  // =========================================================== Journal =========================================================== 

// var config = {
//   apiKey: "AIzaSyAUZ6srtHsxIDDM-3zeuXAQr6C733mm_og",
//   authDomain: "project-1-c7fd4.firebaseapp.com",
//   databaseURL: "https://project-1-c7fd4.firebaseio.com",
//   projectId: "project-1-c7fd4",
//   storageBucket: "project-1-c7fd4.appspot.com",
//   messagingSenderId: "612657157904"
// };

// firebase.initializeApp(config);

// var database = firebase.database();

// var journalInput = "";
// var count = 0;

// $(document).on("submit", function(event) {
//   event.preventDefault();
//   count++;

//   journalInput = $("#journal-input").val().trim();

//   database.ref().push({
//     entryNumber: count,
//     journalEntry: journalInput
//   });

//   $("#journal-input").val("");
// });


// // append as li + time stamp + divider 
// database.ref().on("child_added", function(snapshotJ) {
//   var newRow = $("<li>");
//   var addRow = snapshotJ.val();
//   var timeStamp = moment().format('lll');

//   newRow.append("Entry " + addRow.entryNumber + "<br>" + timeStamp + "<li class='divider'> </li>");

//   var entryItem = $("<p>");

//   var deleteEntry = $("<button>");

//   deleteEntry.attr("data-delete", count);
//   deleteEntry.addClass("checkbox");
//   deleteEntry.append("X");

//   entryItem = entryItem.append(deleteEntry);

//   $("#journal-entries").append(deleteEntry);

//   $("#journal-entries").append(newRow);
// });

// //incomplete
// $(document.body).on("click", ".checkbox", function() {
//      var toDoNumber = $(this).attr("data-delete");

//      database.ref().child(entryNumber).remove();
//      database.ref().child(journalEntry).remove();

//    });


     //TODO: 
     //remove the journal entry journal from Firebase upon X checkbox
     //display entry body upon clicking, maybe nice animated window
     //integrate into login to retain user profile




/*========================================== Background =================================*/

// Unsplash.OAuth.authorize_url! scope: "public read_user write_user read_photos write_photos write_likes" 
// Unsplash.OAuth.authorize!(code: auth_code_from_the_callback_above)