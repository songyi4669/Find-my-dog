'use strict';

import * as sound from "./sound.js";
import { Field, ItemType } from "./field.js";

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
});

export class GameBuilder{
    WithGameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    WithMydogCount(num) {
        this.mydogCount = num;
        return this;
    }

    WithDogCount(num) {
        this.dogCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration,
            this.mydogCount,
            this.dogCount
        );
    }
}

class Game{
    constructor(gameDuration, mydogCount, dogCount) {
        this.gameDuration = gameDuration;
        this.mydogCount = mydogCount;
        this.dogCount = dogCount;

        this.gameTimer = document.querySelector('.game_timer');
        this.gameBtn = document.querySelector('.game_button');
        this.gameBtn.addEventListener('click', () => {
           if (this.started) {
        this.stop(Reason.cancel);
         } else {
        this.start();
    }
});

        this.gameField = new Field(mydogCount, dogCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

   start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimer();
    this.startGameTimer();
    sound.playBackground();
}

   stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
    }

    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item === ItemType.mydog) {
            this.stop(Reason.win);
        } else if (item === ItemType.dog) {
            this.stop(Reason.lose);
        }
    };

    showStopButton() {
    const icon = this.gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
    }
    
    hideGameButton() {
   this.gameBtn.style.visibility = 'hidden';
}

    startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(this.timer);
            this.stop(Reason.lose);
            return;
        }
        this.updateTimerText(--remainingTimeSec);
    }, 1000);
}

stopGameTimer() {
    clearInterval(this.timer);
}


updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
    }
    
initGame() {
    this.gameField.init();
}

showTimer() {
    this.gameTimer.style.visibility = 'visible';
}

}