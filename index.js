let movieArray = []
let findMovies = []
const search = document.getElementById("search")
const form = document.getElementById("form")
const displayMovies = document.getElementById("display-movies")
const movieNotFound = document.getElementById("movie-not-found")
const showWatchlistMovies = document.getElementById("show-watchlist-movies")

if(form){
    form.addEventListener("submit", function(e){
    e.preventDefault()
    searchMovies()
     
})
}



function searchMovies(){
    movieArray = []
    const searchForMovies = search.value
   fetch(`https://www.omdbapi.com/?s=${searchForMovies}&apikey=2fd22660`)
   .then(res=>res.json())
   .then(data=>{
       
        for (let movie of data.Search){
            
              movieArray.push(movie.imdbID)
              
        }
          getMovie() 
          form.reset()
         
    
}) 
}


function getMovie(){
    findMovies=[]
    for(let movie of movieArray){
    fetch(`https://www.omdbapi.com/?i=${movie}&apikey=2fd22660`)
    .then(res=>res.json())
    .then(data=>{
        
        //console.log(data)
        
         if(findMovies.includes(data)){
            ""
        } else{
            findMovies.push(data)
            getMovieHtml()
                      
        } 
        
        
    })
    
    }
      
}


function render(){
    displayMovies.innerHTML = getMovieHtml()   
} 


function getMovieHtml(){
    //console.log(getMovieHtml)
        const showMovies = findMovies.map(movie=>{
            
            return   `
                     <div class = "film"> 
                            <!-- poster section for movies rendered-->
                            <div>
                                <img class = "poster-img" src="${movie.Poster}" alt ="a poster description of the movie"/>         
                            </div>
                                  
                    <div class = "movie-area"> 
                            <!-- this area, displays movies title, star and rating-->
                            <div class="movie-title-area">
                            
                            <!-- movie title section for movies rendered-->
                              <h3 class="movie-title">${movie.Title}</h3>
                              <img class = "star-img" src = "images/star.png">
                              <p class = "imbdrating">${movie.Ratings[0].Value}</p>
                            </div>
                            
                            <div class = "movie-runtime-genre">
                                <p class = "runtime">${movie.Runtime}</p>
                                <p class = "genre">${movie.Genre}</p>
                                
                            <!--movie watchlist button section-->
                            
                                 <button class = "btn" data-movie = ${movie.imdbID}>+</button>
                                 <p class = "watchlist" data-movie = ${movie.imdbID} >${movie.watchlist? "remove": "watchlist"}</p>
                            
                            </div>
                          <!--movie plot description section-->
                                <p class = "movie-plot">${movie.Plot}</p>
                                    
                    </div>
                             
                    </div>`            
        })
          
          displayMovies.innerHTML = showMovies 
          return showMovies
         
       
}


document.addEventListener("click",(e)=>{
    if(e.target.dataset.movie){
        addToWatchlist(e.target.dataset.movie)
        
    }   
})

 function addToWatchlist(watchId){
        //console.log(watchId)
        const targetWatchlist = findMovies.filter(find=>{
            return find.imdbID === watchId
        })[0]
         //console.log(targetWatchlist)
         targetWatchlist.watchlist = !targetWatchlist.watchlist
         render()
         
         const savedWatchlist = findMovies.filter(find=>{
             return find.watchlist
         })
         watchMovieArray = savedWatchlist
         localStorage.setItem("watchMovieArray", JSON.stringify(watchMovieArray))
    }
    
    function displayWatchlistMovies(){
        localWatchlist = JSON.parse(localStorage.getItem("watchMovieArray"))
        const mywatchlist = localWatchlist.map(movie=>{
        
            return  `
                     <div class = "film"> 
                            <!-- poster section for movies rendered-->
                            <div>
                                <img class = "poster-img" src="${movie.Poster}" alt ="a poster description of the movie"/>         
                            </div>
                                  
                    <div class = "movie-area"> 
                            <!-- this area, displays movies title, star and rating-->
                            <div class="movie-title-area">
                            
                            <!-- movie title section for movies rendered-->
                              <h3 class="movie-title">${movie.Title}</h3>
                              <img class = "star-img" src = "images/star.png">
                              <p class = "imbdrating">${movie.Ratings[0].Value}</p>
                            </div>
                            
                            <div class = "movie-runtime-genre">
                                <p class = "runtime">${movie.Runtime}</p>
                                <p class = "genre">${movie.Genre}</p>
                                
                            <!--movie watchlist button section-->
                            
                                 <button class = "btn remove-btn">+</button>
                                 <p class = "watchlist">Remove</p>
                            
                            </div>
                          <!--movie plot description section-->
                                <p class = "movie-plot">${movie.Plot}</p>
                                    
                    </div>
                             
                    </div>` 
        }) 
        
        showWatchlistMovies.innerHTML = mywatchlist
      
        if(showWatchlistMovies){ 
            const removeBtn = document.getElementsByClassName("remove-btn")
            const film = document.getElementsByClassName("film")
            for(let i=0; i<removeBtn.length; i++){
              removeBtn[i].onclick = ()=>{
                  film[i].style.display = "none"
                   
              }  
            }
            
        } 
    }
    if(showWatchlistMovies){
        displayWatchlistMovies()
    }
    
       
    
    
    
    
   







