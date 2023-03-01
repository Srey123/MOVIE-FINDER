const API_URL ="https://www.omdbapi.com/?i=tt3896198&apikey=f472daf0&s=";
// API URL SAYS THAT FETCH all movies names  related to input
const API_URL_SEARCH ="https://www.omdbapi.com/?apikey=f472daf0&i=";
// API URL SAYS THAT IT SHOWS ALL THE data of  particular movie that is related to input.
var search_input = document.getElementById("search_input");
// IT IS AA INPUT ID  WHICH WE MENTIONED IN THE INPUT TYPE OF HTML
var card = document.getElementsByClassName("movie-cards")[0];
// ARRAY OF  ALL related  MOVIE /MOVIE CARDS THAT MOVIE WE TYPED AS INPUT IN SEARCH INPUT

document.getElementsByClassName("search")[0].addEventListener("click",function(){
	// Here class search is  class of button which we give button in html file. by click(clicking is event) of that button =>addeventlistner(type of function anounomsly called)
	//  will listen and do works on what we need and give output.
	console.log(search_input.value);
	const query = search_input.value;
	if (query){
		// if input query(movie name exist) is correct
		// calling the function of getmovie which fetches the data of needed movie
		getMovies(API_URL+query);
	}
});

async function getMovies(m) {
	const resp = await fetch(m);
	// it fetches the movie data 
    // m is variable name link of the url by default//
	const respData = await resp.json();
	// covert that data in json format which divids the data accrding to its locality
	console.log(respData);
	
	showMovies(respData.Search);
	// show movies display (array of movies that related to the input) 
}
// async is promise callback backback function which fetch the data and take some time and its also called as the consuming code


function showMovies(movies) {
	card.innerHTML="";
	movies.forEach(async function(movie) {
		
	   const movieData = await fetch(API_URL_SEARCH+movie.imdbID);
	   // for each is loop that we have it maens for each movie present in array(movie  related to input)fetch the data(from the server) and give to jason format
	   const movieDataobj = await movieData.json();
	//    data each movie converted into the json format
	   movie_display(movieDataobj);
	});


}
// display that movie on the cards
// display function.

function movie_display(imovie) {
	const movieElm = document.createElement("div");
	movieElm.classList.add("movie-card");
	// to display the data on the card we are using card
	// ${} the values in div card  that are the url of the given value(mentioned in span) for that movie.
	movieElm.innerHTML=`
		    <div class="card">
		    <img src="${imovie.Poster}" alt = "Poster" width= "300px" height= "300px"/>
			
		    <br>
		      <div class= "movie-description">
		        <span class="movie-title"><b>Title</b><span class="value">${imovie.Title}</span></span>
		        <span class="movie-title"><b>Rating</b><span class="value">${imovie.imdbRating}</span></span>
		        <span class="movie-title"><b>Director</b><span class="value">${imovie.Director}</span></span>
		        <span class="movie-title"><b>Released Date</b><span class="value">${imovie.Realeased}</span></span>
		        <span class="movie-title"><b>Genre</b><span class="value">${imovie.Genre}</span></span>
		      </div>
		    </div>
 `;
    card.appendChild(movieElm);
}