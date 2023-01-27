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

function mainModuleReset() {
  mainModule.innerHTML = "";
  mainModule.classList.remove("home");
  mainModule.classList.remove("search");
  mainModule.classList.remove("library");
}
const randColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};
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
function slide() {
  let slideTo = currentSong.duration * (musicSlider.value / 100);
  currentSong.currentTime = slideTo;
}
function setVolume() {
  currentSong.volume = soundSlider.value / 100;
}
function setUpdate() {
  let sliderPosition = 0;
  if (!isNaN(currentSong.duration)) {
    sliderPosition = currentSong.currentTime * (100 / currentSong.duration);
    musicSlider.value = sliderPosition;

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

// -------------------------------------------- MAIN MODULE
// -------------------------------------------- MAIN MODULE
const playlistDate = new Date(2023, 0, 17, 14, 50, 0);
const now = new Date();
const [month, day, hour, minute] = [
  now.getMonth(),
  now.getDate(),
  now.getHours(),
  now.getMinutes(),
];

let diff = now.getTime() - playlistDate.getTime();
diff = Math.floor(diff / (1000 * 60 * 60 * 24));
let addedSentence = `Added ${diff} days ago`;

function volume() {
  if (currentSong.volume > 0) {
    soundSlider.value = 0;
    currentSong.volume = 0;

    soundBtn.classList.toggle("mute");
  } else {
    soundSlider.value = 75;
    currentSong.volume = 0.75;

    soundBtn.classList.toggle("mute");
  }
}

function getDuration(songIndex) {
  currentSong.src = songList[songIndex].url;
  return;
}
