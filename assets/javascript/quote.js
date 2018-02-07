var queryURL = "https://random-quote-generator.herokuapp.com/api/quotes/random"

$.ajax({
	url: queryURL,
	method: "GET"
}).then(function(quoteResponse) {
	console.log(quoteResponse);

	var quote = quoteResponse.quote;
	var author = quoteResponse.author;

	$("#quote-here").append(quote);
	$("#author-here").append("-" + author);
});

