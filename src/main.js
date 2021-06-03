'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from "./sound.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .WithGameDuration(5)
    .WithMydogCount(1)
    .WithDogCount(3)
    .build();

game.setGameStopListener(reason => {
    let message;
    switch (reason) {
        case Reason.cancel:
            message = 'Replay❓';
            sound.playCancel();
            break;
        case Reason.win:
            message = '강아지를 찾았어🐶💓';
            sound.playWin();
            break;
        case Reason.lose:
            message = '강아지를 찾아줘😭';
            sound.playLost();
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
    });

    gameFinishBanner.setClickListener(() => {
        game.start();
});