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
var fontPref;


//Login (on page)
$(document).on("click", "#logIn", function() {
    event.preventDefault();
    var email = $("#emailInput").val();
    var pass = $("#passInput").val();
    var auth = firebase.auth();
    var promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

//Signup (on page)
$(document).on("click", "#signUp", function() {
    event.preventDefault();
    var email = $("#emailInput").val();
    var pass = $("#passInput").val();
    var auth = firebase.auth();
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

//Logout(on page)
$(document).on("click", "#logOut", function(event) {
    event.preventDefault();
    firebase.auth().signOut();
});

//Detects whether or not user has logged in
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        $("#logOut").removeClass("hide");
        $(".login-submit").addClass("hide")
        $("#logIn").addClass("hide");
        $("#signUp").addClass("hide");
        userID = firebaseUser.uid

        $(document).on("click", "#kavivanar", function() {
            console.log("I work");
            fontPref = '"Kavivanar", cursive';
            database.ref().child("user/" + userID + "/Font").set({
                font: fontPref,
            });
        })

        $(document).on("click", "#lora", function() {
            console.log("I work");
            fontPref = '"Lora", serif';
            database.ref().child("user/" + userID + "/Font").set({
                font: fontPref,
            });
        })
        $(document).on("click", "#indie-flower", function() {
            console.log("I work");
            fontPref = '"Indie Flower", cursive';
            database.ref().child("user/" + userID + "/Font").set({
                font: fontPref,
            });
        })
        $(document).on("click", "#bitter", function() {
            console.log("I work");
            fontPref = '"Bitter", serif';
            database.ref().child("user/" + userID + "/Font").set({
                font: fontPref,
            });
        })
        $(document).on("click", "#questrial", function() {
            console.log("I work");
            fontPref = '"Questrial", sans-serif';
            database.ref().child("user/" + userID + "/Font").set({
                font: fontPref,
            });
        })

        database.ref("user/" + userID + "/Font").on("value", function(snapshotF) {
            $("body").css('font-family', snapshotF.val().font)

        });

        //Logs name into user data
        $(document).on("submit", function(event) {
           if ($("#user-name").val() == "" || $("#cityInput").val() == "" ) return;
            event.preventDefault();

            userName = $("#user-name").val().trim();
            // Storing the weather name
            var city = $("#cityInput").val().trim();


            getLocalWeather(city);

            database.ref().child("user/" + userID + "/Names").set({
                name: userName,

            });

            database.ref().child("user/" + userID + "/Location").set({
                city: city,

            });

        });
        //What happens if a user hasn't logged in yet
    } else {
        console.log("Not logged in");
        $("#logOut").addClass("hide");
        $("#logIn").removeClass("hide");
        $("#signUp").removeClass("hide");

        //Prompts user to sign in or make an account
        $("#myModal").modal("show");

        $(".modal-body").html('<form><input class="login-submit" type="text" id="emailInput1" placeholder="E-mail"><input class="login-submit"type="password" id="passInput1" placeholder="Password"><button id="signUp1">Sign Up</button><button id="logIn1">Log in</button></form>');

        //Login (on modal)
        $(document).on("click", "#logIn1", function() {
            event.preventDefault();
            var email = $("#emailInput1").val();
            var pass = $("#passInput1").val();
            var auth = firebase.auth();
            var promise = auth.signInWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message));
            $("#myModal").modal("hide");
        });

        //Signup (on modal)
        $(document).on("click", "#signUp1", function() {
            event.preventDefault();
            var email = $("#emailInput1").val();
            var pass = $("#passInput1").val();
            var auth = firebase.auth();
            var promise = auth.createUserWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message));
            $("#myModal").modal("hide");
            $("#initModal").modal("show");

            $(".init-modal-body").html('<form><h4>What is your name?</h4><input id="user-name1" type="text" placeholder="Name"><h4>Which city are you from?</h4><input id="cityInput1" type="text" placeholder="City"></form><br><h4>Choose a Font: </h4><h4><span id="kavivanar">Kavivanar    </span>|<span id="lora">   Lora</span>|<span id="indie-flower">   Indie Flower</span>|<span id="bitter">   Bitter</span>|<span id="questrial">   Questrial</h4><button id="init-submit">Submit</button>');
            
            $(document).on("click", "#init-submit", function(event) {
           // if ($("#user-name").val() == "" || $("#cityInput").val() == "" ) return;
            userName = $("#user-name1").val().trim();
            city = $("#cityInput1").val().trim();
            database.ref().child("user/" + userID + "/Names").set({
                name: userName,

            });

            database.ref().child("user/" + userID + "/Location").set({
                city: city,

            });
            console.log("i exist")
            $("#initModal").modal("hide");
            });

            //Logs name into user data

        });



    };


    $(document).on("submit", function(event) {
        // $("#aForm").unbind("submit").bind("submit", function(e){
        event.preventDefault();
        $("#journal-input").focus()
        journalInput = $("#journal-input").val().trim();
        if ($("#journal-input").val() == "") return;
        database.ref().child("user/" + userID + "/journalLog").push({
            journalEntry: journalInput,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $("#journal-input").val("");
    });

    database.ref("user/" + userID + "/journalLog").on("child_added", function(snapshotJ) {
        $("#journal-entries").prepend("<h5>" + moment(snapshotJ.val().dateAdded).format('lll') + ": </h5>" + snapshotJ.val().journalEntry + "<hr>")

    });

    database.ref("user/" + userID + "/Names").on("value", function(snapshotN) {
        $("#journal-user").text(snapshotN.val().name)
        console.log

    });

    database.ref("user/" + userID + "/Location").on("value", function(snapshotL) {
        getLocalWeather(snapshotL.val().city)
    });


});


