'use strict';
import PopUp from './popup.js';
import Game from './game.js';


const gameFinishBanner = new PopUp();

const game = new Game(3, 2, 2);
game.setGameStopListner((reason) => {
  console.log(reason);
  let message;
  switch(reason) {
    case 'cancel':
      message = 'REPLAY?';
      break;
    case 'win':
      message = 'YOU WIN';
      break;
    case 'lose':
      message = 'YOU LOST';
      break;
      default:
        throw new Error('not valid reason');
  }
  gameFinishBanner.show(message);
});

gameFinishBanner.setClickListner(() => {
  game.start();
});