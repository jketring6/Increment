var arr = [];

var queryURL = "https://api.unsplash.com/users/kellysikkema/collections?client_id=c970dc76f602cc4e3a00b5108b19b36c937b43f31109a0709eaa0d2bd66f1b6f";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(imageResponse){
  for (var i = 0; i < imageResponse.length; i++) {
    var currentObj = imageResponse[i]["preview_photos"];
    for(var j = 0; j < currentObj.length; j++) {      
      arr.push(currentObj[j].urls.full)
    }
  }

  var backgroundImage = Math.floor(Math.random() * arr.length);

  $('body').css('background','linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(' + arr[backgroundImage] + ') center');
  $('body').css('background-size', 'cover');

  $('body').css('background-repeat', 'no-repeat');  

}, 
function(errorObject) {
  var backupImg = ["assets/images/1.jpg", "assets/images/2.jpg", "assets/images/3.jpg", "assets/images/4.jpg", "assets/images/5.jpg", "assets/images/6.jpg", "assets/images/7.jpg", "assets/images/8.jpg", "assets/images/9.jpg", "assets/images/10.jpg", "assets/images/11.jpg", "assets/images/12.jpg", "assets/images/13.jpg", "assets/images/14.jpg"];

  var imgIndex = Math.floor(Math.random() * backupImg.length);
  tempImg = backupImg[imgIndex];
  $('body').css('background', 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(' + tempImg + ') center');
  $('body').css('background-size', 'cover');

  $('body').css('background-repeat', 'no-repeat');  

});