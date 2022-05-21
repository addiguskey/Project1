// random drinks API

// set Variables
// var thumbsBtns = $(".thumbs-btns");
$(".thumbs-btns .thumb").hide();
$("#musicSeeMoreBtn").hide();
$("#drinkModal").hide();
// eventLister for generate Btn which calls for randomMusic, randomCocktail functions
// figureout how to generate random music/artist
// eventLister for refresh Btn for each Music and Cocktail
// function for randomCocktail
// function for randomMusic
// Local Storage - like/dislike btn - store if like

// 10 random songs from top charts API
//comment back in 14-39 !!



var musicTitle;
var musicPic;
var musicModalData;
function getMusicData(){
    const settings = {
    async: true,
    crossDomain: true,
    url: `https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=10&startFrom=${getRandomInt(
      190
    )}`,
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      "X-RapidAPI-Key": "986c4bb7b1msh3abb6d107d4427ap172975jsnb368993ed3ad",
    },
  };
  $.ajax(settings).done(function (data) {
  console.log(data, "musicData");
    musicModalData =data.tracks
    musicTitle =data.tracks[0].share.subject;
    musicPic =data.tracks[0].images.background;
});
}

function getRandomInt(max) {
  return Math.ceil(Math.random() * max);
}

const cocktailApi = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
var drinkData;
var ingredientsArray;
var measuresArray;
var directionsArray;
function getDrinkData(){
  $.ajax({
  url: cocktailApi,
  method: "GET",
  data: {
    "api-key": "1",
  },
}).then(function (response) {
  drinkData = response.drinks[0];


  console.log(response);
  console.log(drinkData.strDrink);

  var drinkEntriesDataArray = Object.entries(drinkData);
  console.log("drinkEntriesDataArray", drinkEntriesDataArray);

  ingredientsArray = drinkEntriesDataArray
    .filter(
      ([key, value]) => key.startsWith("strIngredient") && value && value.trim()
    )
    .map(([key, value]) => value);
  console.log("ingredientsArray", ingredientsArray);

  measuresArray = drinkEntriesDataArray
    .filter(
      ([key, value]) => key.startsWith("strMeasure") && value && value.trim()
    )
    .map(([key, value]) => value);
  console.log("measuresArray", measuresArray);

  console.log("imageArray", imageArray);
  var imageArray = drinkEntriesDataArray
    .filter(([key, value]) => key.startsWith("strDrinkThumb"))
    .map(([key, value]) => value);

directionsArray = drinkEntriesDataArray
      .filter(([key, value]) => key.startsWith("strInstructions"))
      .map(([key, value]) => value);
});
}


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
  $(".thumbs-btns .thumb").hide();
  $("#musicSeeMoreBtn").hide();
  $("#drinkModal").hide();
  cycleImage(el); //Cycle the image now so feels responsive. Remove if not wanted.
  intervalId = setInterval(cycleImage, 300, el); //Change image every 1000ms (1s)
  $(".music-icon").attr("src", "./assets/images/music-icon.svg");
  $(".music-icon").attr("style", "transition: 10s");
  $(".music-icon").addClass("spin");
  $(".drink-title").text("");
  $(".music-title").text("");
  $("#drink-thumbs-up").removeClass("bi-hand-thumbs-up-fill").addClass("bi-hand-thumbs-up");
  $("#music-thumbs-up").removeClass("bi-hand-thumbs-up-fill").addClass("bi-hand-thumbs-up");
  $("#drink-thumbs-down").removeClass("bi-hand-thumbs-down-fill").addClass("bi-hand-thumbs-down");
  $("#music-thumbs-down").removeClass("bi-hand-thumbs-down-fill").addClass("bi-hand-thumbs-down");
  getMusicData();
  getDrinkData();
  setTimeout(function () {
    stopImageCycle();
    $(".thumbs-btns .thumb").show();
    $("#musicSeeMoreBtn").show();
    $("#drinkModal").show();
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
    var id= $(this).children().attr("id");
    console.log(id);
    if(id ==="drink-thumbs-up"){
      var drinkFavArray = JSON.parse(localStorage.getItem("drinkFav"))||[];
      drinkFavArray.push(drinkData.strDrink);
      localStorage.setItem("drinkFav", JSON.stringify(drinkFavArray));
    }else{
      var musicFavArray = JSON.parse(localStorage.getItem("musicFav"))||[];
      musicFavArray.push(musicTitle);
      localStorage.setItem("musicFav", JSON.stringify(musicFavArray));
    }
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

function getDrinkRecipe(){
  $("#drinkModalTitle").text(drinkData.strDrink)
  $("#modalDrinkImage").attr("src", drinkData.strDrinkThumb)
  $("#appendDrinkIng").empty()
for (let i = 0; i < ingredientsArray.length; i++) {
  const ingObj = ingredientsArray[i];
  var ingLi = $("<span>");
    ingLi.text(ingObj);
  const measuresObj = measuresArray[i] || "to taste";
  var measuresSpan = $("<li>",{
    class: "list-group-item"
    });
  measuresSpan.text(" " + measuresObj);
  ingLi.append(measuresSpan);
  $("#appendDrinkIng").append(ingLi);
}
$("#drinkDirections").text(drinkData.strInstructions)

}
$("#drinkModal").on('click', getDrinkRecipe)
$(".carousel-bg").hide();
function getTenSongs(){
  $(".carousel-bg").show();
  for (let i = 0; i < musicModalData.length; i++) {
      const songsObj = musicModalData[i];
    console.log(songsObj);
    var carouselItem = $("<div>",{
      class:"carousel-item",
    });
    if(i===0){
      carouselItem = $("<div>",{
      class:"carousel-item active",
    })
    }else{
      carouselItem = $("<div>",{
      class:"carousel-item",
    })
    }
    var songsImg = $("<img>",{
      src: songsObj.images.background,
      class:"d-block w-100"
    });
    var carouselCation = $("<div>",{
      class:"carousel-caption d-none d-md-block"
    });
    var songsTitle = $("<div>",{
      class:"carousel-caption d-none d-md-block"
    });
    songsTitle.text(songsObj.share.subject);
    carouselCation.append(songsTitle);
    carouselItem.append(songsImg);
    carouselItem.append(carouselCation);
    $(".carousel-inner").append(carouselItem);
  }
}
function closeCarousel(){
  $(".carousel-bg").hide();
}

$("#musicSeeMoreBtn").on('click', getTenSongs);
$(".carousel-close-btn").on("click", closeCarousel)