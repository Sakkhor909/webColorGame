import {Color} from './color.js'
import {Tamplate} from './tamplate.js'

// Function for displaying data
export function displayData() {

    // changing body background
    let bodyColor =  sessionStorage.getItem('bodyColor');
    document.body.style.background = `linear-gradient( 90deg,  ${bodyColor} 24%,  rgba(219, 224, 232, 1) 51%, ${bodyColor} 76%)`;
 
   // Displaying player name
   if (sessionStorage.getItem("Guest") == 'true') {
     document.getElementById("playerName").innerHTML =   Tamplate.guestMode ();
     document.getElementById("playerHighScore").style.display = "none";
   } else if (localStorage.getItem("playerName") !== null) {
     document.getElementById("playerName").textContent = localStorage.getItem("playerName");
   }
 
   // Displaying High score
 
   if (sessionStorage.getItem("Guest") == 'false') {
     document.getElementById("playerHighScore").style.display = "block";
     let HighScore = localStorage.getItem("highScore");
     if (HighScore) {
      if (HighScore.length == 1) {
        document.getElementById("highScore").innerHTML = `<span>0</span><span>${HighScore}</span>`;
      } else {
        document.getElementById("highScore").innerHTML = `<span>${HighScore.charAt(0)}</span><span>${HighScore.charAt(1)}</span>`;
      }
     }
   }
 
 
   // Displaying score
 
   if (sessionStorage.getItem("score") !== null) {
     let  score = sessionStorage.getItem("score");
     if (score.length == 1) {
       document.getElementById("score").innerHTML = `<span>0</span><span>${score}</span>`;
     } else {
       document.getElementById("score").innerHTML = `<span>${score.charAt(0)}</span><span>${score.charAt(1)}</span>`;
     }
   }
 
   // Displaying level
   document.getElementById("level").textContent = sessionStorage.getItem("level");
 
   // Displaying hints
   if (sessionStorage.getItem("hints") == 0) {
     document.getElementById('hintButton').style.visibility = 'hidden';
   } else {
     document.getElementById('hintButton').style.visibility = 'visible';
     document.getElementById('hinstCount').textContent = sessionStorage.getItem("hints");
   }
 
   // Displaying chance
   let  chance = sessionStorage.getItem("chance");
   if (chance.length == 1) {
     document.getElementById("chance").innerHTML = `<span>0</span><span>${chance}</span>`;
   } else {
     document.getElementById("chance").innerHTML = `<span>${chance.charAt(0)}</span><span>${chance.charAt(1)}</span>`;
   }
   // Displaying chance Box
    let track = parseInt(sessionStorage.getItem("track"));
    let DisplaychanceBox = document.querySelectorAll(".chance");
   for (let i = 0; i < track; i++) {
     switch (track) {
       case 1:
         DisplaychanceBox[i].style.backgroundColor = "green";
         break;
       case 2:
         DisplaychanceBox[i].style.backgroundColor = "green";
         break;
       case 3:
         DisplaychanceBox[i].style.backgroundColor = "green";
         document.getElementById("chanceBox").classList.add('popUp');
         setTimeout(function () {
           document.getElementById("chanceBox").classList.remove('popUp');
           document.querySelectorAll(".chance")[0].style.backgroundColor = "transparent";
           document.querySelectorAll(".chance")[1].style.backgroundColor = "transparent";
           document.querySelectorAll(".chance")[2].style.backgroundColor = "transparent";
         }, 1000)
         sessionStorage.setItem("track", 0);
         break;
       default:
         DisplaychanceBox[i].style.backgroundColor = "transparent";
     }
   }
   if (track == 0) {
     for (let j = 0; j < DisplaychanceBox.length; j++) {
       DisplaychanceBox[j].style.backgroundColor = "transparent ";
     }
   }
   // give random color
   let colorPlate = document.querySelectorAll(".plateBackground");
   let colors = JSON.parse(sessionStorage.getItem("colors"));
   if (colors) {
     for (let i = 0; i < colorPlate.length; i++) {
       colorPlate[i].style.fill = colors[i];
     }
   }
   // Rgb value board
   let colorNameText = document.getElementById("colorName");
   let pickedColor = sessionStorage.getItem("pickColors");
   if (sessionStorage.getItem("currentMode") == 'rgb') {
     colorNameText.innerHTML = ` <span>R</span><span>G</span><span>B</span>`;
     Color.DisplayRGBvalue(pickedColor);
   } else {
     colorNameText.innerHTML = ` <span>H</span><span>E</span><span>X</span>`;
     Color.DisplayHexavalue(pickedColor);
   }
   // visible the button
   if (sessionStorage.getItem('invisibleButton') != 'clear') {
    let gameButton = document.querySelectorAll(".gameButton");
     let invisiblebuttons = JSON.parse(sessionStorage.getItem('invisibleButton'));
     invisiblebuttons.forEach(function (button) {
       gameButton[button.index].style.visibility = "hidden";
     });
   }
 
 }
 
 