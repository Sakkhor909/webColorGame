// Game tamplate

export const Tamplate = {
     startGameTamplate(DisplayName) {
        return `
        <div id="brandSection">
        <img src="Images/Logo.png" alt="image coudn't loaded" width="50px" height="50px">
        <span>
            <h1 class="RGBtext"> Web Color Game</h1>
            <h4>Play & Learn.......</h4>
        </span>
        </div>
      
        <div id="startPlaySection">
        <form id="colorModeForm">
        <label for="colorMode">Color Mode : </label>
        <select id="colorMode">
            <option value="rgb">RGB</option>
            <option value="hex"># Hex</option>
        </select>
        </form>
        <form id="namesubmit">
        <input type="text" id="playerNameInput" placeholder="Enter your name" title="Enter a valid and short name"
          required minlength="3" maxlength="25" pattern="[a-zA-Z ]+" autocomplete="off">
         <button type="submit" class="buttonStyle" >Start Game</button>
       </form>
        <button class="buttonStyle" id="startGame">Play as  ${DisplayName} </button>
         <p>Or</p>
         <button type="button" class="buttonStyle" id="geustStart">Play as Geust <svg width="25" height="25" viewBox="0 0 448 512">
         <path fill="#000000" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"></path>
          </svg>
          </button>
      
         </div>
        `
      },
    
    gameOverTamplate (DisplayName, score) {
        return `
        <div id="brandSection">
        <img src="Images/Logo.png" alt="image coudn't loaded" width="50px" height="50px">
        <span>
            <h1 class="RGBtext"> Web Color Game</h1>
            <h4>Play & Learn.......</h4>
        </span>
        </div>
      
        <div id="textSection">
        <h2 id='grettingText'> Congratulations ${DisplayName} ! </h2>
        <h3 id='gameOverScoreText'> You have score ${score}</h3>
        <h3 id='shareText'> Share the score & Challenge your Friends <div class="fb-share-button" data-href="https://sakkhor909.github.io/webColorGame/" data-layout="button" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fsakkhor909.github.io%2FwebColorGame%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div> </h3>
        </div>
        <div id='playAgainSection'>
      
        <form id="colorModeForm">
        <label for="colorMode">Color Mode : </label>
        <select id="colorMode">
            <option value="rgb">RGB</option>
            <option value="hex"># Hex</option>
        </select>
        </form>
         <form id="namesubmit">
          <input type="text" id="playerNameInput" placeholder="Enter your name" title="Enter a valid and short name"
          required minlength="3" maxlength="25" pattern="[a-zA-Z ]+" autocomplete="off">
          <button type="submit" class="buttonStyle">Start Game</button>
         </form>
         <button class="buttonStyle" id="startGame">Play again as  ${DisplayName} </button>
         <button type="button" class="buttonStyle" id="geustStart">Play as Geust <svg width="25" height="25" viewBox="0 0 448 512">
         <path fill="#000000" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"></path>
          </svg></button>
      
        </div>
       
        `
      },
      levelDiv () {
        const div = document.createElement("div");
        div.setAttribute("id", "showlevel");
        div.setAttribute("class", "RGBtext");
        let level = parseInt(sessionStorage.getItem("level"));
        switch (level) {
          case 2:
            div.textContent = "Level 2";
            break;
          case 3:
            div.textContent = "Level 3";
            break;
          case 4:
            div.textContent = "Level 4";
            break;
        }
        document.getElementById('loader-wrapper').appendChild(div);
        document.getElementById('loader').style.display = "none";
      },
     settingTamplate(DisplayName) {
        return `
        <h3> Game paued </h3>

        <div>
        <button class='buttonStyle' id='bookmarkBTN'><svg width="16" height="16" viewBox="0 0 384 512"><path fill="#000000" d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path></svg> Bookmark this Game</button>
        <div class="fb-login-button" data-width="30px" data-size="medium" data-button-type="login_with" data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true"></div>
        <fb: login-button
         scope="public_profile,email"
            onlogin="checkLoginState();">
            </fb: login - button >  
        <form id='formSetting'>
        <div>
        <label for='editName'> Edit your name  </label> 
        <input autocomplete="off" id='editName' type='text' value='${DisplayName}' />
        </div>
        <div>
        <label for='sound'> Sound </label> 
        <input type='checkbox' id='sound' />
        </div>
      
        <button type='submit' class='buttonStyle' id='saveSetting'> Save </button>
        <button type='button' class='buttonStyle' id='goBack'> go back </button>
       `
      },  
    gameRulesTamplate() {
        return `
        <ul id='gameRules'>
        <li>You have 6 color plate. 
        <div> <img src='Images/colorPlate.jpg' width='200px' /> </div> </li>
        <li>A RGB value has shown to you.
        <div> <img src='Images/rgbBoard.jpg' width='200px'  /> </div>
        You have to choose which on is the right color</li>
        <li>If you choose the right color, you will get a score. 
        <div> <img src='Images/scoreBoard.jpg' width='200px' /> </div>
        however, if you choose the wrong color, your chances reduce
        <div> <img src='Images/chanceBoard.jpg' width='200px' /> </div>
        </li>
        <li> If you stack in a similiar color, use hints button, in every level you will get limited hints
        <div> <img src='Images/hintButton.jpg' width='120px' height='120px'/> </div>
        If you choose right color 3 times in a row, Your chances will increase
        <div> <img src='Images/chance increase box.jpg' width='200px' /> </div>
        </li>
        <li>If all chances are gone then, game over.<br> Test your knowledge and score 50 to complete 5 levels</li>
        <li> Don't cheat, remember this game is for test your knowledge. So be honest about yourself </li>
        </ul>
        <h4 id="directionBoard" >If you don't know about web colors. Learn here free
        <ul> <li><a target='_blank' href='https://developer.mozilla.org/en-US/docs/Web/HTML/Applying_color#how_to_describe_a_color'>Devleloper Mozila Network</a> </li> 
        <li><a target='_blank' href='https://www.w3schools.com/html/html_colors.asp'>W3 schools</a> </li> 
        </ul>
        </h4>
         <button class='buttonStyle' id='okButton'>Ok</button>
        
        `
      },
      zeroScore () {
        document.getElementById('grettingText').remove();
         document.getElementById('shareText').remove();
        document.getElementById('gameOverScoreText').innerHTML =  `
        You didnot get a score. Learn about web colors more.
        <button id="gameRulesButton" title="How to play the game ?"  class="headingButtons">
         <i class="fas fa-question-circle"></i>
         </button>        
        `
      },
      completeGame () {
        document.getElementById('gameOverScoreText').innerHTML =  `
        You have completed The game. You really know about web colors!        
        `
      },
       guestMode () {
        return `<svg width="20" height="20" viewBox="0 0 448 512">
        <path fill="#ffffff" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"></path>
         </svg> Guest Mode`
      }

}

 