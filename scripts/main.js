//Variables*************************************************************************
let box = document.querySelectorAll(".box");
let title = document.querySelector(".title");
let startButton = document.querySelector(".start-game");
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
let computersTurn = true;
let gameOver = false;
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
  title.style.display = "block";
  startButton.style.display = "none";
  gameOverText.style.display = "none";
  computersTurnText.style.display = "block";

  setTimeout(() => {
    loopThroughSequence(computerArray);
  }, 1500);
}

function userTurn(e) {
  if (!computersTurn) {
    e.target.classList.add("glow");
    removeGlow(e.target);
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

//Helper Functions*****************************************************************************

function loopThroughSequence(arr) {
  function iterator(index) {
    if (index >= arr.length) {
      randomColor();
      setTimeout(() => {
        switchTurnDisplay();
        computersTurn = false;
      }, 1000);
    } else {
      arr[index].classList.add("glow");
      removeGlow(arr[index]);
      makeNoise(arr[index]);
      setTimeout(function() {
        iterator(++index);
      }, 1000);
    }
  }
  iterator(0);
}

function randomColor() {
  let computerColorChoice = Math.floor(Math.random() * 4);
  colorArray[computerColorChoice].classList.add("glow");
  computerArray.push(colorArray[computerColorChoice]);
  makeNoise(colorArray[computerColorChoice]);
  removeGlow(colorArray[computerColorChoice]);
}

function removeGlow(box) {
  setTimeout(() => {
    box.classList.remove("glow");
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

function makeNoise(box) {
  if (box === green) {
    greenSound.currentTime = 0; //resets audio clip to beginning everytime a user clicks a color
    greenSound.play();
  } else if (box === yellow) {
    yellowSound.currentTime = 0;
    yellowSound.play();
  } else if (box === blue) {
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
  title.style.display = "none";
  yourTurnText.style.display = "none";
  gameOverText.style.display = "block";
  startButton.style.display = "block";
  startButton.innerHTML = "Try Again?";
  computerArray = [];
  currentTurn = 0;
  userArray = [];
}

//Event Listeners*****************************************************************************************
box.forEach(box => box.addEventListener("click", userTurn));
startButton.addEventListener("click", computerTurn);
