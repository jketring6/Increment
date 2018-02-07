// function start() {

//      var queryURL = "https://www.youtube.com/iframe_api_key=AIzaSyCwhfowbSf54w0uz7XPpk7zUuZ2KhBg5MQ";

//     $.ajax({
//       url: queryURL,
//       method: 'GET'
//     }).then(function(response) {
//       console.log(response);
//       console.log("hello");
//     });

// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
//       var firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//        var player;
//       function onYouTubeIframeAPIReady() {
//         player = new YT.Player('player', {
//           height: '390',
//           width: '640',
//           videoId: 'M7lc1UVf-VE',
//           events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//           }
//         });
//       }
       // 4. The API will call this function when the video player is ready.
//       function onPlayerReady(event) {
//         event.target.playVideo();
//       }

//         var done = false;
//       function onPlayerStateChange(event) {
//         if (event.data == YT.PlayerState.PLAYING && !done) {
//           setTimeout(stopVideo, 6000);
//           done = true;
//         }
//       }
//       function stopVideo() {
//         player.stopVideo();
//       }


// }

// start();
// var lastIndex = 0;
 
// function randomImage() {
//    var theImage = document.getElementById('myimage');
//    var imgDir = 'images/';
//    var imgArray = new array('bigtv.jpg','caddy.jpg','fatcat.jpg','manhart.jpg','roastdog.jpg');
//    var imgIndex = 0;

//    if(imgArray.length > 1) {
//    while(imgIndex == lastIndex) {
//       imgIndex = Math.floor(Math.random() * imgArray.length);
//    }
//    lastIndex = imgIndex;

//    var imgPath = imgDir + imgArray[imgIndex];
 
// theImage.src = imgPath;
// theImage.alt = imgArray[imgIndex];


var queryURL = "https://api.unsplash.com/photos/?client_id=c970dc76f602cc4e3a00b5108b19b36c937b43f31109a0709eaa0d2bd66f1b6f";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(imageResponse){
  console.log(imageResponse);
});

