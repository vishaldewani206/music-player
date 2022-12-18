//animation wait
document.body.className += ' js-loading';
window.addEventListener('load', showPage, false);
function showPage() {
  document.body.className = document.body.className.replace('js-loading', '');
}

function pad(unit) {
  return unit < 10 ? '0' + unit : unit;
  unit = unit.toString();
}
//lists of songs
let songList = [
  'songs/Benny Blanco, Halsey & Khalid - Eastside (Lyrics) (1).mp3',
  'songs/Juice Wrld - Lucid Dreams (Lyrics).mp3',
  'songs/Post Malone - rockstar (Lyrics) ft. 21 Savage.mp3',
  'songs/Somebody That I Used To Know - Gotye (Lyrics) ft. Kimbra.mp3',
  'songs/Taio Cruz - Dynamite (Lyrics).mp3',
  'songs/Arizona Zervas - ROXANNE (Lyrics).mp3',
  'songs/Bazanji - Fed Up (Lyrics).mp3',
  'songs/CJ - Whoopty (Lyrics).mp3',
  'songs/Glass Animals - Heat Waves (Lyrics).mp3',
  'songs/Harry Styles - Watermelon Sugar (Lyrics).mp3',
  'songs/Jos Slovick - I Am a Poor Wayfaring Stranger (from 1917) - Official Video.mp3',
  'songs/Lil Nas X - SUN GOES DOWN (Lyrics).mp3',
  'songs/MAGIC! - Rude (Lyrics).mp3',
  'songs/Post Malone, Swae Lee - Sunflower (Spider-Man - Into the Spider-Verse).mp3',
  'songs/Travis Scott - SICKO MODE ft. Drake.mp3',
  'songs/Vance Joy - Riptide (Lyrics).mp3',
];
let volume = document.querySelector('#volume_range');
let songForward = false;
let songNumber = 0;
//adding song
let audioCtx = new Audio(songList[songNumber]);
audioCtx.volume = volume.value;
let songSlider = document.querySelector('#slider_btn');

//mute volume
let i = true;
let volumeIcon = document.querySelector('.volume_img');
volumeIcon.addEventListener('click', () => {
  if (i) {
    volumeIcon.src = 'images/volume-mute-solid.svg';
    audioCtx.volume = 0;

    i = false;
  } else {
    volumeIcon.src = 'images/volume-high-solid.svg';
    audioCtx.volume = volume.value;
    i = true;
  }
});
let currenttime;
//play
let k = true;
let timer;
let play = document.querySelector('.on');
let songLength = document.querySelector('.ending_time');
let startingSeconds;
let startingMinutes;
play.parentElement.addEventListener('click', playAndPause);
function playAndPause() {
  if (k) {
    play.src = 'images/play.png';
    audioCtx.volume = volume.value;
    audioCtx.play();
    k = false;
    //volume length
    let length = audioCtx.duration;

    let minutes = Math.trunc(length / 60);
    let seconds = Math.trunc(length % 60);

    //duration of song in html

    minutes = pad(minutes);
    seconds = pad(seconds);
    songLength.innerHTML = `${minutes}:${seconds}`;
    timer = setInterval(startingTime, 1000);

    //slider
  } else {
    play.src = 'images/pause.png';
    k = true;
    audioCtx.pause();
    clearInterval(timer);
  }
}

//volume range gradient and increase decrease volume
volume.addEventListener('input', () => {
  let math = volume.value * 100 + '%';

  audioCtx.volume = volume.value;
  volume.style.background =
    ' linear-gradient(90deg, rgb(23, 23, 24) 0%, rgb(23, 23, 24)' +
    math +
    ', rgba(209,209,210,0)' +
    math +
    ', rgba(255,255,255,0) 100%)';
});

//current time
let starting = document.querySelector('.starting_time');

let length;
function startingTime() {
  if (songSlider.value == 100) {
    nextSong();
  }
  startingSeconds = Math.trunc(audioCtx.currentTime % 60);
  startingMinutes = Math.trunc(audioCtx.currentTime / 60);

  if (startingSeconds > 59) {
    startingSeconds = 0;
    startingMinutes = startingMinutes + 1;
  }
  startingSeconds = pad(startingSeconds);
  starting.innerHTML = `${startingMinutes}:${startingSeconds}`;
  startingSeconds++;
  length = audioCtx.duration;
  if (songForward) {
    audioCtx.currentTime = currenttime;
    songForward = false;
  } else {
    currenttime = audioCtx.currentTime;
  }
  songSlider.value = (currenttime / length) * 100;
}

//songslider forwarding
songSlider.addEventListener('input', () => {
  currenttime = Math.trunc((songSlider.value * length) / 100);

  //song pause
  play.src = 'images/pause.png';
  k = true;
  audioCtx.pause();
  clearInterval(timer);
  songForward = true;
});

//hamburger
//display song playlist
let songPlaylist = document.querySelector('.songs');
let hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  if (hamburger.classList == 'hamburger active') {
    songPlaylist.style.opacity = 1;
    songPlaylist.style.zIndex = 1;
  } else {
    songPlaylist.style.opacity = 0;
    songPlaylist.style.zIndex = -1;
  }
});

//adding song name
let songNameDiv = document.querySelector('.songName');
let songName = songList[songNumber].split('songs/');
songName = songName[1].split('.mp3');

songNameDiv.innerHTML = songName[0];

//backward forward songs
let forward = document.querySelector('.forward');
let backward = document.querySelector('.backward');
backward.addEventListener('click', () => {
  songNumber--;
  if (songNumber < 0) {
    songNumber = songList.length - 1;
  }
  audioCtx.pause();
  audioCtx = new Audio(songList[songNumber]);

  k = true;
  length = audioCtx.duration;

  playAndPause();
  let songNameDiv = document.querySelector('.songName');
  let songName = songList[songNumber].split('songs/');
  songName = songName[1].split('.mp3');

  songNameDiv.innerHTML = songName[0];
});
forward.addEventListener('click', nextSong);
function nextSong() {
  songNumber++;
  if (songNumber >= songList.length - 1) {
    songNumber = 0;
  }
  console.log('songnumber' + songList.length);
  audioCtx.pause();
  audioCtx = new Audio(songList[songNumber]);

  k = true;
  length = audioCtx.duration;

  clearInterval(timer);
  playAndPause();
  let songNameDiv = document.querySelector('.songName');
  let songName = songList[songNumber].split('songs/');
  songName = songName[1].split('.mp3');

  songNameDiv.innerHTML = songName[0];
}

for (let i = 0; i < songList.length; i++) {
  let songName = songList[i].split('songs/');
  songName = songName[1].split('.mp3');

  songPlaylist.innerHTML +=
    '<h2 class="playlistSongs">' + songName[0] + '</h2>';
}
let playlistSongs = document.querySelectorAll('.playlistSongs');

document.addEventListener('click', () => {
  for (let j = 0; j < playlistSongs.length; j++) {
    playlistSongs[j].addEventListener('click', () => {
      audioCtx.pause();
      audioCtx = new Audio('songs/' + playlistSongs[j].textContent + '.mp3');

      k = true;
      playAndPause();
      songNameDiv.innerHTML = playlistSongs[j].textContent;
    });
  }
});
