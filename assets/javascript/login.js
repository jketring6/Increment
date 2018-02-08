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
  } else {
    console.log("Not logged in");
    $("#logOut").addClass("hide");
  }
})



// function showPass() {
//     var queryURL = "https://project-1-c7fd4.firebaseio.com/.json"

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {

//         console.log(response)

//        });
// }
  

  // copy this in read and write "auth != null"

