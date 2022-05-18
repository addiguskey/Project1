// random drinks API

// set Variables
// eventLister for generate Btn which calls for randomMusic, randomCocktail functions
// figureout how to generate random music/artist
// eventLister for refresh Btn for each Music and Cocktail
// function for randomCocktail
// function for randomMusic
// Local Storage - like/dislike btn - store if like

// 10 random songs from top charts API
const settings = {
  async: true,
  crossDomain: true,
  url: `https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=10&startFrom=${getRandomInt(
    190
  )}`,
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    "X-RapidAPI-Key": "62fd737dc8mshdc4b2103750a6cap1678d6jsn9a8771e39bcf",
  },
};

$.ajax(settings).done(function (data) {
  console.log(data, "musicData");
  for (let i = 0; i < data.tracks.length; i++) {
    document.querySelector("body").innerHTML += data.tracks[i].title;
    document.querySelector("body").innerHTML += data.tracks[i].subtitle;
  }
});
function getRandomInt(max) {
  return Math.ceil(Math.random() * max);
}


const cocktailApi = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';




$.ajax({
  url: cocktailApi,
  method: 'GET',
  data: {
    'api-key': '1'
  },
}).then(function (response) {
  const drinkData = response.drinks[0]

  for (const key in drinkData) {
    if (drinkData[key] === null) {
      delete drinkData[key]  
    }
  }


  document.querySelector("body").innerHTML += drinkData.strDrink
  document.querySelector("body").innerHTML += drinkData.strIngredient1
  document.querySelector("body").innerHTML += drinkData.strIngredient2
  document.querySelector("body").innerHTML += drinkData.strIngredient3
  document.querySelector("body").innerHTML += drinkData.strIngredient4
  document.querySelector("body").innerHTML += drinkData.strIngredient5
  document.querySelector("body").innerHTML += drinkData.strIngredient6
  document.querySelector("body").innerHTML += drinkData.strIngredient7
  document.querySelector("body").innerHTML += drinkData.strIngredient8
  document.querySelector("body").innerHTML += drinkData.strIngredient9
  document.querySelector("body").innerHTML += drinkData.strIngredient10
  document.querySelector("body").innerHTML += drinkData.strIngredient11
  document.querySelector("body").innerHTML += drinkData.strIngredient12
  document.querySelector("body").innerHTML += drinkData.strIngredient13
  document.querySelector("body").innerHTML += drinkData.strIngredient14
  document.querySelector("body").innerHTML += drinkData.strIngredient15
  document.querySelector("body").innerHTML += drinkData.strInstructions
  
  

  for (const key in drinkData) {
    if (drinkData[key] === null) {
      delete drinkData[key]
    }  
  }
  
  
  console.log(response)
  console.log(drinkData.strDrink);
  console.log(drinkData.strIngredient1);
  console.log(drinkData.strIngredient2);
  console.log(drinkData.strIngredient3);
  console.log(drinkData.strIngredient4);
  console.log(drinkData.strIngredient5);
  console.log(drinkData.strIngredient6);
  console.log(drinkData.strIngredient7);
  console.log(drinkData.strIngredient8);
  console.log(drinkData.strIngredient9);
  console.log(drinkData.strIngredient10);
  console.log(drinkData.strIngredient11);
  console.log(drinkData.strIngredient12);
  console.log(drinkData.strIngredient13);
  console.log(drinkData.strIngredient14);
  console.log(drinkData.strIngredient15);
  console.log(drinkData.strstrInstructions);
  
});
