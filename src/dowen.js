'use strict';

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const carrot_size = 80;

export default class dowen {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.dowen');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this.addItem('carrot', this.carrotCount, './img/carrot.png');
    this.addItem('bug', this.bugCount, './img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }


  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - carrot_size;
    const y2 = this.fieldRect.height - carrot_size;
    for (let i = 0 ; i< count ; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);    
    }
  };

  onClick(event) {
    const target = event.target;
    if(target.matches('.carrot')) {
      target.remove();
      playSound(carrotSound);
      this.onItemClick && this.onItemClick('carrot');
    } else if(target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
      playSound(bugSound);
    }
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
  }

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}