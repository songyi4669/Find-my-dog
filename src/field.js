'use strict';

const DOG_SIZE = 145;

export default class Field{
    constructor(mydogCount, dogCount) {
        this.mydogCount = mydogCount;
        this.dogCount = dogCount;
        this.field = document.querySelector('.game_field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }

    init() {
        this.field.innerHTML = '';
        this._addItem('mydog', this.mydogCount, './img/dog9.png');
        this._addItem('dog', this.dogCount, './img/dog1.png');
        this._addItem('dog', this.dogCount, './img/dog2.png');
        this._addItem('dog', this.dogCount, './img/dog3.png');
        this._addItem('dog', this.dogCount, './img/dog4.png');
        this._addItem('dog', this.dogCount, './img/dog5.png');
        this._addItem('dog', this.dogCount, './img/dog6.png');
        this._addItem('dog', this.dogCount, './img/dog7.png');
        this._addItem('dog', this.dogCount, './img/dog8.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - DOG_SIZE;
    const y2 = this.fieldRect.height - DOG_SIZE;
    for (let i = 0; i < count; i++){
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
}

    onClick=event=> {
     const target = event.target;
     if (target.matches('.mydog')) {
         target.remove();
         this.onItemClick && this.onItemClick('mydog');
     } else if (target.matches('.dog')) {
         this.onItemClick && this.onItemClick('dog');
    }
    };
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}