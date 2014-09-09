$(document).ready(function() {
	$(".get-topanswerers").submit(function(event) {
		$(".results").html("");
		var topAnswerers = $(this).find("input[name='answerers']").val();
		getTopAnswerers(topAnswerers);

		console.log(topAnswerers);

	});
});

var showAnswerer = function(answerer) {
	var result = $(".templates .answerer").clone();
	
	//get answerer name - display_name
	var answererElem = result.find(".answerer-name a");
	answererElem.attr("href", answerer.user.link);
	answererElem.text(answerer.user.display_name);

	console.log(answerer.user.display_name);

	//get user profile image - profile_image
 	var answererImage = result.find(".answerer-image");
 	answererImage.html("<img src="+answerer.user.profile_image+">");

 	console.log(answerer.user.profile_image);

	//get user reputation - reputation
	var answererReputation = result.find(".reputation");
	answererReputation.text(answerer.user.reputation);

	console.log("user reputation is " +answerer.user.reputation);

	//get user score - score
	var answererScore = result.find(".score");
	answererScore.text(answerer.score);

	console.log("user score is " +answerer.score);

	return result;
};

var getTopAnswerers = function(topAnswerers) {
	var tag = topAnswerers;
	var period = "all_time";
	var pagesize = "30";

	var request = { tagged: topAnswerers,
					site: "stackoverflow"
					};

	var result = $.ajax({
		url: "http://api.stackexchange.com/2.2/tags/"+tag+ "/top-answerers/"+period+"?pagesize="+pagesize,
		data: request,
		dataType: "jsonp",
		type: "GET"
		})
	.done(function(result) {
		var searchResults = showSearchResults(tag, result.items.length);

		$(".search-results").html(searchResults);

		$.each(result.items, function(i, item) {
			var answer = showAnswerer(item);
			$(".results").append(answer);
		});
	})
	.fail(function(jqXHR, error, errorThrown) {
		var errorElem = showError(error);
		$(".search-results").append(errorElem);
	});
};

var showSearchResults = function(query, resultNum) {
	var results = resultNum + " results for <strong>" + query;
	return results;
};

var showError = function(error) {
	var errorElem = $(".templates .error").clone();
	var errorText = "<p>" + error + "</p>";
	errorElem.append(errorText);
};