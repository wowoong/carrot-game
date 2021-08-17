'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.popup');
    this.popUpText = document.querySelector('.description');
    this.popUpBtn = document.querySelector('.reple');
    this.popUpBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    })
  }

  setClickListner(onClick) {
    this.onClick = onClick;
  }
  show(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove('popup--hide');
  }
  hide() {
    this.popUp.classList.add('popup--hide')
  }
}