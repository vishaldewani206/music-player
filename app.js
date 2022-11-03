function pad(unit) {
  return unit < 10 ? '0' + unit : unit;
  unit = unit.toString();
}
let volume = document.querySelector('#volume_range');
let songForward = false;
//adding song
let audioCtx = new Audio('songs/Akon - Right Now (Na Na Na) (Lyrics).mp3');
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
play.parentElement.addEventListener('click', () => {
  if (k) {
    play.src = 'images/play.png';

    audioCtx.play();
    timer = setInterval(startingTime, 1000);
    k = false;
    //volume length
    let length = audioCtx.duration;
    let minutes = Math.round(length / 60);
    let seconds = Math.round(length % 60);

    //duration of song in html

    minutes = pad(minutes);
    seconds = pad(seconds);
    songLength.innerHTML = `${minutes}:${seconds}`;

    //slider
  } else {
    play.src = 'images/pause.png';
    k = true;
    audioCtx.pause();
    clearInterval(timer);
  }
});

//volume range gradient and increase decrease volume
volume.addEventListener('input', () => {
  let math = volume.value * 100 + '%';
  console.log(math);
  audioCtx.volume = volume.value;
  volume.style.background =
    ' linear-gradient(90deg, rgba(74,76,80,1) 0%, rgba(74,76,80,1)' +
    math +
    ', rgba(209,209,210,0)' +
    math +
    ', rgba(255,255,255,0) 100%)';
});

//current time
let starting = document.querySelector('.starting_time');

let length;
function startingTime() {
  startingSeconds = Math.round(audioCtx.currentTime % 60);
  startingMinutes = Math.floor(audioCtx.currentTime / 60);
  console.log(`starting minutes: ${startingMinutes}`);
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
  console.log(songSlider.value);
}

//songslider forwarding
songSlider.addEventListener('input', () => {
  currenttime = Math.round((songSlider.value * length) / 100);
  console.log(currenttime);
  //song pause
  play.src = 'images/pause.png';
  k = true;
  audioCtx.pause();
  clearInterval(timer);
  songForward = true;
});

console.log('fuck you i am in ADDINGSONGS branch');
