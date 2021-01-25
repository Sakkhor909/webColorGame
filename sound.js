// Game sound object

export class Sound {
    constructor(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function () {
        this.sound.play();
      };
      this.stop = function () {
        this.sound.pause();
      };
    }
  }

 export let gameRightColorSound = new Sound("music/right.mp3");
 export let gameWrongColorSound = new Sound("music/wrong.mp3");
 export let gameChanceSound = new Sound("music/chance.mp3");
 export let gameHintSound = new Sound("music/hint.mp3");
 export let gameOverSound = new Sound("music/over.mp3");