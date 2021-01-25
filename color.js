// Color object
export  const Color = {

    // Generate RGB random color
    generateRGBrandom() {
      let colors = [];
      for (let i = 0; i < 6; i++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let randomColor = "rgb" + "(" + r + ", " + g + ", " + b + ")";
        colors.push(randomColor);
      }
      return colors;
    },
    // Generate HEX random color
    generateHEXrandom() {
      let colors = [];
      let possible = "abcdef0123456789";
      for (let i = 0; i < 6; i++) {
        let h1 = possible.charAt(Math.floor(Math.random() * possible.length));
        let h2 = possible.charAt(Math.floor(Math.random() * possible.length));
        let h3 = possible.charAt(Math.floor(Math.random() * possible.length));
        let h4 = possible.charAt(Math.floor(Math.random() * possible.length));
        let h5 = possible.charAt(Math.floor(Math.random() * possible.length));
        let h6 = possible.charAt(Math.floor(Math.random() * possible.length));
        let randomColor = "#" + h1 + h2 + h3 + h4 + h5 + h6;
        colors.push(randomColor);
      }
      return colors;
    },
    // funtion for display RGB value
    DisplayRGBvalue(pickedColor) {
      let DisplayColor = pickedColor.slice(4, -1);
      DisplayColor = DisplayColor.split(/[ ,]+/);
      const DisplayRGBvalue = document.getElementById("RGBvalue");
      DisplayRGBvalue.innerHTML = `( <span>${DisplayColor[0]}</span> , <span>${DisplayColor[1]}</span> , <span>${DisplayColor[2]}</span> )`;
    },
    // Function for display hex value
    DisplayHexavalue(pickedColor) {
      let DisplayRGBvalue = document.getElementById("RGBvalue");
      DisplayRGBvalue.innerHTML = `#<span>${pickedColor[1]}${pickedColor[2]}</span><span>${pickedColor[3]}${pickedColor[4]}</span><span>${pickedColor[5]}${pickedColor[6]}</span>`;
    },
    // Pick a number
    pickRandom() {
      let randomNumber = Math.floor(Math.random() * 6);
      return randomNumber;
    },
    rgbToHex(r, g, b) {
      r = parseInt(r);
      g = parseInt(g);
      b = parseInt(b);
      hex = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
  }
  