'use strict';

const DOG_SIZE = 145;

const MYDOG_COUNT = 1;
const DOG_COUNT = 3;

const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game_button');
const gameTimer = document.querySelector('.game_timer');
const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up_message');
const popUpRefresh = document.querySelector('.pop-up_refresh');

const winSound = new Audio('./sound/win.mp3');
const lostSound = new Audio('./sound/lost.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const cancelSound = new Audio('./sound/cancel.mp3');

let started = false;
let timer = undefined;

field.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});

popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopUp();
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimer();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('Replay❓');
    playSound(cancelSound);
    stopSound(bgSound);
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if (win) {
        playSound(winSound);
    } else {
        playSound(lostSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpWithText(win ? '강아지를 찾았어!🐶💓' : '강아지를 찾아줘😭');
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame();
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
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
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showPopUpWithText(text) {
    popUpText.innerHTML = text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
    popUp.classList.add('pop-up--hide');
}

function hideGameButton() {
   gameBtn.style.visibility = 'hidden';
}

function initGame() {
    field.innerHTML = '';
    addItem('mydog', MYDOG_COUNT, './img/dog9.png');
    addItem('dog', DOG_COUNT, './img/dog1.png');
    addItem('dog', DOG_COUNT, './img/dog2.png');
    addItem('dog', DOG_COUNT, './img/dog3.png');
    addItem('dog', DOG_COUNT, './img/dog4.png');
    addItem('dog', DOG_COUNT, './img/dog5.png');
    addItem('dog', DOG_COUNT, './img/dog6.png');
    addItem('dog', DOG_COUNT, './img/dog7.png');
    addItem('dog', DOG_COUNT, './img/dog8.png');
}

function onFieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.mydog')) {
        target.remove();
        finishGame(true);
    } else if (target.matches('.dog')) {
        finishGame(false);
    }
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

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}