'use strict';

import dowen from './dowen.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancle: 'cancle',
});

//Builder Pattern
export class GameBuilder {
  withGameDuration(duration){
    this.gameDuration = duration;
    return this;
  }
  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount,
      this.bugCount
    );
  };
}

class Game {
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
        this.stop(Reason.cancle);
      } else {
        this.start();
      }
    });

    this.gamedowen = new dowen(carrotCount, bugCount);
    this.gamedowen.setClickListener(this.onItemClick);
  }

  setGameStopListner(onGameStop) {
    this.onGameStop = onGameStop;
  };
    start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playbg();
  };
  
    stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideStopBtn();
    sound.stopbg();
    this.onGameStop && this.onGameStop(reason);
  };
  
  
  
  onItemClick = (item) => {
    if(!this.started) {
      return;
    }
    if(item === 'carrot') {
      this.score++;
      this.updateScore();
      if(this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if(item === 'bug') {
      this.stop(Reason.lose);
    };
  };

  setClickListner(onClick) {
    this.onClick = onClick;
  };
  startGameTimer() {
    let remainingTime = this.gameDuration;
    this.updateTimerText(remainingTime);

    this.timer = setInterval(() => {
      if(remainingTime <= 0) {
        clearInterval(this.timer);
        
        if (this.started) {
          this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        }
        
        return;
      }
      this.updateTimerText(--remainingTime);
    }, 1000);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  showStopBtn() {
    const icon = this.btn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.btn.style.visibility = 'visible';
  };
  hideStopBtn() {
    this.btn.style.visibility = 'hidden';
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

        if (this.started) {
          this.stop(this.score === this.carrotCount ? Reason.win : Reason.lose);
        }
        
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