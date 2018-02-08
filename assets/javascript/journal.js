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
     //remove the journal entry user from Firebase upon X checkbox
     //display entry body upon clicking, maybe nice animated window
     //integrate into login to retain user profile

