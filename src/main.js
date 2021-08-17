'use strict';
import PopUp from './popup.js';
import dowen from './dowen.js';


const carrot_count = 5;
const bug_count = 5;
const game_duration_sec = 5;

const btn = document.querySelector('.up__btn');
const gameTimer = document.querySelector('.timer');
const gameScore = document.querySelector('.counter');


const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');

let started = false;
let score = 0;
let timer = undefined;


const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListner(() => {
  startGame();
})
const gamedowen = new dowen(carrot_count, bug_count);
gamedowen.setClickListener(onItemClick);

function onItemClick(event) {
  if(!started){
    return;
  }
  if(item === '.carrot') {
    score++;
    updateScore();
    if(carrot_count === score) {
      finishGame(true);
    }
  } else if(item === '.bug') {
    finishGame(false);
  }
}



btn.addEventListener('click', event => {
  if(started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideStopBtn();
  gameFinishBanner.show('REPLAY?');
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideStopBtn();
  if(win) {
    playSound(winSound);;
  }
  stopGameTimer();
  gameFinishBanner.show(win ? 'YOU WON' : 'YOU LOST');
  stopSound(bgSound);
};




function showStopBtn() {
  const icon = btn.querySelector('.fas')
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
};
function hideStopBtn() {
  btn.style.visibility = 'hidden'
};
function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTime = game_duration_sec;
  updateTimerText(remainingTime);
  timer = setInterval(() => {
    if(remainingTime <= 0) {
      clearInterval(timer);
      finishGame(carrot_count === score);
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000)
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
  score = 0;
  gameScore.innerText = carrot_count;
  gamedowen.init();
}









function updateScore() {
  gameScore.innerText = carrot_count - score;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}