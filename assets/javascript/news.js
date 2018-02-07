     var queryURL = 'https://newsapi.org/v2/top-headlines?' +
         'country=us&' +
         'apiKey=90dcb619e6ce411f953e53b282297dee';

     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function(newsResponse) {
         console.log(newsResponse);

         var topHeadlineZero = newsResponse.articles[0].title;
         var topHeadlineZeroUrl = newsResponse.articles[0].url;
         var topHeadlineZeroSource = newsResponse.articles[0].source.name;
         var topHeadlineZeroSourceUrl = newsResponse.articles[0].source.name;

         $("#news1-here").append('<a href="' + topHeadlineZeroUrl + '">' + topHeadlineZero + '</a>');
         $("#source1-here").append('<a href="' + topHeadlineZeroSourceUrl + '">' + topHeadlineZeroSource + '</a><hr>');

         ////////////////////////

         var topHeadlineOne = newsResponse.articles[1].title;
         var topHeadlineOneUrl = newsResponse.articles[1].url;
         var topHeadlineOneSource = newsResponse.articles[1].source.name;
         var topHeadlineOneSourceUrl = newsResponse.articles[1].source.name;
         

         $("#news2-here").append('<a href="' + topHeadlineOneUrl + '">' + topHeadlineOne + '</a>');
         $("#source2-here").append('<a href="' + topHeadlineOneSourceUrl + '">' + topHeadlineOneSource + '</a><hr>');

         ////////////////////////

         var topHeadlineTwo = newsResponse.articles[2].title;
         var topHeadlineTwoUrl = newsResponse.articles[2].url;
         var topHeadlineTwoSource = newsResponse.articles[2].source.name;
         var topHeadlineTwoSourceUrl = newsResponse.articles[2].source.name;
         

         $("#news3-here").append('<a href="' + topHeadlineTwoUrl + '">' + topHeadlineTwo + '</a>');
         $("#source3-here").append('<a href="' + topHeadlineTwoSourceUrl + '">' + topHeadlineTwoSource + '</a><hr>');
     });