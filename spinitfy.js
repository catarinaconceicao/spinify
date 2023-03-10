"use strict";

const playPauseBtn = document.querySelector(".play-pause-btn");
const shuffleBtn = document.querySelector(".shuffle-btn");
const goBackBtn = document.querySelector(".go-back-btn");
const goForwardBtn = document.querySelector(".go-forward-btn");
const repeatBtn = document.querySelector(".repeat-btn");
const soundBtn = document.querySelector(".sound-btn");

const home = document.querySelector(".home-btn");
const search = document.querySelector(".search-btn");
const library = document.querySelector(".library-btn");
const mainModule = document.querySelector(".main-div");
let folder = mainModule.querySelectorAll(".folder");

const songPoster = document.querySelector(".poster");
const songTittle = document.querySelector(".music-name");
const songArtist = document.querySelector(".music-artist");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".time-left");
const musicSlider = document.querySelector(".music-slider");
const soundSlider = document.querySelector(".sound-slider");

let currentSong = document.createElement("audio");

let index = 0;
let playing = false;
let repeat = false;
let shuffle = false;
let updateTimer;

/////////////////////////////////////////////////////////////////////URL ROUTING
const urlPageTitle = "Spinitfy Web Player";

document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("nav a")) {
    return;
  }
  e.preventDefault();
  urlRoute();
});

const urlRoutes = {
  404: {
    template: "/templates/404.html",
    title: urlPageTitle + " | Welcome",
    description: "Page not found",
  },
  "/": {
    template: "/templates/home.html",
    title: urlPageTitle + " | Home",
    description: "Home page",
  },
  "/search": {
    template: "/templates/search.html",
    title: urlPageTitle + " | Search",
    description: "Search page",
  },
  "/library": {
    template: "/templates/library.html",
    title: urlPageTitle + " | Library",
    description: "Library page",
  },
};

const urlRoute = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  const location = window.location.pathname;
  if (location.length == 0) {
    location = "/";
  }
  const route = urlRoutes[location] || urlRoutes["404"];
  const html = await fetch(route.template).then((response) => response.text());
  document.querySelector(".main-div").innerHTML = html;
  document.title = route.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;
urlLocationHandler();

/////////////////////////////////////////////////////////////////////MEDIA PLAYER

const songList = [
  {
    tittle: "Forest Lullaby",
    artist: "Lesfm",
    image: "img/posters/forest-lullaby.jpg",
    url: "audio/forest-lullaby-lesfm.mp3",
  },
  {
    tittle: "Life Like",
    artist: "AlexAction",
    image: "img/posters/lifelike.jpg",
    url: "audio/lifelike-alexiaction.mp3",
  },
  {
    tittle: "Lo-Fi Chillhop",
    artist: "Music Unlimited",
    image: "img/posters/lo-fi.jpg",
    url: "audio/lo-fi-chillhop-beat-background-music-musicunlimited.mp3",
  },
  {
    tittle: "Lo-Fi Study",
    artist: "Fassounds",
    image: "img/posters/lo-fi-2.jpg",
    url: "audio/lofi-study-fassounds.mp3",
  },
  {
    tittle: "Playing in color",
    artist: "Nullhertz",
    image: "img/posters/playing.jpg",
    url: "audio/playing-in-color-nullhertz.mp3",
  },
];

playPauseBtn.addEventListener("click", playPause);
shuffleBtn.addEventListener("click", shuffling);
goBackBtn.addEventListener("click", previousSong);
goForwardBtn.addEventListener("click", nextSong);
repeatBtn.addEventListener("click", repeating);
soundBtn.addEventListener("click", volume);

musicSlider.addEventListener("change", slide);
soundSlider.addEventListener("change", setVolume);

loadSong(index);