//=========================================================== Commute ================================================================

// destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C
// var departLocation = "40.6655101,-73.89188969999998";
// var arriveLocation = "40.598566%2C-73.7527626";

// $.getJSON("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + departLocation + "&destinations=" + arriveLocation + "&key=AIzaSyBV2ruXz-bzml8rk9eIJJyQypcERMeSVhQ", function(data) {
//     $.each(data, function(key, val) {
//         console.log(key)
//         //cannot read past "elements"
//         console.log(val)
//     });
// });


//=========================================================== Gifs ================================================================


$("button").on("click", function() {


    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=ICK0911MJ3OSyCVmYJsRtqgKZ0CzLbhW"

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function(gifresponse) {

            console.log(gifresponse);

            var results = gifresponse.data

            var imageUrl = results.images.fixed_height.url;
        
            var gifImage = $("<img>")
            gifImage.attr("#gifDisplay")

            gifImage.attr("src", imageUrl);

            $("#gifDiv").html(gifImage);

            console.log("jeeksd");

        });

});
//=========================================================== NEWS ================================================================


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

    var queryURLweather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=d8d64a31b79e4c92c420bd81c4289876";

    $.ajax({
        url: queryURLweather,
        method: "GET"
    }).then(function(response) {
        var tempF = Math.floor((9 / 5) * (response.main.temp - 273) + 32)
        var conditions = response.weather[0].description
        $(".show-weather").html('<h3>' + tempF + " " + "&#8457;");
        $(".weather-icons").html('<h3>' + city + '</h3>');
        console.log("Current conditions: ", conditions)

        if (conditions == "clear sky") {
            $(".weather-icons").append("<img class='weather-img' src='https://cdn4.iconfinder.com/data/icons/wthr-color/32/sunny-512.png'>")
        } else if (conditions == "few clouds") {
            $(".weather-icons").append("<img class='weather-img' src='http://www.mountainweather.com/wp-content/plugins/gCAST/images/icons/mostly-sunny-skies.png'>")
        } else if (conditions == "scattered clouds") {
            $(".weather-icons").append("<img class='weather-img' src='https://cdn4.iconfinder.com/data/icons/wthr-color/32/cloud-fog-512.png'>")
        } else if (conditions == "broken clouds" || conditions == "fog" || conditions == "overcast clouds") {
            $(".weather-icons").append("<img class='weather-img' src='https://cdn4.iconfinder.com/data/icons/wthr-color/32/cloud-fog-512.png'>")
        } else if (conditions == "shower rain") {
            $(".weather-icons").append("<img class='weather-img' src='http://clipground.com/images/scattered-cloud-clipart-14.jpg'>")
        } else if (conditions == "light rain") {
            $(".weather-icons").append("<img class='weather-img' src='http://www.free-icons-download.net/images/sunny-to-rain-icon-9913.png'>")
        } else if (conditions == "rain") {
            $(".weather-icons").append("<img class='weather-img' src='https://www.bigstatehomebuyers.com/wp-content/uploads/cloud.rain_.png'>")
        } else if (conditions == "thunderstorm") {
            $(".weather-icons").append("<img class='weather-img' src='assets/images/thunderstorm-weather.png'>")
        } else if (conditions == "snow") {
            $(".weather-icons").append("<img class='weather-img' src='https://www.shareicon.net/data/2016/07/22/799900_cloud_512x512.png'>")
        } else if (conditions == "mist" || conditions == "haze") {
            $(".weather-icons").append("<img class='weather-img' src='https://cdn4.iconfinder.com/data/icons/wthr-color/32/cloud-fog-512.png'>")
        }

    });

}