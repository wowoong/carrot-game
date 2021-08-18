'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
.withGameDuration(3)
.withCarrotCount(2)
.withBugCount(2)
.build();

game.setGameStopListner((reason) => {
  let message;
  switch(reason) {
    case Reason.cancle:
      message = 'REPLAY?';
      sound.playalert();
      break;
    case Reason.win:
      message = 'YOU WIN';
      sound.playwin();
      break;
    case Reason.lose:
      message = 'YOU LOST';
      sound.playbug();
      break;
    default:
        throw new Error('not valid reason');
  }
  gameFinishBanner.show(message);
});

gameFinishBanner.setClickListner(() => {
  game.start();
});