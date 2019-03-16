//Variables*************************************************************************
const box = document.querySelectorAll(".box");
const startButton = document.querySelector(".start-game");
const computersTurnText = document.querySelector(".computers-turn");
const yourTurnText = document.querySelector(".your-turn");
const gameOverText = document.querySelector(".game-over");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const boxArray = [green, yellow, red, blue];
let computerColorChoice;
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
    console.log(userArray);
    compareTwoArrays(userArray, computerArray);
    //this lets computer know user is done with their turn
    if (!gameOver) {
      if (userArray.length === computerArray.length) {
        userArray = [];
        switchTurnDisplay();
        computersTurn = true;
        computerTurn();
        updateScore();
      }
    }
  }
}

//Helper Functions*****************************************************************************

//this function picks a radom color and 'lights' it up
function boxGlow() {
  computerColorChoice = Math.floor(Math.random() * 4);
  boxArray[computerColorChoice].classList.add("glow");
  makeNoise(boxArray[computerColorChoice]);
  removeGlow(boxArray[computerColorChoice]);
}

//this removes the glow of color
function removeGlow(box) {
  setTimeout(() => {
    box.classList.remove("glow");
  }, 300);
}

function addTocomputerArray() {
  computerArray.push(boxArray[computerColorChoice]);
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

//reusable function. Goes through all computer automated steps
function allComputerSteps() {
  boxGlow();
  addTocomputerArray();
  // console.log(computerArray);
  setTimeout(() => {
    switchTurnDisplay();
    computersTurn = false;
  }, 1000);
}

function loopThroughSequence(arr) {
  function iterator(index) {
    if (index >= arr.length) {
      allComputerSteps();
    } else {
      arr[index].classList.add("glow");
      removeGlow(arr[index]);
      makeNoise(arr[index]);
      setTimeout(function() {
        //this calls the iterator function to run ever 1000ms.
        iterator(++index);
      }, 1000);
    }
  }

  iterator(0);
}

function compareTwoArrays(arr1, arr2) {
  for (i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      stopGame();
    } //else continue with steps in userTurn();
  }
}

function makeNoise(box) {
  if (box === green) {
    greenSound.currentTime = 0;
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
  } else {
    console.log("current turn is not higher than high score");
  }
}

function stopGame() {
  computersTurn = true;
  gameOver = true;
  yourTurnText.style.display = "none";
  gameOverText.style.display = "block";
  startButton.style.display = "block";
  startButton.innerHTML = "";
  startButton.innerHTML = "Try Again?";
  computerArray = [];
  currentTurn = 0;
  console.log(computerArray);
  userArray = [];
  console.log(userArray);
}

//Event Listeners*****************************************************************************************
box.forEach(box => box.addEventListener("click", userTurn));
startButton.addEventListener("click", computerTurn);

//THINGS I HAVE TO DO STILL
//4)BACKEND SCORE COUNTER
//5) STYLE BETTER
//7) Refactor Code

// function compareArrays(arr1, arr2){
//     arr1.forEach(e1 => arr2.forEach(e2 => {
//         if(e1 === e2){
//             console.log('good');
//         } else {
//             console.log('bad');
//         }
//     }));//this is the end of the forEach block
//     userArray = [];
//     switchTurnDisplay();
//     setTimeout(()=>{
//         computerTurn();
//     }, 800)
// }//this is the end of the function

//i need some kind of code here
//that says break code if
//at any point the user is wrong

//initial thought to solve this problem is take the
//if userArry.length code statement away.
// if(userArray.length === computerArray.length){
// console.log(userArray);
// compareArrays(userArray, computerArray);
// compareTwoArrays(userArray, computerArray);
// }