function loadSong(index) {
  clearInterval(updateTimer);
  init();

  currentSong.src = songList[index].url;
  currentSong.load();

  songPoster.style.backgroundImage = `url("${songList[index].image}")`;
  songPoster.textContent = "";
  songArtist.textContent = songList[index].artist;
  songTittle.textContent = songList[index].tittle;

  updateTimer = setInterval(setUpdate, 1000);

  currentSong.addEventListener("ended", nextSong);
}
function init() {
  currentTime.textContent = "00:00";
  songDuration.textContent = "00:00";
  musicSlider.value = 0;
}
function shuffling() {
  shuffle ? stopShuffle() : startShuffle();
}
function startShuffle() {
  shuffle = true;
  shuffleBtn.classList.add("shuffle"); // ------------------Styling
}
function stopShuffle() {
  shuffle = false;
  shuffleBtn.classList.remove("shuffle"); // ------------------Styling
}
function repeating() {
  if (!repeatBtn.classList.contains("repeat")) {
    currentSong.addEventListener("ended", nextSong);
    repeatBtn.classList.add("repeat"); // ------------------Styling
    console.log(`repeat`);
  } else {
    repeatBtn.classList.remove("repeat"); // ------------------Styling
    if ((index = songList.length - 1)) {
      currentSong.addEventListener("ended", pauseSong);
      console.log(`dont repeat`);
    } else {
      currentSong.addEventListener("ended", nextSong);
      console.log(`dont repeat`);
    }
  }
}
function playPause() {
  playing ? pauseSong() : playSong();
}
function playSong() {
  currentSong.play();
  playing = true;
  console.log("play");
  playPauseBtn.classList.remove("pause"); // ------------------Styling
}
function pauseSong() {
  currentSong.pause();
  playing = false;
  console.log("pause");
  playPauseBtn.classList.add("pause"); // ------------------Styling
}
function nextSong() {
  if (index < songList.length - 1 && shuffle === false) {
    index += 1;
  } else if (index < songList.length - 1 && shuffle === true) {
    let randomIndex = Number.parseInt(Math.random() * songList.length);
    index = randomIndex;
  } else {
    index = 0;
  }
  loadSong(index);
  playSong();
}
function previousSong() {
  if (index > 0) {
    --index;
  } else {
    index = songList.length - 1;
  }
  loadSong(index);
  playSong();
}
////////////////////////////////////////////////////// SLIDERS
const musicProgressBar = document.querySelector(".progress-bar-music-slider");
const soundProgressBar = document.querySelector(".progress-bar-sound-slider");

function slide() {
  let slideTo = currentSong.duration * (musicSlider.value / 100);
  currentSong.currentTime = slideTo;
}
function setVolume() {
  currentSong.volume = soundSlider.value / 100;
}
function setUpdate() {
  let sliderPosition = 0;
  musicProgressBar.style.width = 0;
  if (!isNaN(currentSong.duration)) {
    sliderPosition = currentSong.currentTime * (100 / currentSong.duration);
    musicSlider.value = sliderPosition;

    currentSong.volume = soundSlider.value / 100;
    musicProgressBar.style.width = `${sliderPosition}%`;
    soundProgressBar.style.width = `${currentSong.volume * 100}%`;
    console.log(soundSlider.value);
    console.log(currentSong.volume * 100);
    console.log(soundProgressBar.style.width);

    let currentMinutes = Math.floor(currentSong.currentTime / 60);
    let currentSeconds = Math.floor(
      currentSong.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currentSong.duration / 60);
    let durationSeconds = Math.floor(
      currentSong.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    currentTime.textContent = currentMinutes + ":" + currentSeconds;
    songDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function volume() {
  if (currentSong.volume > 0) {
    soundSlider.value = 0;
    currentSong.volume = 0;
    soundProgressBar.style.width = `${soundSlider.value}%`;

    soundBtn.classList.toggle("mute");
  } else {
    soundSlider.value = 100;
    currentSong.volume = 1;
    soundProgressBar.style.width = `${soundSlider.value}%`;
    console.log(musicProgressBar.style.width);
    soundBtn.classList.toggle("mute");
  }
}
