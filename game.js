window.addEventListener('beforeunload', function (e) {
  e.preventDefault(); 
  e.returnValue = 'Do not refresh frequenlty, Game could be facing error';
 });

window.onload = function() {
  setTimeout (()=> {
    document.body.classList.add('loaded');
  }, 800);
};

document.addEventListener('contextmenu', event => event.preventDefault());

const mouseCursor = document.querySelector('.cursor');
const gameButtonBoard = document.querySelector("main");
const paintBuckets = document.querySelectorAll('.plateBackground');
gameButtonBoard.addEventListener("mouseover", function(){
  mouseCursor.style.visibility = "visible";
})
gameButtonBoard.addEventListener("mouseleave", function(){
  mouseCursor.style.visibility = "hidden";
})
for (let paintBucket of paintBuckets) {
  paintBucket.addEventListener("mouseover", function(e){
    document.querySelector('.cls-1').style.fill = e.target.style.fill;
    })
}

window.addEventListener('mousemove', cursor);
function cursor (e) {
  mouseCursor.style.top = e.pageY + "px";
  mouseCursor.style.left = e.pageX + "px";
}



// importing game tamplate
// importing game color
import { Color } from './color.js';
import { displayData } from './display.js';
// importing game player
import { Player } from './player.js';
// importing game sound object
import { gameChanceSound, gameHintSound, gameOverSound, gameRightColorSound } from './sound.js';
import { Tamplate } from './tamplate.js';
// importing game timer
import { timer } from './timer.js';






// Function for start game
export function startGame(evt) {

  if (evt.target.id == 'geustStart') {
    sessionStorage.setItem("Guest", true);
  } else {
    sessionStorage.setItem("Guest", false);
  }
  sessionStorage.setItem("startGame", true);
  sessionStorage.setItem('gameOver', false);
  Game.reset();
  Game.mode();
  Game.refreshGameBoard();
  document.getElementById("GameModal").style.display = "none";
  mouseLeaveOn();
  listenHelpButton ();
  displayData();
}

// game object

