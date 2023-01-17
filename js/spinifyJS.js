const playPauseBtn = document.querySelector(".play-pause-btn");
const shuffleBtn = document.querySelector(".shuffle-btn");
const goBackBtn = document.querySelector(".go-back-btn");
const goForwardBtn = document.querySelector(".go-forward-btn");
const repeatBtn = document.querySelector(".repeat-btn");
const soundBtn = document.querySelector('.sound-btn')

let playing = false;
let shuffle = false;
let repeat = false;
let volumeOn = true;

const trackList = [
    {
        tittle: "Forest Lullaby",
        artist: "Lesfm",
        image: "../img/posters/forest-lullaby.jpg",
        url: "../audio/forest-lullaby-lesfm.mp3"
    },
    {
        tittle: "Life Like",
        artist: "AlexAction",
        image: "../img/posters/lifelike.jpg",
        url: "../audio/lifelike-alexiaction.mp3"
    },
    {
        tittle: "Lo-Fi Chillhop",
        artist: "Music Unlimited",
        image: "../img/posters/lo-fi.jpg",
        url: "../audio/lo-fi-chillhop-beat-background-music-musicunlimited.mp3"
    },
    {
        tittle: "Lo-Fi Study",
        artist: "Fassounds",
        image: "../img/posters/lo-fi-2.jpg",
        url: "../audio/lofi-study-fassounds.mp3"
    },
    {
        tittle: "Playing in color",
        artist: "Nullhertz",
        image: "../img/posters/playing.jpg",
        url: "../audio/playing-in-color-nullhertz.mp3"
    }
]

playPauseBtn.addEventListener('click', function (){
    let playOrPause = function (){    
        playPauseBtn.classList.toggle('play')
        playPauseBtn.classList.toggle('pause')
}
if (playing === false){
    playing === true
    playOrPause()
    console.log('playing');
}
if (playing === true){
    playing === false
    playOrPause()
    console.log('pause');
}
})

soundBtn.addEventListener('click', function (){
    
})