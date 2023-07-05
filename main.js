const button = document.querySelector('button');
const input = document.querySelector('.input');
const movieDetails = {
  title: document.querySelector('.info.title'),
  titleOriginal: document.querySelector('.info.original-title'),
  titleOriginalRomanised: document.querySelector('.info.original-title-romanised'),
  releaseDate: document.querySelector('.info.release-date'),
  director: document.querySelector('.info.director'),
  runtime: document.querySelector('.info.runtime'),
  image: document.querySelector('.change'),
  rating: document.querySelector('.info.rtScore'),
  bgImage: document.querySelector('.apiDisplay'),
  results: document.querySelector('.results')
};
let movieData = [];

button.addEventListener('click', apiRequest);

input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    button.click();
    input.value = '';
  }
});

async function apiRequest() {
  try {
    const titleName = input.value.toLowerCase();
    const response = await fetch(`https://ghibliapi.vercel.app/films`);
    const data = await response.json();
    movieData = data;

    const movie = movieData.find(movie => movie.title.toLowerCase() === titleName);
    if (movie) {
      displayMovieDetails(movie);
    } else {
        input.value = '';
    }
  } catch (error) {
    console.log(error);
  }
}

function displayMovieDetails(movie) {
  movieDetails.title.innerText = 'Movie Title: ' + movie.title;
  movieDetails.titleOriginal.innerText = 'Original title: ' + movie.original_title;
  movieDetails.titleOriginalRomanised.innerText = 'Original title romanised: ' + movie.original_title_romanised;
  movieDetails.releaseDate.innerText = 'Release date: ' + movie.release_date;
  movieDetails.director.innerText = 'Director: ' + movie.director;
  movieDetails.runtime.innerText = 'Movie runtime: ' + movie.running_time;
  movieDetails.rating.innerText = 'Movie RT rating: ' + movie.rt_score;
  movieDetails.image.src = movie.image;

  movieDetails.image.style.visibility = 'visible';
  movieDetails.results.style.visibility = 'visible';
  movieDetails.bgImage.style.background = 'none';
}

  movieDetails.image.style.visibility = 'hidden';
  movieDetails.results.style.visibility = 'hidden';
  movieDetails.bgImage.style.background = '';


