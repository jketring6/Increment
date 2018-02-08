var config = {
   apiKey: "AIzaSyDmB-tG2duDhOxylkNxxhx6HD70tfdTYJw",
   authDomain: "fir-time-644aa.firebaseapp.com",
   databaseURL: "https://fir-time-644aa.firebaseio.com",
   projectId: "fir-time-644aa",
   storageBucket: "fir-time-644aa.appspot.com",
   messagingSenderId: "668876946692"
 };
 firebase.initializeApp(config);

 var database = firebase.database();

var journalInput = "";

$(document).on("submit", function(event) {
  event.preventDefault();
  journalInput = $("#user-input").val().trim();

  database.ref().push( {
    journalEntry: journalInput
  });

  $("#user-input").val("");
});


//append as li + time stamp + divider 
// database.ref().on("child_added", function(snapshotJ) {
//   var newRow = $("<li>");
//   var addrow = snapshotJ.val();

//   newRow.append(journalInput + )

// })