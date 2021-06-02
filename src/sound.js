'use strict';

const winSound = new Audio('./sound/win.mp3');
const lostSound = new Audio('./sound/lost.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const cancelSound = new Audio('./sound/cancel.mp3');

export function playWin() {
    playSound(winSound);
}

export function playLost() {
    playSound(lostSound);
}

export function playCancel() {
    playSound(cancelSound);
}

export function playBackground() {
    playSound(bgSound);
}

export function stopBackground() {
    stopSound(bgSound);
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}



