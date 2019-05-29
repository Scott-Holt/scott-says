//Variables*************************************************************************
let quadrant = document.querySelectorAll(".quadrant");
let startButton = document.querySelector(".start-game");
let scottSaysText = document.querySelector(".scott-says-text");
let computersTurnText = document.querySelector(".computers-turn");
let yourTurnText = document.querySelector(".your-turn");
let gameOverText = document.querySelector(".game-over");
let green = document.querySelector(".green");
let yellow = document.querySelector(".yellow");
let red = document.querySelector(".red");
let blue = document.querySelector(".blue");
let colorArray = [green, yellow, red, blue];
let computerArray = [];
let userArray = [];
let computersTurn = true; // makes computersTurn true by default
let gameOver = false; // makes gameOver false by default
let greenSound = document.querySelector(".root-note");
let yellowSound = document.querySelector(".third-note");
let redSound = document.querySelector(".fourth-note");
let blueSound = document.querySelector(".fifth-note");
let currentTurn = 0;
let highScore = 0;
let highScoreText = document.querySelector(".score-text");

//Main Functions*********************************************************************

function computerTurn() {
  gameOver = false;
  scottSaysText.style.display = "block";
  startButton.style.display = "none";
  gameOverText.style.display = "none";
  computersTurnText.style.display = "block";

  setTimeout(() => {
    loopThroughComputerArray(computerArray);
  }, 1500);
}

function userTurn(e) {
  if (!computersTurn) {
    e.target.classList.add("click-animation");
    removeClickAnimation(e.target);
    makeNoise(e.target);
    userArray.push(e.target);
    compareTwoArrays(userArray, computerArray); // if arrays are different, game over. The rest of this code doesnt execute

    //the following code lets computer know user is done with their turn
    if (!gameOver && userArray.length === computerArray.length) {
      userArray = [];
      switchTurnDisplay();
      computersTurn = true;
      computerTurn();
      updateScore();
    }
  }
}

//HELPER FUNCTIONS***************************************************************************************************************************

//if computerArray length is >= index, then computer chooses new random color and pushes it to computerArray.
//Otherwise, go through computerArray and add/remove animation/play audio
function loopThroughComputerArray(arr) {
  function iterator(index) {
    if (index >= arr.length) {
      randomColor();
      setTimeout(() => {
        switchTurnDisplay();
        computersTurn = false;
      }, 1000);
    } else {
      arr[index].classList.add("click-animation");
      removeClickAnimation(arr[index]);
      makeNoise(arr[index]);
      setTimeout(function () {
        iterator(++index);
      }, 1000);
    }
  }
  iterator(0);
}

function randomColor() {
  let computerColorChoice = Math.floor(Math.random() * 4);
  colorArray[computerColorChoice].classList.add("click-animation");
  computerArray.push(colorArray[computerColorChoice]);
  makeNoise(colorArray[computerColorChoice]);
  removeClickAnimation(colorArray[computerColorChoice]);
}

function removeClickAnimation(quadrant) {
  setTimeout(() => {
    quadrant.classList.remove("click-animation");
  }, 300);
}

function switchTurnDisplay() {
  if (computersTurnText.style.display === "block") {
    computersTurnText.style.display = "none";
    yourTurnText.style.display = "block";
  } else {
    computersTurnText.style.display = "block";
    yourTurnText.style.display = "none";
  }
}

function compareTwoArrays(arr1, arr2) {
  for (i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      stopGame();
    }
  }
}

function makeNoise(quadrant) {
  if (quadrant === green) {
    greenSound.currentTime = 0; //resets audio clip to beginning everytime a user clicks a color
    greenSound.play();
  } else if (quadrant === yellow) {
    yellowSound.currentTime = 0;
    yellowSound.play();
  } else if (quadrant === blue) {
    blueSound.currentTime = 0;
    blueSound.play();
  } else {
    redSound.currentTime = 0;
    redSound.play();
  }
}

function updateScore() {
  ++currentTurn;
  if (currentTurn > highScore) {
    highScore = currentTurn;
    highScoreText.innerHTML = highScore;
  }
}

function stopGame() {
  computersTurn = true; //makes it so user can't click any more colors
  gameOver = true;
  scottSaysText.style.display = "none";
  yourTurnText.style.display = "none";
  gameOverText.style.display = "block";
  startButton.style.display = "block";
  startButton.innerHTML = "Try Again?";
  computerArray = [];
  currentTurn = 0;
  userArray = [];
}

//Event Listeners*****************************************************************************************
quadrant.forEach(quadrant => quadrant.addEventListener("click", userTurn));
startButton.addEventListener("click", computerTurn);
