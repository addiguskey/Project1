$(".thumbs-btns .thumb").hide();
$("#musicSeeMoreBtn").hide();
$("#drinkModal").hide();

// function to get 10 random songs from Music API
function getRandomInt(max) {
  return Math.ceil(Math.random() * max);
}

//music API and setting its variables
var musicTitle;
var musicPic;
var musicModalData;
function getMusicData() {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=10&startFrom=${getRandomInt(
      190
    )}`,
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      "X-RapidAPI-Key": "33db709c53msh855689f75a34780p1e0c08jsnd068537d83b6",
    },
  };
  $.ajax(settings).done(function (data) {
    console.log(data, "musicData");
    musicModalData = data.tracks;
    musicTitle = data.tracks[0].share.subject;
    musicPic = data.tracks[0].images.background;
  });
}

// Drink API and its variables
const cocktailApi = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
var drinkData;
var ingredientsArray;
var measuresArray;
var directionsArray;
function getDrinkData() {
  $.ajax({
    url: cocktailApi,
    method: "GET",
    data: {
      "api-key": "1",
    },
    // only extracting data with value
  }).then(function (response) {
    drinkData = response.drinks[0];

    console.log(response);
    console.log(drinkData.strDrink);

    var drinkEntriesDataArray = Object.entries(drinkData);

    ingredientsArray = drinkEntriesDataArray
      .filter(
        ([key, value]) =>
          key.startsWith("strIngredient") && value && value.trim()
      )
      .map(([key, value]) => value);

    measuresArray = drinkEntriesDataArray
      .filter(
        ([key, value]) => key.startsWith("strMeasure") && value && value.trim()
      )
      .map(([key, value]) => value);

    var imageArray = drinkEntriesDataArray
      .filter(([key, value]) => key.startsWith("strDrinkThumb"))
      .map(([key, value]) => value);

    directionsArray = drinkEntriesDataArray
      .filter(([key, value]) => key.startsWith("strInstructions"))
      .map(([key, value]) => value);
  });
}

// Drink icons
var drinckIconArray = [
  "./assets/images/drink-icon2.svg",
  "./assets/images/drink-icon3.svg",
  "./assets/images/drink-icon3.svg",
  "./assets/images/drink-icon5.svg",
  "./assets/images/drink-icon1.svg",
];
var curImageIndex = 0; // 0 is displayed by default
var intervalId; //Remember the ID of the interval so we can stop it later.

// EventListener& functions for start btn
$("#start").click(function startImageCycle() {
  $(".main-title").text("Smash the START button to get Sloshed");
  $("#start").text("Restart");
  $(".thumbs-btns .thumb").hide();
  $("#musicSeeMoreBtn").hide();
  $("#drinkModal").hide();

  // filling& un-filling thumbs up/down
  cycleImage();
  intervalId = setInterval(cycleImage, 300); //Change image every 1000ms (1s)
  $(".music-icon").attr("src", "./assets/images/music-icon.svg");
  $(".music-icon").attr("style", "transition: 10s");
  $(".music-icon").addClass("spin");
  $(".drink-title").text("");
  $(".music-title").text("");
  $("#drink-thumbs-up")
    .removeClass("bi-hand-thumbs-up-fill")
    .addClass("bi-hand-thumbs-up");
  $("#music-thumbs-up")
    .removeClass("bi-hand-thumbs-up-fill")
    .addClass("bi-hand-thumbs-up");
  $("#drink-thumbs-down")
    .removeClass("bi-hand-thumbs-down-fill")
    .addClass("bi-hand-thumbs-down");
  $("#music-thumbs-down")
    .removeClass("bi-hand-thumbs-down-fill")
    .addClass("bi-hand-thumbs-down");
  getMusicData();
  getDrinkData();

  // replacing drink and music icons with recs
  setTimeout(function () {
    stopImageCycle();
    $(".main-title").text("Here is your prescription for today");
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

// when user clicks thumbs-up save to local storage& fav's list
var drinkFavArray;
var musicFavArray;
var drinkLike;
var drinkDislike;
$(".thumb").on("click", function () {
  var elementClass = $(this).attr("class");
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
    drinkLike = $(this).children().attr("id");
    console.log(drinkLike);
    if (drinkLike === "drink-thumbs-up") {
      drinkFavArray = JSON.parse(localStorage.getItem("drinkFav")) || [];
      drinkFavArray.push(drinkData.strDrink);
      localStorage.setItem("drinkFav", JSON.stringify(drinkFavArray));
    } else {
      musicFavArray = JSON.parse(localStorage.getItem("musicFav")) || [];
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
    drinkDislike = $(this).attr("id");
    if (drinkDislike === "drink-thumbs-down") {
      console.log(drinkDislike);
      $(".drink-title").text("");
      cycleImage();
      intervalId = setInterval(cycleImage, 300);
      getDrinkData();
      setTimeout(function () {
        stopImageCycle();
        $(".thumbs-btns .thumb").show();
        $("#drink-thumbs-up")
          .removeClass("bi-hand-thumbs-up-fill")
          .addClass("bi-hand-thumbs-up");
        $("#drink-thumbs-down")
          .children()
          .removeClass("bi-hand-thumbs-down-fill")
          .addClass("bi-hand-thumbs-down");
        $("#drinkModal").show();
        $(".drink-icon").attr("src", drinkData.strDrinkThumb);
        $(".drink-title").text(drinkData.strDrink);
      }, 3000);
    } else {
      console.log(drinkDislike);
      $(".music-icon").attr("src", "./assets/images/music-icon.svg");
      $(".music-icon").attr("style", "transition: 10s");
      $(".music-icon").addClass("spin");
      $(".music-title").text("");
      getMusicData();
      setTimeout(function () {
        stopImageCycle();
        $(".thumbs-btns .thumb").show();
        $("#music-thumbs-up")
          .removeClass("bi-hand-thumbs-up-fill")
          .addClass("bi-hand-thumbs-up");
        $("#music-thumbs-down")
          .children()
          .removeClass("bi-hand-thumbs-down-fill")
          .addClass("bi-hand-thumbs-down");
        $("#musicSeeMoreBtn").show();
        $(".music-icon").attr("style", "transition: 0s");
        $(".music-icon").removeClass("spin");
        $(".music-icon").attr("src", musicPic);
        $(".music-title").text(musicTitle);
      }, 3000);
    }
  }
});

// function to append fave drinks list to offCanvas
function getFaveDrinksLi() {
  drinkFavArray = JSON.parse(localStorage.getItem("drinkFav")) || [];
  $("#append-fav-drinks").empty();
  for (let i = 0; i < drinkFavArray.length; i++) {
    const faveDrinkObj = drinkFavArray[i];
    var faveDrinkLi = $("<li>", {
      class: "list-group-flush",
    });
    faveDrinkLi.text(faveDrinkObj);
    $("#append-fav-drinks").append(faveDrinkLi);
  }
}

// function to append fave songs list to offCanvas
function getFaveSongsLi() {
  $("#append-fav-songs").empty();
  musicFavArray = JSON.parse(localStorage.getItem("musicFav")) || [];
  for (let i = 0; i < musicFavArray.length; i++) {
    const faceMusicObj = musicFavArray[i];
    var faveMusicLi = $("<li>", {
      class: "list-group-flush",
    });
    faveMusicLi.text(faceMusicObj);
    $("#append-fav-songs").append(faveMusicLi);
  }
}

// clear drink& music fav's
$("#clear-drinks-history").on("click", function () {
  $("#append-fav-drinks").empty();
  localStorage.removeItem("drinkFav");
});

$("#clear-music-history").on("click", function () {
  $("#append-fav-songs").empty();
  localStorage.removeItem("musicFav");
});

// function for drink recipe
function getDrinkRecipe() {
  $("#drinkModalTitle").text(drinkData.strDrink);
  $("#modalDrinkImage").attr("src", drinkData.strDrinkThumb);
  $("#appendDrinkIng").empty();
  for (let i = 0; i < ingredientsArray.length; i++) {
    const ingObj = ingredientsArray[i];
    var ingLi = $("<span>");
    ingLi.text(ingObj);
    const measuresObj = measuresArray[i] || "to taste";
    var measuresSpan = $("<li>", {
      class: "list-group-item",
    });
    measuresSpan.text(" " + measuresObj);
    ingLi.append(measuresSpan);
    $("#appendDrinkIng").append(ingLi);
  }
  $("#drinkDirections").text(drinkData.strInstructions);
}
// Event listener for drinkrecipe
$("#drinkModal").on("click", getDrinkRecipe);

// function/ event listner for music carousel
$(".carousel-bg").hide();
function getTenSongs() {
  $(".carousel-bg").show();
  for (let i = 0; i < musicModalData.length; i++) {
    const songsObj = musicModalData[i];
    console.log(songsObj);
    var carouselItem = $("<div>", {
      class: "carousel-item",
    });
    if (i === 0) {
      carouselItem = $("<div>", {
        class: "carousel-item active",
      });
    } else {
      carouselItem = $("<div>", {
        class: "carousel-item",
      });
    }
    var songsImg = $("<img>", {
      src: songsObj.images.background,
      class: "d-block w-100",
    });
    var carouselCaption = $("<div>", {
      class: "carousel-caption d-none d-md-block",
    });
    var songsTitle = $("<h4>", {
      class: "carousel-caption d-none d-md-block bg-black rounded-3",
    });
    songsTitle.text(songsObj.share.subject);
    carouselCaption.append(songsTitle);
    carouselItem.append(songsImg);
    carouselItem.append(carouselCaption);
    $(".carousel-inner").append(carouselItem);
  }
}
function closeCarousel() {
  $(".carousel-bg").hide();
}

// EVENT LISTENERS FOR BTNS
$("#musicSeeMoreBtn").on("click", getTenSongs);
$(".carousel-close-btn").on("click", closeCarousel);
$("#carousel-x").on("click", closeCarousel);
$("#fave-drinks-btn").on("click", getFaveDrinksLi);
$("#fave-songs-btn").on("click", getFaveSongsLi);
