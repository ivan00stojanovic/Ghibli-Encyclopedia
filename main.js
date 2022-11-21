const button = document.querySelector('button')
const input = document.querySelector('.input')
const name = document.querySelector('h3')
const title = document.querySelector('.title')
const release = document.querySelector('.release-date')
const director = document.querySelector('.director')
const runtime = document.querySelector('.runtime')
const image = document.querySelector('.change')
const rating = document.querySelector('.rtScore')
const originalTitle = document.querySelector('.original-title')
const originalTitleRomanised = document.querySelector('.original-title-romanised')
const bgImage = document.querySelector('.apiDisplay')
const results = document.querySelector('.results')
        const titleArray = []
        const originalTitleArray = []
        const originalTitleRomanisedArray = []
        const dateArray = []
        const directorArray = []
        const runtimeArray = []
        const rtScoreArray = []
        const imageArray = []


button.addEventListener('click', apiRequest)

//Syncing the enter key to trigger a click event
input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      button.click();
    }
  });

async function apiRequest(){
    try{
        const titleName = document.querySelector('input').value
        const response = await fetch(`https://ghibliapi.herokuapp.com/films`)
        const data = await response.json()
        console.log(data)
        
        //go through the data objects, fill all of the arrays with it's needed elements
        for(let i = 0; i < data.length; i++){
        titleArray.push(data[i].title)
        originalTitleArray.push(data[i].original_title)
        originalTitleRomanisedArray.push(data[i].original_title_romanised)
        dateArray.push(data[i].release_date)
            directorArray.push(data[i].director)
            runtimeArray.push(data[i].running_time)
            imageArray.push(data[i].image)
            rtScoreArray.push(data[i].rt_score)
        }
            //fill the apiDisplay div content with the inputed movie title
            for(let j = 0; j < titleArray.length; j++){
        if(titleName ==  data[j].title.toLowerCase() || titleName == data[j].title.toUpperCase()|| titleName == data[j].title) {
            
            console.log('works')
            console.log(titleArray)
            title.innerText = 'Movie Title: ' + titleArray[j]
            originalTitle.innerText = 'Original title: ' + originalTitleArray[j]
            originalTitleRomanised.innerText = 'Original title romanised: ' + originalTitleRomanisedArray[j]
            release.innerText = 'Relase date: ' + dateArray[j]
            director.innerText = 'Director: ' + directorArray[j]
            runtime.innerText = 'Movie runtime: ' + runtimeArray[j]
            rating.innerText = 'Movie RT rating: ' + rtScoreArray[j]
            image.src = imageArray[j] 
            input.value = ''
            
            //show apiDisplay content, remove placeholder image
                image.style.visibility = 'visible'
                results.style.visibility = 'visible'
                bgImage.style.background = 'none'
        }
            }
    }catch(error){
        console.log(error)
    }
}