// random drinks API

// set Variables
// eventLister for generate Btn which calls for randomMusic, randomCocktail functions
// figureout how to generate random music/artist
// eventLister for refresh Btn for each Music and Cocktail
// function for randomCocktail
// function for randomMusic
// Local Storage - like/dislike btn - store if like

// 10 random songs from top charts API
// const settings = {
//   async: true,
//   crossDomain: true,
//   url: `https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=10&startFrom=${getRandomInt(
//     190
//   )}`,
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Host": "shazam.p.rapidapi.com",
//     "X-RapidAPI-Key": "3c0d3ddaafmshda336bd138befc8p11306fjsn93297a18be62",
//   },
// };

// $.ajax(settings).done(function (data) {
//   console.log(data, "musicData");
//   for (let i = 0; i < data.tracks.length; i++) {
//     document.querySelector("body").innerHTML += data.tracks[i].title;
//     document.querySelector("body").innerHTML += data.tracks[i].subtitle;
//   }
// });
// function getRandomInt(max) {
//   return Math.ceil(Math.random() * max);
// }


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


  // document.querySelector("body").innerHTML += drinkData.strDrink
  // document.querySelector("body").innerHTML += drinkData.strIngredient1
  // document.querySelector("body").innerHTML += drinkData.strIngredient2
  // document.querySelector("body").innerHTML += drinkData.strIngredient3
  // document.querySelector("body").innerHTML += drinkData.strIngredient4
  // document.querySelector("body").innerHTML += drinkData.strIngredient5
  // document.querySelector("body").innerHTML += drinkData.strIngredient6
  // document.querySelector("body").innerHTML += drinkData.strIngredient7
  // document.querySelector("body").innerHTML += drinkData.strIngredient8
  // document.querySelector("body").innerHTML += drinkData.strIngredient9
  // document.querySelector("body").innerHTML += drinkData.strIngredient10
  // document.querySelector("body").innerHTML += drinkData.strIngredient11
  // document.querySelector("body").innerHTML += drinkData.strIngredient12
  // document.querySelector("body").innerHTML += drinkData.strIngredient13
  // document.querySelector("body").innerHTML += drinkData.strIngredient14
  // document.querySelector("body").innerHTML += drinkData.strIngredient15
  // document.querySelector("body").innerHTML += drinkData.strInstructions
  
  

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

//star play

var drinckIconArray =[
  "./assets/images/drink-icon2.svg",
  "./assets/images/drink-icon3.svg",
  "./assets/images/drink-icon3.svg",
  "./assets/images/drink-icon5.svg",
  "./assets/images/drink-icon1.svg",
]
var curImageIndex = 0; // 0 is displayed by default
var intervalId; //Remember the ID of the interval so we can stop it later.

$("#start").click(function startImageCycle(el){
    cycleImage(el); //Cycle the image now so feels responsive. Remove if not wanted.
    intervalId = setInterval(cycleImage,300,el); //Change image every 1000ms (1s)
    $(".music-icon").addClass("spin");
})
function stopImageCycle(el){
    clearInterval(intervalId);
}
function cycleImage(element){
    curImageIndex++;
    if(curImageIndex >= drinckIconArray.length) {
        curImageIndex = 0;
    }
    $(".drink-icon").attr("src", drinckIconArray[curImageIndex]);
}