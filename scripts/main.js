//Variables*************************************************************************
const box = document.querySelectorAll('.box');
const startButton = document.querySelector('.start-game');
const computersTurnText = document.querySelector('.computers-turn');
const yourTurnText = document.querySelector('.your-turn');
const gameOverText = document.querySelector('.game-over');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const boxArray = [green,yellow,red,blue];
let computerColorChoice;
let computerArray = []; 
let userArray = [];
gameOverText.style.display = 'none';
let enabled;

//Main Functions*********************************************************************

//THINGS I HAVE TO DO STILL
//2) DISABLE USER TURN DURING COMPUTER TURN
//3) PROPERLY END GAME..NOT THE HACKY WAY
//4) ADD HIGH SCORE COUNTRER
//5) STYLE BETTER
//6) ADD SOUNDS
//7) Refactor Code




function computerTurn(){
    //disable userTurn(); //user can't activate function with click
    startButton.style.display = 'none';
    gameOverText.style.display = 'none';
    computersTurnText.style.display = 'block';
    console.log(computerArray);
    setTimeout(()=> {
        enabled = true;
        if(computerArray.length === 0){
             allComputerSteps();
        } else {
            loopThroughSequence(computerArray);
        }
    }, 1500)
    enabled = false;
}


function userTurn(e){
    if (enabled === true){
        e.preventDefault();
    } else {
        e.target.classList.add('glow');
        removeGlow(e.target);
        userArray.push(e.target);
        console.log(userArray);
        compareTwoArrays(userArray, computerArray);

        if(userArray.length === computerArray.length){
            userArray = [];
            switchTurnDisplay();
            computerTurn();
        }
    }

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

//reusable function. Goes through all computer automated steps
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
            allComputerSteps();
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


function compareTwoArrays(arr1, arr2){

    for(i = 0; i < arr1.length; i++){
        if(arr1[i] === arr2[i]){
            console.log('cool');
        }else{
            console.log('Game Over');
            yourTurnText.style.display = 'none';
            gameOverText.style.display = 'block';
            startButton.style.display = 'block';
            computerArray = [];
            userArray = [];
            startButton.innerHTML = '';
            startButton.innerHTML = 'Try Again?';
            stopGame();
        }
    }
}

//first of all..this is super hacky
//second of all..it only says game over after your turn is done.
function stopGame(){
 break;
}


//Event Listeners*****************************************************************************************
box.forEach(box => box.addEventListener('click', userTurn));
startButton.addEventListener('click', computerTurn);














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
