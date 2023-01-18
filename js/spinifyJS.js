const playPauseBtn = document.querySelector(".play-pause-btn");
const shuffleBtn = document.querySelector(".shuffle-btn");
const goBackBtn = document.querySelector(".go-back-btn");
const goForwardBtn = document.querySelector(".go-forward-btn");
const repeatBtn = document.querySelector(".repeat-btn");
const soundBtn = document.querySelector(".sound-btn");

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
let shuffle = false;
let updateTimer;

const songList = [
  {
    tittle: "Forest Lullaby",
    artist: "Lesfm",
    image: "../img/posters/forest-lullaby.jpg",
    url: "../audio/forest-lullaby-lesfm.mp3",
  },
  {
    tittle: "Life Like",
    artist: "AlexAction",
    image: "../img/posters/lifelike.jpg",
    url: "../audio/lifelike-alexiaction.mp3",
  },
  {
    tittle: "Lo-Fi Chillhop",
    artist: "Music Unlimited",
    image: "../img/posters/lo-fi.jpg",
    url: "../audio/lo-fi-chillhop-beat-background-music-musicunlimited.mp3",
  },
  {
    tittle: "Lo-Fi Study",
    artist: "Fassounds",
    image: "../img/posters/lo-fi-2.jpg",
    url: "../audio/lofi-study-fassounds.mp3",
  },
  {
    tittle: "Playing in color",
    artist: "Nullhertz",
    image: "../img/posters/playing.jpg",
    url: "../audio/playing-in-color-nullhertz.mp3",
  },
];

loadSong(index);

playPauseBtn.addEventListener("click", playPause);
shuffleBtn.addEventListener("click", shuffling);
goBackBtn.addEventListener("click", previousSong);
goForwardBtn.addEventListener("click", nextSong);
repeatBtn.addEventListener("click", repeating);
musicSlider.addEventListener("change", slide);
soundSlider.addEventListener("change", setVolume);

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
  console.log("shuffle");
}
function startShuffle() {
  shuffle = true;
  //   shuffleBtn.classList.remove(shuffleActive);
}
function stopShuffle() {
  shuffle = false;
  shuffleBtn.classList.add(shuffleActive);
  // Create class for shuffle button active state
}
function repeating() {
  let currentIndex = index;
  loadSong(currentIndex);
  playSong();
}
function playPause() {
  playing ? pauseSong() : playSong();
}
function playSong() {
  currentSong.play();
  playing = true;
  console.log("play");
}
function pauseSong() {
  currentSong.pause();
  playing = false;
  console.log("pause");
}

function nextSong() {
  if (index < songList.length - 1 && shuffle === false) {
    ++index;
  }
  if (index < songList.length - 1 && shuffle === true) {
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

// soundBtn.addEventListener("click");
