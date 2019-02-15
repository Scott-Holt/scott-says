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
let computerColorChoice;
let computerChoiceList = [];
let userChoiceList = [];

//Functions*********************************************************************
function startGame(){
    computersTurnText.style.display = 'block';
    setTimeout(function(){
        boxGlow();
        addToComputerChoiceList();
        console.log(computerChoiceList);
        }, 1500)
    setTimeout(function(){
        switchTurnDisplay();
        return;
    },2000)
}

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
        switchTurnDisplay();
    }, 1800)
    return;
}

function userTurn(e){
    e.target.classList.add('glow');
    userChoiceList.push(e.target);
    console.log(userChoiceList);

    if(userChoiceList.length === computerChoiceList.length && JSON.stringify(userChoiceList) === JSON.stringify(computerChoiceList)){
        console.log('user is done');
        userChoiceList = [];
        console.log(userChoiceList);
        switchTurnDisplay();
        computerTurn();
    } else {
        //you could say here 
        //if(userChoiceList.length === computerChoiceList.length && JSON.stringigy(userChoiceList) !=== JSON.stringify(computerChoiceList){
        //  console.log('Game Over');
        //})
        console.log('Game Over');
    }
} 


//Helper Functions*****************************************************************************

//this function picks a radom color and 'lights' it up
function boxGlow(){
    computerColorChoice = Math.floor(Math.random() * 4);
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

function switchTurnDisplay(){
    if(computersTurnText.style.display === 'block'){
        computersTurnText.style.display = 'none';
        yourTurnText.style.display ='block';  
    } else {
        computersTurnText.style.display = 'block';
        yourTurnText.style.display ='none'; 
    }
}






//Event Listeners*****************************************************************************************
//calls removeGlow() when "box glow" animation is over
box.forEach(box => box.addEventListener('transitionend', removeGlow));
box.forEach(box => box.addEventListener('click', userTurn));
startButton.addEventListener('click', startGame);









//*********OLD CODE***************************************************************************************

//TWO PROBLEMS SO FAR
//1) USERS TURN IS NOT WAITING FOR USER TO FINISH SEQUENCE BEFORE MOVING ON. ON USERS SECOND TURN, COMPUTER WILL TAKE ITS TURN EVEN IF YOU HAVE FINISHED THE SEQUENCE
//2) COMPUTERS SECOND TURN IT DOESN'T GO THROUGH LIGHTING UP THE ARRAY FROM PLACE 0 TO i. It just lights up [i] and then moves on picking a new color. Then the next computer turn it will do the same thing.. It will light up color [i] which was the computers previous turn, but it wont light up the previous turns before that.


//MAYBE I NEED TO MAKE A SCORE COUNTER AND SOMETHING THAT LOGS SCORE. SO TECHNICALLY GAME NEVER ENDS. YOU JUST TRY TO BEAT HIGH SCORES.

// function userTurn(e){
//     e.target.classList.add('glow');
//     userChoiceList.push(e.target);
//     console.log(userChoiceList);
//     if(JSON.stringify(userChoiceList) === JSON.stringify(computerChoiceList)){
//         console.log('good job..now computers turn');
//         setTimeout(()=> {
//             userChoiceList = []; //this resets array to empty so you can create a new array.
//             console.log(userChoiceList);
//             switchTurnDisplay();
//             computerTurn()
//         }, 1500);
//     } else {
//         console.log('you lose');
//     }
//     return;
// }

//I NEED TO FIGURE OUT HOW TO MOVE ON TO THE NEXT CODE ONCE
//USER IS FINISHED CREATING ARRAY.
//MAYBEEEE ONCE THE LAST USER ARRAY IS THE SAME AS THE LAST COMPUTER ARRAY
//SO MAYBE LIKE, IF userArray.length === computerArray.length 




//first turn you need to push the e.target to userArray.
//so if (array is empty){
    //push e.target
// } else {
// dont push e.target
// }

//maybe create a loop that says if a

//maybe the array needs to be reset to empty every time user clicks on a color

//NOW I JUST NEED THE COMPUTER TO WAIT ITS TURN UNTIL IM DONE WITH MY TURN.
//













//USABLE REFACTORED CODE**********************************************************************

// game.addEventListener('click', (e)=> {
//     box.forEach(box => {
//         boxArray.push(box.className);
//     })
//     console.log(boxArray);
// })

