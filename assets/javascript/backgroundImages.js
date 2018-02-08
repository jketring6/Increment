


// Unsplash.OAuth.authorize_url! scope: "public read_user write_user read_photos write_photos write_likes" 
// Unsplash.OAuth.authorize!(code: auth_code_from_the_callback_above)

var background = $("<body>");
var arr = [];

var queryURL = "https://api.unsplash.com/users/kellysikkema/collections?client_id=c970dc76f602cc4e3a00b5108b19b36c937b43f31109a0709eaa0d2bd66f1b6f";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(imageResponse){
  for (var i = 0; i < imageResponse.length; i++) {
    var currentObj = imageResponse[i]["preview_photos"]
    for(var j = 0; j < currentObj.length; j++){      
      arr.push(currentObj[j].urls.full)
    }
  }
  var backgroundImage = Math.floor(Math.random() * arr.length)
  console.log("============",arr)

  $('body').css('background','linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(' + arr[backgroundImage] + ')');
});
