var apiKey = '914466eb';
var movieInput = document.getElementById('search-bar');
var searchButton = document.getElementById('search-button');
var resultsContainer = document.getElementById('results-container');

//creates event listener when the search button is clicked to display the search results.
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    getMovie();
    getSoundtrack();
});

//pulls data from OMBD api by doing a fetch request. Search is by movie title
function getMovie() {
    var movie = movieInput.value.trim();
    var apiUrl = `https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`
    if (movie) {
        fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayMovieInfo(data);
                console.log(data);
                saveSearch(movie);
            })
    }
}

//function to display movie results. Creating elements on the fly, using data from fetch request, and appending data to the result box.
function displayMovieInfo(data) {

    //Creates a container div with corresponding class in css of .result-box to create a white box for the text to display in
    var resultBox = document.createElement('div');
    resultBox.classList.add('result-box');
    //Clears previous results and appends
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultBox);

    if (data.Response === 'True') {
        var title = document.createElement('h2');
        title.textContent = data.Title;
        var year = document.createElement('p');
        year.textContent = `Year: ${data.Year}`;
        var director = document.createElement('p');
        director.textContent = `Director: ${data.Director}`;
        var genre = document.createElement('p');
        genre.textContent = `Genre: ${data.Genre}`;
        resultBox.appendChild(title);
        resultBox.appendChild(year);
        resultBox.appendChild(director);
        resultBox.appendChild(genre);
    }
}

//youtube API key
var youtubeApiKey = 'AIzaSyAA0MCO29SGRcp0F_GAFIQ_-VLbK5Js_nc';

//pulls data from youtube by doing a fetch request. changed parameters of the URL to search for movie that was inputed by user + soundtrack
function getSoundtrack() {
    var movie = movieInput.value.trim();
    var apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movie}+soundtrack&type=video&key=${youtubeApiKey}`
    if (movie) {
        fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayVideoResults(data.items);
                console.log(data.items);
            })
    }
}

//function to display youtube links for movies
function displayVideoResults(videos) {

    //Creates a container div with corresponding class in css of .result-box to create a white box for the text to display in
    var resultBox = document.createElement('div');
    resultBox.classList.add('result-box');
    resultsContainer.appendChild(resultBox);

    //created h3 header that appears before youtube links
    var soundtrackList = document.createElement('h3');
    soundtrackList.textContent = 'Soundtrack Music Links:';
    resultBox.appendChild(soundtrackList);
    //loops through array and creates paragraph & link element and displays the text. Appends the snippet of the youtube video title and appends the link. 
    if (videos.length > 0) {
        videos.forEach(function (video) {
            var videoTitle = document.createElement('p');
            var videoLink = document.createElement('a');
            videoTitle.textContent = video.snippet.title;
            videoLink.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
            videoLink.target = '_blank';
            videoLink.appendChild(videoTitle);
            resultBox.appendChild(videoLink);
        });
    }
}




//Loads search history from local storage or creates an array if no history exists
var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];



//function to save the search to local storage, check if the movie is already in search history, and limits list to 5 movies at a time & saves to local storage
function saveSearch(userInput) {
    if (!searchHistory.includes(userInput)) {
        searchHistory.push(userInput);
        if (searchHistory.length > 5) {
            searchHistory.shift();
        }
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}

//function to display search history as a list with clickable buttons to search again
function displaySearchHistory() {
    var historyContainer = document.getElementById('search-history-list');
    historyContainer.innerHTML = '';

    //Creates a button for each item in the search history & when you click the button, it re-searches for that movie
    searchHistory.forEach(function (item) {
        var button = document.createElement('button');
        button.textContent = item;
        button.classList.add('search-history-button');
        button.addEventListener('click', function () {
            movieInput.value = item;
            getMovie();
            getSoundtrack();
        });

        historyContainer.appendChild(button);
    });
}

displaySearchHistory();