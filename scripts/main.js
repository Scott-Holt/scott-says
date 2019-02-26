//Variables*************************************************************************
const box = document.querySelectorAll('.box');
const startButton = document.querySelector('.start-game');
const computersTurnText = document.querySelector('.computers-turn');
const yourTurnText = document.querySelector('.your-turn');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const boxArray = [green,yellow,red,blue];
let computerColorChoice;
let computerArray = []; 
let userArray = [];

//Functions*********************************************************************

function computerTurn(){
    computersTurnText.style.display = 'block';
    setTimeout(()=> {
        if(computerArray.length === 0){
             allComputerSteps();
        } else {
            loopThroughSequence(computerArray);
            setTimeout(()=>{
                allComputerSteps();
            },800)
        }
    }, 1500)
}


function userTurn(e){
    e.target.classList.add('glow');
    removeGlow(e.target);
    userArray.push(e.target);
    compareArrays(userArray, computerArray);
}
    

//Helper Functions*****************************************************************************


//this function picks a radom color and 'lights' it up
function boxGlow(){
    computerColorChoice = Math.floor(Math.random() * 4);
    boxArray[computerColorChoice].classList.add('glow');
    removeGlow(boxArray[computerColorChoice]);
}

//this removes the glow of color
function removeGlow(box){
    setTimeout(()=> {
        box.classList.remove('glow');
    }, 300)
}

function addTocomputerArray() {
    computerArray.push(boxArray[computerColorChoice]);
}

function switchTurnDisplay(){
    if(computersTurnText.style.display === 'block'){
        computersTurnText.style.display = 'none';
        yourTurnText.style.display ='block';  
    } else {
        computersTurnText.style.display = 'block';
        yourTurnText.style.display ='none'; 
    }
}

//reusable function that gets called a lot
function allComputerSteps(){
    boxGlow();
    addTocomputerArray();
    console.log(computerArray)
    setTimeout(()=>{
        switchTurnDisplay();
    },1000)
}

function loopThroughSequence(arr) {
    function iterator(index) {
        if (index >= arr.length) {
            return;
        } else {
            arr[index].classList.add('glow');
            removeGlow(arr[index]);
            setTimeout(function () { //this calls the iterator function to run ever 1000ms.
                iterator(++index);
            }, 1000);
        }
    };
    
    iterator(0);
};

function compareArrays(arr1, arr2){
    arr1.forEach(e1 => arr2.forEach(e2 => {
        if(e1 === e2){
          console.log('good job');
          userArray = [];
          switchTurnDisplay();
          setTimeout(()=>{
              computerTurn();
          })
 
        } else {
            
        }
    }))
}


//Event Listeners*****************************************************************************************
box.forEach(box => box.addEventListener('click', userTurn));
startButton.addEventListener('click', computerTurn);

