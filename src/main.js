'use strict';

const DOG_SIZE = 145;

const MYDOG_COUNT = 1;
const DOG_COUNT = 3;

const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game_button');
const gameTimer = document.querySelector('.game_timer');

let started = false;
let timer = undefined;

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started;
});

function startGame() {
    initGame();
    showStopButton();
    showTimer();
    startGameTimer();
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function showTimer() {
    gameTimer.style.visibility = 'visible';
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}


function initGame() {
    field.innerHTML = '';
    addItem('mydog', MYDOG_COUNT, './img/dog9.png');
    addItem('dog1', DOG_COUNT, './img/dog1.png');
    addItem('dog2', DOG_COUNT, './img/dog2.png');
    addItem('dog3', DOG_COUNT, './img/dog3.png');
    addItem('dog4', DOG_COUNT, './img/dog4.png');
    addItem('dog5', DOG_COUNT, './img/dog5.png');
    addItem('dog6', DOG_COUNT, './img/dog6.png');
    addItem('dog7', DOG_COUNT, './img/dog7.png');
    addItem('dog8', DOG_COUNT, './img/dog8.png');
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