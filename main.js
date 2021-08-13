'use strict'
const carrot_size = 80;
const carrot_count = 5;
const bug_count = 5;
const field = document.querySelector('.dowen');
const fieldRect = field.getBoundingClientRect();
const btn = document.querySelector('.up__btn');
const timer = document.querySelector('.timer');
const score = document.querySelector('.counter')


function initGame() {
  // 벌레와 당근을 생성한 뒤 field에 추가한다
  console.log(fieldRect);
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

initGame();



btn.addEventListener('click', event => {
  addItem.remove();
  initGame();
});