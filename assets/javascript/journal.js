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

