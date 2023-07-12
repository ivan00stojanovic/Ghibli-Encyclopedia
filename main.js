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
    const titleName = document.querySelector('input').value.toLowerCase();
    const response = await fetch('https://ghibli.rest/films');
    const data = await response.json();

    let movie;
    
    // Remove apostrophes from user input
    const modifiedTitleName = removeApostrophes(titleName);

    // Check for an exact match
    movie = data.find(movie => removeApostrophes(movie.title.toLowerCase()) === modifiedTitleName);
    console.log(movie)
    
    if (!movie) {
      // Check for a partial match
      movie = data.find(movie => removeApostrophes(movie.title.toLowerCase()).includes(modifiedTitleName));
      console.log(movie)
    }
    //return the movie info or reset the input
    if (movie) {
      displayMovieDetails(movie);
    } else {
      alert('Wrong input, probably a misspell :(');
    }
  } catch (error) {
    console.log(error);
  }
}

function removeApostrophes(str) {
  return str.replaceAll("'", '');
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

//   const button = document.querySelector('button')
// const input = document.querySelector('.input')
// const name = document.querySelector('h3')
// const title = document.querySelector('.title')
// const release = document.querySelector('.release-date')
// const director = document.querySelector('.director')
// const runtime = document.querySelector('.runtime')
// const image = document.querySelector('.change')
// const rating = document.querySelector('.rtScore')
// const originalTitle = document.querySelector('.original-title')
// const originalTitleRomanised = document.querySelector('.original-title-romanised')
// const bgImage = document.querySelector('.apiDisplay')
// const results = document.querySelector('.results')
//         let titleArray = []
//         let originalTitleArray = []
//         let originalTitleRomanisedArray = []
//         let dateArray = []
//         let directorArray = []
//         let runtimeArray = []
//         let rtScoreArray = []
//         let imageArray = []


//PRE FACTORED CODE
// button.addEventListener('click', apiRequest)

// //Syncing the enter key to trigger a click event
// input.addEventListener("keypress", e => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       button.click();
//       input.value =''
//     }
//   });

// async function apiRequest(){
//     try{
//         const titleName = document.querySelector('input').value
//         const response = await fetch(`https://ghibli.rest/films`)
//         const data = await response.json()
//         console.log(data)
        
//         //go through the data objects, fill all of the arrays with it's needed elements
//         for(let i = 0; i < data.length; i++){
//         titleArray.push(data[i].title)
//         originalTitleArray.push(data[i].original_title)
//         originalTitleRomanisedArray.push(data[i].original_title_romanised)
//         dateArray.push(data[i].release_date)
//             directorArray.push(data[i].director)
//             runtimeArray.push(data[i].running_time)
//             imageArray.push(data[i].image)
//             rtScoreArray.push(data[i].rt_score)
//         }
//             //fill the apiDisplay div content with the inputed movie title
//             for(let j = 0; j < titleArray.length; j++){
//         if(titleName ==  data[j].title.toLowerCase() || titleName == data[j].title.toUpperCase()|| titleName == data[j].title) {
            
            
//             title.innerText = 'Movie Title: ' + titleArray[j]
//             originalTitle.innerText = 'Original title: ' + originalTitleArray[j]
//             originalTitleRomanised.innerText = 'Original title romanised: ' + originalTitleRomanisedArray[j]
//             release.innerText = 'Release date: ' + dateArray[j]
//             director.innerText = 'Director: ' + directorArray[j]
//             runtime.innerText = 'Movie runtime: ' + runtimeArray[j]
//             rating.innerText = 'Movie RT rating: ' + rtScoreArray[j]
//             image.src = imageArray[j] 
            
//             //show apiDisplay content, remove placeholder image
//                 image.style.visibility = 'visible'
//                 results.style.visibility = 'visible'
//                 bgImage.style.background = 'none'
//         }
//             }
//     }catch(error){
//         console.log(error)
//     }
// }
