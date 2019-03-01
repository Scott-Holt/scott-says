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

//Main Functions*********************************************************************

//STEPS TO GAME
//1) USER CLICKS START BUTTON/ Event listner fires off and runs computerTurn()

//2) computerTurn function runs. If theres nothing in the array aka computerArray.length = 0, then run computer steps..
//which is choose random color, light up, light down, and add to computer array.
// if its computers second turn aka computerArray doesnt equal 0, then run loopThroughSequence function.
//this function runs through the array and lights up / lights down each array item, then
// runs the computer steps (choosing a random color light up light down and add to computerArray)

//3) every time a box is clicked it runs the user turn function. Very simple. It lights up/lights down and adds to user Array
//if the length of the user array is the same as the computer array, then run the compureArrays function
//which 


function computerTurn(){
    computersTurnText.style.display = 'block';
    setTimeout(()=> {
        if(computerArray.length === 0){
             allComputerSteps();
        } else {
            loopThroughSequence(computerArray);
        }
    }, 1500)
}//something interesting happend here
//where the computer chose the random color before it finished its sequence
//do i need to remove the setTimeout that follows the loopThroughSequence? Why is that there?
//i think if i remove that it will choose the last color at the same time that it
//loops through its last color.
//so maybe say..if computerArray.length is 

//userArray[green,]
function userTurn(e){
    e.target.classList.add('glow');
    removeGlow(e.target);
    userArray.push(e.target);

    if(userArray.length === computerArray.length){
        console.log(userArray);
        compareArrays(userArray, computerArray);
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

function compareArrays(arr1, arr2){
    arr1.forEach(e1 => arr2.forEach(e2 => {
        if(e1 === e2){
            console.log('good');
        }
    }));//this is the end of the forEach block
    userArray = [];
    //do i need an if statement here saying only
    //run the following code if e1 === e2?
    switchTurnDisplay();
    setTimeout(()=>{
        computerTurn();
    }, 800)
}//this is the end of the function


//Event Listeners*****************************************************************************************
box.forEach(box => box.addEventListener('click', userTurn));
startButton.addEventListener('click', computerTurn);

