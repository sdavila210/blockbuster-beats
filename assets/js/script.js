var apiKey = '914466eb';
var movieInput = document.getElementById('search-bar')
var searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    getMovie();
});

function getMovie() {
    var movie = movieInput.value.trim();
    var apiUrl = `https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`
    if (movie) {
        fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            })
    }
}