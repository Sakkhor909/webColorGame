
import {Game, startGame} from './game.js'
import {gameWrongColorSound} from './sound.js'
// Player object
export const Player = {
    // saving the name
    name(inputName) {
     let playerName = inputName.value.replace(/\s+/g, ' ').trim();
      localStorage.setItem("playerName", playerName);
    },
    // Pplayer name validation
    nameValidation(input) {
      input.addEventListener("input", function () {
        let x = input.value;
        // for validation
        if (x.trim() == null || x.trim() == "" || x === " ") {
          input.dataset.state = 'invalid';
          input.setCustomValidity("Please use a valid name");
        } else {
          input.setCustomValidity("");
          input.dataset.state = 'valid';
        }
      })
    },
    savePlayerInfo (evt) {
      evt.preventDefault();
      const inputName = document.getElementById("playerNameInput");
      Player.name(inputName);
      localStorage.setItem("highScore", 0);
      startGame(evt);
    },
    lose() {
      // chance decrease
      let chance = parseInt(sessionStorage.getItem("chance"));
      chance--;
      if (chance == 0) {
        Game.Over();
      } else {
        sessionStorage.setItem("chance", chance);
      }
      // set track
      let track = parseInt(sessionStorage.getItem('track'));
      track = 0;
      sessionStorage.setItem("track", track);
      // set animation
      document.getElementById("RGBbox").classList.add('shaking');
      setTimeout(function () {
        document.getElementById("RGBbox").classList.remove('shaking');
      }, 1000);
  
      // play the audio
      if (localStorage.getItem("sound") == 1){
        gameWrongColorSound.play();
      }
  
    }
  }