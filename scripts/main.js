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
const computerColorChoice = Math.floor(Math.random() * 4 );
const computerChoiceList = [];


// ***********Chooses random color and adds classList 'glow' then removes it when transition animation is over*******
// *******************************************************************************************************************
// *******************************************************************************************************************

//mabe call this start game function cuz it only runs at beggingin??
function startGame(){
    boxGlow();
    computerChoiceList.push(boxArray[computerColorChoice]);
    computersTurnText.style.display = 'block';
    console.log(computerChoiceList);
}

//maybe call THIS ONE start game function
function computerTurn(){
    //light up array[0], then choose new random color.
    // WAIT A COUPLE SECONDS THEN RUN THE FOLLOWING CODE
    
   setTimeout(function(){
       console.log('shit');
   }, 5000);

    // computerChoiceList[0].classList.add('glow');
    // boxGlow();
    // computerChoiceList.push(boxArray[computerChoiceList]);
    // console.log(computerChoiceList);

}

function userTurn(e){
    boxGlow();
    if (e.target === computerChoiceList[0]){
        console.log('good job..now computers turn');
        computerTurn();
    } else {
        console.log('you lose');
    }
}

//maybe this needs to be renamed or if not then put anything that doesn't have to do with remove glowclasslist into a different function
function removeGlowClassList() {
    boxArray[computerColorChoice].classList.remove('glow');
    computersTurnText.style.display = 'none';
    yourTurnText.style.display = 'block';

    //and then choose next color and so on..
}

//this function picks a radom color and 'lights' it up
function boxGlow(){
    boxArray[computerColorChoice].classList.add('glow');
}


box.forEach(box => box.addEventListener('transitionend', removeGlowClassList ));
box.forEach(box => box.addEventListener('click', userTurn));

// *******************************************************************************************************************
// *******************************************************************************************************************
// *******************************************************************************************************************


startButton.addEventListener('click', startGame);





//MAYBE I NEED TO MAKE A SCORE COUNTER AND SOMETHING THAT LOGS SCORE. SO TECHNICALLY GAME NEVER ENDS. YOU JUST TRY TO BEAT HIGH SCORES.

















//USABLE REFACTORED CODE**********************************************************************

// game.addEventListener('click', (e)=> {
//     box.forEach(box => {
//         boxArray.push(box.className);
//     })
//     console.log(boxArray);
// })