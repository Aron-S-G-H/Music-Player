"use strict";

const $ = document;
const cover = $.querySelector('.cover');
const songsList = $.getElementById('song-list');
const playingBanner = $.querySelector('.cover .now-playing-banner');
const background = $.getElementById('background');
const nowPlayingImg = $.querySelector('.now-playing-img');
const nowPlayingTitle = $.querySelector('.now-playing-title');
const bigPlayBtn = $.querySelector('.big-play-button');
const smallPlayBtn = $.getElementById('small-play-button');
const prevBtn = $.getElementById("prev");
const nextBtn = $.getElementById("next");
const audio = $.getElementById('audio');
const currentTimeEl = $.getElementById("current-time");
const durationEl = $.getElementById("duration");
const progress = $.getElementById("progress");
const progressContainer = $.getElementById("progress-container");
const nowPlaying = document.querySelector(".now-playing-wrapper");


// Musics
const songs = [
  {path: "musics/The Dark of you.mp3", displayName: "The Dark of you", artist: "Breaking Benjamin", cover: "images/breaking b.jpg", duration:'4:12'},
  {path: "musics/drive forever.mp3", displayName: "Drive forever", artist: "Sergio Valentino", cover: "images/drive.jpg", duration:'4:34'},
  {path: "musics/living life.mp3", displayName: "Living life in The Night", artist: "Cheriimoya ft Sierra kidd", cover: "images/Cheriimoya.jpg", duration:'3:37'},
  {path: "musics/Call Out My Name.mp3", displayName: "Call out My name", artist: "The Weeknd", cover: "images/the weeknd.jpg", duration:'3:48'},
];


// Current Song Index
let songIndex = 0;
// Check if Playing
let isPlaying = false;


// Play
const playSong = () => {
  isPlaying = true;
  bigPlayBtn.firstElementChild.classList.replace("fa-play", "fa-pause");
  smallPlayBtn.classList.replace("fa-play", "fa-pause");
  audio.play();
}


// Pause
const pauseSong = () => {
  isPlaying = false;
  bigPlayBtn.firstElementChild.classList.replace("fa-pause", "fa-play");
  smallPlayBtn.classList.replace("fa-pause", "fa-play");
  audio.pause();
}


// Previous Song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}


// Next Song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}


// Update DOM 
const loadSong = song => {
  cover.style.backgroundImage = `url("${song.cover}")`;
  playingBanner.innerHTML = '';
  playingBanner.insertAdjacentHTML('beforeend', `<p1><b>${song.displayName}</b>- ${song.artist}</p1>`);
  background.src = song.cover;
  nowPlayingImg.style.backgroundImage = `url("${song.cover}")`;
  nowPlayingTitle.innerHTML = '';
  nowPlayingTitle.insertAdjacentHTML('beforeend', `<h>${song.displayName}</h><p>${song.artist}</p>`);
  audio.src = song.path;
};


// Set & play selected song 
const setSong = songName => {
  let selected_song_index = songs.findIndex(function(item){
    return item.displayName == songName
  });
  songIndex = selected_song_index;
  loadSong(songs[songIndex]);
  playSong();
  hideShow();
} 


// Update Progress Bar & Time
const updateProgressBar = e => {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}


// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}


const hideShow = () => {
  if (cover.style.display === "none" && songsList.style.display === "none") {
    cover.style.display = "";
    songsList.style.display = "";
    nowPlaying.style.display = "none";
  }else {
    cover.style.display = "none";
    songsList.style.display = "none";
    nowPlaying.style.display = "";
  }
}
  

songs.forEach(function(song){
  songsList.insertAdjacentHTML('beforeend', `<div class="song-row" onclick="setSong('${song.displayName}')"><h1>${song.displayName}</h1> <span>${song.duration}</span></div>`)
});


$.addEventListener('onload', loadSong(songs[songIndex]));
$.addEventListener('keypress', event => {
  if (event.keyCode == 32){
    if (isPlaying){
      pauseSong()
    }
    else{
      playSong()
    }
  }
});
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("ended", nextSong);
audio.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
// Play or Pause Event Listener
bigPlayBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
    hideShow()
  }
});
// Play or Pause Event Listener
smallPlayBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
});
  