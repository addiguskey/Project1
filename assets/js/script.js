// artist-top-20-tracks API Code
const settings = {
  async: true,
  crossDomain: true,
  url: "https://shazam.p.rapidapi.com/songs/ip-country-chart-US?id=5128581&locale=en-US",
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    "X-RapidAPI-Key": "62fd737dc8mshdc4b2103750a6cap1678d6jsn9a8771e39bcf",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

// random drinks API

// set Variables
// eventLister for generate Btn which calls for randomMusic, randomCocktail functions
// figureout how to generate random music/artist
// eventLister for refresh Btn for each Music and Cocktail
// function for randomCocktail
// function for randomMusic
// Local Storage - like/dislike btn - store if like
