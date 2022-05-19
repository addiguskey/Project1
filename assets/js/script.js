// random drinks API

// set Variables
// var thumbsBtns = $(".thumbs-btns");
$(".thumbs-btns .thumb").hide();
// eventLister for generate Btn which calls for randomMusic, randomCocktail functions
// figureout how to generate random music/artist
// eventLister for refresh Btn for each Music and Cocktail
// function for randomCocktail
// function for randomMusic
// Local Storage - like/dislike btn - store if like

// 10 random songs from top charts API
//comment back in 14-39 !!

// const settings = {
//   async: true,
//   crossDomain: true,
//   url: `https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=10&startFrom=${getRandomInt(
//     190
//   )}`,
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Host": "shazam.p.rapidapi.com",
//     "X-RapidAPI-Key": "986c4bb7b1msh3abb6d107d4427ap172975jsnb368993ed3ad",
//   },
// };

// var musicTitle;
// var musicPic;
// $.ajax(settings).done(function (data) {
//   console.log(data, "musicData");
//   for (let i = 0; i < data.tracks.length; i++) {
//     console.log(data);
//     musicTitle =data.tracks[0].title;
//     musicPic =data.tracks[0].images.background;
//   }
// });
// function getRandomInt(max) {
//   return Math.ceil(Math.random() * max);
// }

const cocktailApi = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
var drinkData;
$.ajax({
  url: cocktailApi,
  method: "GET",
  data: {
    "api-key": "1",
  },
}).then(function (response) {
  drinkData = response.drinks[0];

  for (const key in drinkData) {
    if (drinkData[key] === null) {
      delete drinkData[key];
    }
  }

  console.log(response);
  console.log(drinkData.strDrink);

  var drinkEntriesDataArray = Object.entries(drinkData);
  console.log("drinkEntriesDataArray", drinkEntriesDataArray);

  var ingredientsArray = drinkEntriesDataArray
    .filter(
      ([key, value]) => key.startsWith("strIngredient") && value && value.trim()
    )
    .map(([key, value]) => value);
  console.log("ingredientsArray", ingredientsArray);

  var measuresArray = drinkEntriesDataArray
    .filter(
      ([key, value]) => key.startsWith("strMeasure") && value && value.trim()
    )
    .map(([key, value]) => value);
  console.log("measuresArray", measuresArray);

  console.log("imageArray", imageArray);
  var imageArray = drinkEntriesDataArray
    .filter(([key, value]) => key.startsWith("strDrinkThumb"))
    .map(([key, value]) => value);
});

//star play
var drinckIconArray = [
  "./assets/images/drink-icon2.svg",
  "./assets/images/drink-icon3.svg",
  "./assets/images/drink-icon3.svg",
  "./assets/images/drink-icon5.svg",
  "./assets/images/drink-icon1.svg",
];
var curImageIndex = 0; // 0 is displayed by default
var intervalId; //Remember the ID of the interval so we can stop it later.

$("#start").click(function startImageCycle(el) {
  cycleImage(el); //Cycle the image now so feels responsive. Remove if not wanted.
  intervalId = setInterval(cycleImage, 300, el); //Change image every 1000ms (1s)
  $(".music-icon").addClass("spin");
  setTimeout(function () {
    stopImageCycle();
    $(".thumbs-btns .thumb").show();
    $(".drink-icon").attr("src", drinkData.strDrinkThumb);
    $(".drink-title").text(drinkData.strDrink);
    $(".music-icon").attr("style", "transition: 0s");
    $(".music-icon").removeClass("spin");
    $(".music-icon").attr("src", musicPic);
    $(".music-title").text(musicTitle);
  }, 3000);
});
function stopImageCycle(el) {
  clearInterval(intervalId);
}
function cycleImage(element) {
  curImageIndex++;
  if (curImageIndex >= drinckIconArray.length) {
    curImageIndex = 0;
  }
  $(".drink-icon").attr("src", drinckIconArray[curImageIndex]);
}

$(".thumb").on("click", function () {
  var elementClass = $(this).attr("class");
  // console.log(elementClass)
  if (elementClass === "thumb thumb-up") {
    console.log("thumb-up");
    $(this)
      .children()
      .removeClass("bi-hand-thumbs-up")
      .addClass("bi-hand-thumbs-up-fill");
    $(this)
      .siblings()
      .children()
      .removeClass("bi-hand-thumbs-down-fill")
      .addClass("bi-hand-thumbs-down");
  } else {
    console.log("thumb-down");
    $(this)
      .children()
      .removeClass("bi-hand-thumbs-down")
      .addClass("bi-hand-thumbs-down-fill");
    $(this)
      .siblings()
      .children()
      .removeClass("bi-hand-thumbs-up-fill")
      .addClass("bi-hand-thumbs-up");
  }
});
