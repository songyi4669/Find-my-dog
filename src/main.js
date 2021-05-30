'use strict';

const DOG_SIZE = 145;

const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();

function initGame() {
    addItem('mydog', 1, './img/dog9.png');
    addItem('dog1', 3, './img/dog1.png');
    addItem('dog2', 3, './img/dog2.png');
    addItem('dog3', 3, './img/dog3.png');
    addItem('dog4', 3, './img/dog4.png');
    addItem('dog5', 3, './img/dog5.png');
    addItem('dog6', 3, './img/dog6.png');
    addItem('dog7', 3, './img/dog7.png');
    addItem('dog8', 3, './img/dog8.png');
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - DOG_SIZE;
    const y2 = fieldRect.height - DOG_SIZE;
    for (let i = 0; i < count; i++){
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
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

initGame();