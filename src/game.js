'use strict';
import * as sound from './sound.js';
import dowen from './dowen.js';

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameTimer = document.querySelector('.timer');
    this.gameScore = document.querySelector('.counter');
    this.btn = document.querySelector('.up__btn');
    this.btn.addEventListener('click', () => {
      if(this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gamedowen = new dowen(carrotCount, bugCount);
    this.gamedowen.setClickListener(this.onItemClick);
  }
  setGameStopListner(onGameStop) {
    this.onGameStop = onGameStop;
  }
    start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playbg();
  }
  
    stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideStopBtn();
    sound.playalert();
    sound.stopbg();
    this.onGameStop && this.onGameStop('cancel');
  }

  finish(win) {
    this.started = false;
    this.hideStopBtn();
    if(win) {
      sound.playwin();
    }
    this.stopGameTimer();
    this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
    sound.stopbg();
  };
  
  
  onItemClick = (item) => {
    if(!this.started){
      return;
    }
    if(item === 'carrot') {
      this.score++;
      this.updateScore();
      if(this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if(item === 'bug') {
      this.finish(false);
    }
  }


  setClickListner(onClick) {
    this.onClick = onClick;
  }
  startGameTimer() {
    let remainingTime = this.gameDuration;
    updateTimerText(remainingTime);
    this.timer = setInterval(() => {
      if(remainingTime <= 0) {
        clearInterval(this.timer);
        finish(this.carrotCount === this.score);
        return;
      }
      updateTimerText(--remainingTime);
    }, 1000)
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  showStopBtn() {
    const icon = this.btn.querySelector('.fas')
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.btn.style.visibility = 'visible';
  };
  hideStopBtn() {
    this.btn.style.visibility = 'hidden'
  };
  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }
  
  startGameTimer() {
    let remainingTime = this.gameDuration;
    this. updateTimerText(remainingTime);
    this.timer = setInterval(() => {
      if(remainingTime <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainingTime);
    }, 1000)
  }
  
  stopGameTimer() {
    clearInterval(this.timer);
  }
  
  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }
  
  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gamedowen.init();
  }
  
  updateScore() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
  
} 