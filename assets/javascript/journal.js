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

$(document).on("submit", function(event) {
  event.preventDefault();
  if  ($("<input>".hasClass("login-submit")) return;
    

  journalInput = $("#journal-input").val().trim();

  database.ref().push({
    entryNumber: count,
    journalEntry: journalInput
  });

  $("#journal-input").val("");
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

