$("button").on("click", function() {


    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=ICK0911MJ3OSyCVmYJsRtqgKZ0CzLbhW"

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function(gifresponse) {

            console.log(gifresponse);

            var results = gifresponse.data

            var imageUrl = results.images.fixed_height.url;
        
            var gifImage = $("<img>")

            gifImage.attr("src", imageUrl);

            $("#gifDiv").html(gifImage);

            console.log("jeeksd");

        });

});