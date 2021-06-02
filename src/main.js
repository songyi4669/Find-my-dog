'use strict';

import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const MYDOG_COUNT = 1;
const DOG_COUNT = 3;

const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector('.game_button');
const gameTimer = document.querySelector('.game_timer');

let started = false;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame();
});

const gameField = new Field(MYDOG_COUNT, DOG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
    if (!started) {
        return;
    }
    if (item === 'mydog') {
        finishGame(true);
    } else if (item === 'dog') {
        finishGame(false);
    }
}

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimer();
    startGameTimer();
    sound.playBackground();
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('Replay❓');
    sound.playCancel();
    sound.stopBackground();
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if (win) {
        sound.playWin();
    } else {
        sound.playLost();
    }
    stopGameTimer();
    sound.stopBackground();
    gameFinishBanner.showWithText(win ? '강아지를 찾았어!🐶💓' : '강아지를 찾아줘😭');
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
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
   gameBtn.style.visibility = 'hidden';
}

function initGame() {
    gameField.init();
}