export const Game = {
  // game mode
  mode() {
    let currentMode = document.getElementById("colorMode").value;
    sessionStorage.setItem("currentMode", currentMode);
  },
  // refresh game board
  refreshGameBoard() {
    // generate color
    let colors;
    if (sessionStorage.getItem("currentMode") == 'rgb') {
       colors = Color.generateRGBrandom();
      sessionStorage.setItem("colors", JSON.stringify(colors));
    } else {
      colors = Color.generateHEXrandom();
      sessionStorage.setItem("colors", JSON.stringify(colors));
    }
    // pick color
    let pickedColor = colors[Color.pickRandom()];
    sessionStorage.setItem("pickColors", pickedColor);

    // refresh the buttons
    sessionStorage.setItem('invisibleButton', 'clear');
    const gameButton = document.querySelectorAll(".gameButton");
    const plateBorder = document.querySelectorAll(".plateBorder");
    for (let i = 0; i < gameButton.length; i++) {
      gameButton[i].style.visibility = "visible";
      gameButton[i].blur();
      gameButton[i].classList.add('popUp');
      plateBorder[i].style.fill = 'black';
    }
    setTimeout(function () {
      for (let i = 0; i < gameButton.length; i++) {
        gameButton[i].classList.remove('popUp');
      }
    }, 1000);
    // rest hint Button count
    sessionStorage.setItem('hintButtonCount', 0);

  },
  score (){
    let score = parseInt(sessionStorage.getItem("score"));
    score++;
    sessionStorage.setItem("score", score);
    if (localStorage.getItem("highScore") < score) {
      localStorage.setItem("highScore", score);
    }
  },
  level () {
    let level = parseInt(sessionStorage.getItem('level'));
    let score = parseInt(sessionStorage.getItem("score"));
    switch (score) {
      case 10:
        level++;
        sessionStorage.setItem("level", level);
        sessionStorage.setItem("hints", 4);
         Tamplate.levelDiv();
        document.body.classList.remove('loaded');
        setTimeout (()=> {
          document.body.classList.add('loaded');
          document.getElementById('loader').style.display = "block";
        }, 1000);
        document.getElementById('hintButton').style.visibility = 'visible';
        break;
      case 20:
        level++
        sessionStorage.setItem("level", level)
        sessionStorage.setItem("hints", 3)
        Tamplate.levelDiv();
        document.body.classList.remove('loaded');
        setTimeout (()=> {
          document.body.classList.add('loaded');
          document.getElementById('loader').style.display = "block";
        }, 1000);
        document.getElementById('hintButton').style.visibility = 'visible';
        break;
      case 30:
        level++
        sessionStorage.setItem("level", level)
        sessionStorage.setItem("hints", 2)
        Tamplate.levelDiv();
        document.body.classList.remove('loaded');
        setTimeout (()=> {
          document.body.classList.add('loaded');
          document.getElementById('loader').style.display = "block";
        }, 1000);
        document.getElementById('hintButton').style.visibility = 'visible';
        break;
      case 40:
        level++
        sessionStorage.setItem("level", level)
        sessionStorage.setItem("hints", 1)
        Tamplate.levelDiv();
        document.body.classList.remove('loaded');
        setTimeout (()=> {
          document.body.classList.add('loaded');
          document.getElementById('loader').style.display = "block";
        }, 1000);
        document.getElementById('hintButton').style.visibility = 'visible';
        break;
      case 50:
        Game.Over();
    }

  },
  logic() {
    // resetting style
    this.querySelector('.plateBorder').style.fill = 'black';
    // getting the colors
    let buttonColor = this.querySelector(".plateBackground").style.fill;
    let pickedColor = sessionStorage.getItem("pickColors");
    // checking mode
    if (sessionStorage.getItem("currentMode") == 'hex') {
      buttonColor = buttonColor.slice(4, -1);
      buttonColor = buttonColor.split(/[ ,]+/);
      buttonColor = Color.rgbToHex(buttonColor[0], buttonColor[1], buttonColor[2]);
    }
    // Comparing......
    if (buttonColor === pickedColor) {

      // changing background
      sessionStorage.setItem('bodyColor', pickedColor);
      document.body.style.background = `linear-gradient( 90deg,  ${pickedColor} 24%,  rgba(219, 224, 232, 1) 51%, ${pickedColor} 76%)`;
      // Score and high score
       Game.score();
      // set track
      let track = parseInt(sessionStorage.getItem('track'));
      track++;
      sessionStorage.setItem("track", track);
      // increase chance
      let chance = parseInt(sessionStorage.getItem('chance'));
      if (track == 3) {
        chance++;
        // play chance the audio
        gameRightColorSound.stop();
        if (localStorage.getItem("sound") == 1){
          gameChanceSound.play();
        }
       
        sessionStorage.setItem("chance", chance);
      } else {
         // play the audio
         if (localStorage.getItem("sound") == 1){
         gameRightColorSound.play();
          }
      }
      // set level
      Game.level();
      // srt animation
      document.getElementById("RGBbox").classList.add('popUp');
      setTimeout(function () {
        document.getElementById("RGBbox").classList.remove('popUp');
      }, 1000);
      timer.reset(1000);
      Game.refreshGameBoard();
      displayData();

    }
    //   If wrong ...................
    else {
      this.style.visibility = "hidden";
      let clicked;
      if (sessionStorage.getItem("invisibleButton") == 'clear') {
        clicked = []
      } else {
        clicked = JSON.parse(sessionStorage.getItem('invisibleButton'));
      }
      clicked.push({
        index: this.dataset.index
      })
      sessionStorage.setItem('invisibleButton', JSON.stringify(clicked));
      Player.lose();
      displayData();
    }
  },
  hint() {
    let hints = parseInt(sessionStorage.getItem("hints"));
    let buttonCount = parseInt(sessionStorage.getItem('hintButtonCount'));
    buttonCount++;
    sessionStorage.setItem('hintButtonCount', buttonCount);
    if (buttonCount == 1) {
      hints--;
    }
    sessionStorage.setItem('hints', hints);
    let pickColor = sessionStorage.getItem('pickColors');
    let hintColorindex = JSON.parse(sessionStorage.getItem('colors')).indexOf(pickColor);
    let plateBorder = document.querySelectorAll(".plateBorder");
    plateBorder[hintColorindex].style.fill = 'white';
    const gameButton = document.querySelectorAll('.gameButton');
    gameButton[hintColorindex].focus();
    // play the audio
    if (localStorage.getItem("sound") == 1) {
      gameHintSound.play();
    }
    displayData();
  },
  setting() {
    sessionStorage.setItem('paused', true);
    timer.pause();
    document.getElementById("GameModal").style.display = "flex";
    let DisplayName;
    if (localStorage.getItem("playerName") !== null) {
      DisplayName = localStorage.getItem("playerName");
    } else {
      DisplayName = "";
    }
    document.getElementById("box").innerHTML = Tamplate.settingTamplate(DisplayName);
    if (sessionStorage.getItem('Guest') == 'true') {
      document.getElementById("editName").parentElement.remove();
    }
    if (localStorage.getItem('sound') == '1') {
      document.getElementById('sound').checked = true;
    } else {
      document.getElementById('sound').checked = false;
    }
    const editValue = document.getElementById('editName');
    if (editValue) {
      Player.nameValidation(editValue);
    }
    document.getElementById("formSetting").addEventListener('submit', Game.saveSetting);
    document.getElementById("goBack").addEventListener('click', Game.goBack);
    document.getElementById('bookmarkBTN').addEventListener('click', Game.bookMark)
  },
  saveSetting(evt) {
    evt.preventDefault();
    const editValue = document.getElementById('editName');
    if (editValue) {
      Player.name(editValue);
    }
    const gameSound = document.getElementById("sound");
    if (gameSound.checked) {
      localStorage.setItem('sound', 1);
    } else {
      localStorage.setItem('sound', 0);
    }
    Game.goBack();
  },
  rules() {
    timer.pause();
    document.getElementById("GameModal").style.display = "flex";
    document.getElementById("box").innerHTML = Tamplate.gameRulesTamplate();
    document.getElementById('okButton').addEventListener('click', function (){
      Game.goBack();
    })
  },
  goBack() {
    sessionStorage.setItem('paused', false);
    document.getElementById("GameModal").style.display = "none";
     if (sessionStorage.getItem("startGame") == 'false') {
      gameStartScreen ();
      } else {
      displayData();
      timer.start();
      mouseLeaveOn();
      listenHelpButton (); 
      }
  },
  bookMark () {
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
             alert('Press Ctrl + Shift + B for Windows or Alt + ⌘ + B for Mac to Bookmark this game');
       } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
          alert('Press Ctrl + D to Bookmark this game');
       } else if(navigator.userAgent.indexOf("Safari") != -1) {
          alert('Press Command + D to Bookmark this game');
       } else if(navigator.userAgent.indexOf("Firefox") != -1 ){
           alert('Press Ctrl + D to Bookmark this game');
       } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
           alert('Press Ctrl + D to Bookmark this game');
       } else {
           alert('Press Ctrl + D to Bookmark this game');
       }
  },
  reset() {
    sessionStorage.setItem("score", 0);
    sessionStorage.setItem("chance", 10);
    sessionStorage.setItem("track", 0);
    sessionStorage.setItem("level", 1);
    sessionStorage.setItem("hints", 5);
    timer.start();
  },
  Over() {
     // play the audio
     if (sessionStorage.getItem("gameOver") == "false") {
      if (localStorage.getItem("sound") == 1) {
        gameOverSound.play();
      }
     }
    sessionStorage.setItem("gameOver", true);
    sessionStorage.setItem('Guest', false);
    sessionStorage.setItem("startGame", false);
    document.getElementById("GameModal").style.display = "flex";
    let score = parseInt(sessionStorage.getItem("score"));
    timer.stop();
    mouseLeaveOf(); 
    let DisplayName;   
    if (localStorage.getItem("playerName") !== null) {
      DisplayName = localStorage.getItem("playerName");
    } else {
      DisplayName = "";
    }
    document.querySelector('meta[name="fbSharedescription"]').setAttribute("content", `${DisplayName} Scored ${score}`);
    document.getElementById("box").innerHTML = Tamplate.gameOverTamplate (DisplayName, score);
    if (score == 0) {
      Tamplate.zeroScore ();
    } else if (score == 50) {
      Tamplate.completeGame ();
    }
    if (localStorage.getItem("playerName") == null) {
      document.getElementById("startGame").style.display = "none";
    } else {
      document.getElementById("namesubmit").style.display = "none";
    }
  
    listenNameSubmit ();
    listensSartGame ();
    listenGeustStart ();
    listenHelpButton ();
   

    
  }

}


