import {Player} from './player.js'
import {Game} from './game.js'
import {displayData} from './display.js'

// timing class
export class Timer {
    constructor(fn, t) {
      let timerObj = setInterval(fn, t);
  
      this.stop = function () {
        if (timerObj) {
          clearInterval(timerObj);
          timerObj = null;
          timeleft = 0;
        }
        return this;
      };
      // pause time
      this.pause = function () {
        if (timerObj) {
          clearInterval(timerObj);
          timerObj = null;
        }
        return this;
      };
  
      // start timer using current settings (if it's not already running)
      this.start = function () {
        if (!timerObj) {
          this.stop();
          timerObj = setInterval(fn, t);
        }
        return this;
      };
  
      // start with new or original interval, stop current interval
      this.reset = function (newT = t) {
        t = newT;
        return this.stop().start();
      };
    }
  }
  
  // function for the timing
  let timeleft = parseInt(sessionStorage.getItem('timer'));
export  const timer = new Timer(function () {
    if (timeleft === 20) {
      timeleft = 0;
      Player.lose();
      Game.refreshGameBoard();
      displayData();
    }
    sessionStorage.setItem('timer', timeleft);
    document.getElementById("countTIme").value = timeleft++;
  }, 1000);