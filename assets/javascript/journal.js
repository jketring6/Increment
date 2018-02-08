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
var count = 0;

$(document).on("submit", function(event) {
  event.preventDefault();
  count++;
 

  journalInput = $("#user-input").val().trim();

  database.ref().push( {
    entryNumber: count,
    journalEntry: journalInput
  });

  $("#user-input").val("");
});


// append as li + time stamp + divider 
database.ref().on("child_added", function(snapshotJ) {
  var newRow = $("<li>");
  var addRow = snapshotJ.val();
  var timeStamp = moment().format('lll');

  newRow.append(addRow.journalEntry + "<br> <br>" + timeStamp + "<li class='divider'> </li>");

  $("#journal-entries").append(newRow);

})




//iterate i -> infiity
  //$(..)...append("jornal entry" + i )