// Game is not started stage
 if (sessionStorage.getItem("startGame") === null) {
  gameStartScreen ();
} // game is paused
else if (sessionStorage.getItem('paused') == 'true') {
   Game.setting();
}
// if Game is over
else if (sessionStorage.getItem('gameOver') == 'true') {
  Game.Over();
}
// during the game
else {
  displayData();
}

// Game start screen

function gameStartScreen () {
  document.getElementById("GameModal").style.display = "flex";
  localStorage.setItem("sound", 1);
  sessionStorage.setItem('timer', 0);
  let DisplayName;
  if (localStorage.getItem("playerName") === null) {
     DisplayName = "";
  } else {
     DisplayName = localStorage.getItem("playerName");
  }
  document.getElementById("box").innerHTML = Tamplate.startGameTamplate(DisplayName);
  if (localStorage.getItem("playerName") === null) {
    document.getElementById('startGame').remove();
  } else {
    document.getElementById('namesubmit').remove();
  }
  timer.stop();
  listenNameSubmit ();
  listensSartGame ();
  listenGeustStart ();
}

// listening for name submit
function listenNameSubmit () {
  const nameForm = document.getElementById("namesubmit");
  if (nameForm) {
    nameForm.addEventListener('submit', Player.savePlayerInfo);
    const inputName = document.getElementById("playerNameInput");
    Player.nameValidation(inputName);
  }
}

