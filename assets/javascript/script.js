var guideboxData;
var GUIDEBOXAPI = config.GUIDEBOXAPIKEY;
var OMDBAPI = config.OMDBAPIKEY;
var movieArray = [];

$("#submit").on("click", function (event){
	movieArray = [];
	event.preventDefault();
	var url = "";
	callGuidebox(getMovies, guideboxData);
});

function callGuidebox(apicall, response) {
	var url; log
	var medium;
	var streams = $("[name='select-services']:checked");
	var streamArray = [];
	if ($("#select-movie").is(":checked")) {
		medium = "movies";
	} else if ($("#select-tv").is(":checked")) {
		medium = "shows";
	};
	streams.each(function () {
		var checkedStreams = ($(this).attr("value"));
			streamArray.push(checkedStreams);
	});
	streamURL = streamArray.map(stream => stream + ",").join('');
	url = `http://api-public.guidebox.com/v2/${medium}?api_key=${GUIDEBOXAPI}&limit=5&sources=${streamURL}`;
	apicall(url, response);
};

function callOMDB (searchResults, response) {
	var imdbURL = "";
	var imdbArray = searchResults;
	// console.log(imdbArray);
	// var imdbURL = imdbArray.map(id => id + ",").join('');
	for (i = 0; i < imdbArray.length; i++) {
		url = `http://www.omdbapi.com/?apikey=${OMDBAPI}&i=${imdbArray[i]}`;
		getMovies2(url, response);
	};
}

function getMovies(apiUrl, searchResults) {
	fetch(apiUrl, { mode: 'cors' })
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log(data);
		searchResults(data.results);
	});
};

function getMovies2(apiUrl, searchResults) {
	fetch(apiUrl, { mode: 'cors' })
		.then(function (response) {
			return response.json();
	})
		.then(function (data) {
			// console.log(data);
		movieArray.push(data);
		searchResults(movieArray);
		searchResults = movieArray;
		if (movieArray.length >= 5) {
			ratingGenre(searchResults);
		}
	});
};

function guideboxData(data) {
	// console.log(data)
	if ($("#select-movie").is(":checked")) {
		data = data.map(data => data.imdb);
	} else if ($("#select-tv").is(":checked")) {
		data = data.map(data => data.imdb_id);
	};
	callOMDB(data, omdbData);
};

function omdbData(data) {
};

function ratingGenre(data) {
	// console.log(data)
	var omdbArray = data;
	console.log(omdbArray);
	console.log(omdbArray[1].title);

};