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


})
$("#journal-entry").on("click", function(event) {
      event.preventDefault();
      journalEntry = $("#journal-entry").val().trim();
   database.ref().child(user).append({
          journalEntry: journalEntry,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
}); 

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref(user).on("child_added", function(childSnapshot) {

      // full list of items to the well
      $("#journal-entries").append("<li class=journal>" + childSnapshot.val().dateAdded +  ": " + childSnapshot.val().journalEntry + "<br>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

  

  

