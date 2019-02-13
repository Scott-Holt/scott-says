//Variables*************************************************************************
const game = document.querySelector('.game');
const box = document.querySelectorAll('.box');
const startButton = document.querySelector('.start-game');
const computersTurnText = document.querySelector('.computers-turn');
const yourTurnText = document.querySelector('.your-turn');

//variables of colored boxes and boxArray
const box1 = document.querySelector('.box-1');
const box2 = document.querySelector('.box-2');
const box3 = document.querySelector('.box-3');
const box4 = document.querySelector('.box-4');
const boxArray = [box1,box2,box3,box4];
let computerColorChoice = Math.floor(Math.random() * 4);
const computerChoiceList = [];

//Functions*********************************************************************
function startGame(){
    computersTurnText.style.display = 'block';
    setTimeout(function(){
        boxGlow();//*****THIS IS THE FIRST TIME BOXGLOW IS EVER CALLED AND IT STORES THE NUMBER IT CREATES INTO THE VARIABLE CALLED COMPUTERCOLORCHOICE */
        addToComputerChoiceList();
        console.log(computerChoiceList);
        }, 1500)
    setTimeout(function(){
        computersTurnText.style.display = 'none';
        yourTurnText.style.display = 'block';    
    },2000)
}

//[green, blue, gree, red, blue]
function computerTurn(){
    setTimeout(()=> {
        for(i = 0; i < computerChoiceList.length; i++){
            computerChoiceList[i].classList.add('glow');
        }
    }, 1500)

    setTimeout(() => {
        boxGlow();
        addToComputerChoiceList();
        console.log(computerChoiceList);
    }, 1800)
}

function userTurn(e){
    //DO I NEED TO CREATE A USER ARRAY SO I CAN COMPARE THE TWO ARRAYS?
    e.target.classList.add('glow');
    if (e.target === computerChoiceList[0]){
        console.log('good job..now computers turn');
        setTimeout(()=> {
            yourTurnText.style.display = 'none';
            computersTurnText.style.display = 'block';
            computerTurn()
        }, 1500);
    } else {
        console.log('you lose');
    }
}





//Helper Functions*****************************************************************************

function createRandomNumber(){ 
    return computerColorChoice;
}

//this function picks a radom color and 'lights' it up
function boxGlow(){
    boxArray[computerColorChoice].classList.add('glow');
}
//maybe this needs to be renamed or if not then put anything that doesn't have to do with remove glowclasslist into a different function
function removeGlow() {
    boxArray[computerColorChoice].classList.remove('glow');
}

//pushes the computers color choice to the computer array list
function addToComputerChoiceList(){
    computerChoiceList.push(boxArray[computerColorChoice]);
}






//Event Listeners*****************************************************************************************
//calls removeGlow() when "box glow" animation is over
box.forEach(box => box.addEventListener('transitionend', removeGlow));
box.forEach(box => box.addEventListener('click', userTurn));
startButton.addEventListener('click', startGame);














//THE PROBLEM IS BOXGLOW() FUNCTION DOESN'T CREATE A NEW NUMBER EVERYTIME. IT CREATES ONE NUMBER FIRST TIME ITS EVER CALLED AND STORES THAT NUMBER IN THE VARIABLE COMPUTERCOLORCHOICE.
//MAYBE I NEED TO MAKE A SCORE COUNTER AND SOMETHING THAT LOGS SCORE. SO TECHNICALLY GAME NEVER ENDS. YOU JUST TRY TO BEAT HIGH SCORES.















//USABLE REFACTORED CODE**********************************************************************

// game.addEventListener('click', (e)=> {
//     box.forEach(box => {
//         boxArray.push(box.className);
//     })
//     console.log(boxArray);
// })