// listening for start game button
function listensSartGame () {
  const startButton = document.getElementById("startGame");
  if (startButton) {
    startButton.addEventListener('click', startGame);
  }
}

// listen for the Guest start game buttons

function listenGeustStart () {
  const geustButton = document.getElementById("geustStart");
  geustButton.addEventListener('click', startGame);
}


// listen for the game mode
const gameMode = document.getElementById("colorMode");
if (gameMode) {
  gameMode.addEventListener('change', Game.mode);
}
// listner for the hints
const hintsButtom = document.getElementById("hintButton");
hintsButtom.addEventListener('click', Game.hint);

// listening for the help button
function listenHelpButton () {
  const gameRulesButton = document.getElementById("gameRulesButton");
  gameRulesButton.addEventListener('click', Game.rules);
}
// listening for the game settings
const gameSetingButton = document.getElementById('gameSettingButton');
gameSetingButton.addEventListener('click', Game.setting);

// listneing for game buttons
const gameButton = document.querySelectorAll(".gameButton");
gameButton.forEach(elements => {
  elements.addEventListener('click', Game.logic);
});
// listening for mosue leave
function mouseLeaveOn() {
  document.body.addEventListener("mouseleave", mouseLeaveFunction);
}
function mouseLeaveFunction() {
     Game.setting();
}
function mouseLeaveOf() {
  document.body.removeEventListener("mouseleave", mouseLeaveFunction);
}

