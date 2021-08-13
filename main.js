'use strict'
const carrot_size = 80;
const carrot_count = 5;
const bug_count = 5;
const game_duration_sec = 5;

const field = document.querySelector('.dowen');
const fieldRect = field.getBoundingClientRect();
const btn = document.querySelector('.up__btn');
const gameTimer = document.querySelector('.timer');
const gameScore = document.querySelector('.counter');
const popUp = document.querySelector('.popup');
const popUpText = document.querySelector('.description');
const popUpBtn = document.querySelector('.reple');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');

let started = false;
let score = 0;
let timer = undefined;



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
  showPopUp('REPLAY?');
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
  showPopUp(win ? 'YOU WON' : 'YOU LOST');
  stopSound(bgSound);
};

field.addEventListener('click', onFiledClick);

popUpBtn.addEventListener('click', () => {
  startGame();
  hidePopUp();
})

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

function showPopUp(text) {
  popUpText.innerText = text;
  popUp.classList.remove('popup--hide');
}
function hidePopUp() {
  popUp.classList.add('popup--hide');
}
function initGame() {
  score = 0;
  field.innerHTML = '';
  gameScore.innerText = carrot_count;
  // 벌레와 당근을 생성한 뒤 field에 추가한다
  addItem('carrot', carrot_count, './img/carrot.png');
  addItem('bug', bug_count, './img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - carrot_size;
  const y2 = fieldRect.height - carrot_size;
  for (let i = 0 ; i< count ; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);    
  }
};

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function onFiledClick(event) {
  if(!started){
    return;
  };
  const target = event.target;
  if(target.matches('.carrot')) {
    // 당근
    target.remove();
    score++;
    playSound(carrotSound);
    updateScore();
    if(carrot_count === score) {
      finishGame(true);
    }
  } else if(target.matches('.bug')) {
// 벌레
    playSound(bugSound);
    stopGameTimer();
    finishGame(false);
  }
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