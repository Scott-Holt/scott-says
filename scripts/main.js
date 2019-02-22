//Variables*************************************************************************
// const game = document.querySelector('.game');
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
let computerArray = []; // [blue, yellow, green]
let userArray = [];


//Functions*********************************************************************

function computerTurn(){
    computersTurnText.style.display = 'block';
    setTimeout(()=> {
        if(computerArray.length === 0){
             allComputerSteps();
        } else {
            loop(computerArray);
            setTimeout(()=>{
                allComputerSteps();
            },800)
        }
    }, 1500)
}




function userTurn(e){
    e.target.classList.add('glow');
    setTimeout(() =>{
        e.target.classList.remove('glow');
    },300)
    userArray.push(e.target);
    console.log(userArray);

    //the following steps are to see how user is doing in game.Winning?Losing?
    if(userArray.length === computerArray.length){
        userArray = [];
        switchTurnDisplay();
        computerTurn();
    } else {
        setTimeout(function(){
        console.log('Game Over');
        },3000);
    }
} 


//Helper Functions*****************************************************************************

//this function picks a radom color and 'lights' it up
function boxGlow(){
    computerColorChoice = Math.floor(Math.random() * 4);
    boxArray[computerColorChoice].classList.add('glow');
    removeGlow();
}

function removeGlow(){
    setTimeout(()=> {
        boxArray[computerColorChoice].classList.remove('glow');
    }, 300)
}

//pushes the computers color choice to the computer array list
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

function allComputerSteps(){
    boxGlow();
    addTocomputerArray();
    // console.log(computerArray);
    switchTurnDisplay();
}

function loop(arr) {
    function iterator(index) {
        if (index >= arr.length) {
            console.log('loop done');
        } else {
            console.log(arr[index]);
            arr[index].classList.add('glow');
            // removeGlow(arr[index]); fUCK WITH THIS
            setTimeout(()=>{
                arr[index].classList.remove('glow');
            }, 300)
            setTimeout(function () {
                iterator(++index);
            }, 1000);
        }
    };
    
    iterator(0);
};
//THIS FOR SOME REASON IS CHOOSING 
//THE SECOND TURNS BOX AT THE SAME TIME
//AS IT IS LIGHTING UP INDEX 0;
//THERE IS NO WAIT TIME BETWEEN THE
//PROGRAM LIGHTING UP INDEX 0 AND CHOOSING A NEW BOX.






//Event Listeners*****************************************************************************************
box.forEach(box => box.addEventListener('click', userTurn));
startButton.addEventListener('click', computerTurn);

































































//*********OLD CODE***************************************************************************************

//TWO PROBLEMS SO FAR
//1) USERS TURN IS NOT WAITING FOR USER TO FINISH SEQUENCE BEFORE MOVING ON. ON USERS SECOND TURN, COMPUTER WILL TAKE ITS TURN EVEN IF YOU HAVE FINISHED THE SEQUENCE
//2) COMPUTERS SECOND TURN IT DOESN'T GO THROUGH LIGHTING UP THE ARRAY FROM PLACE 0 TO i. It just lights up [i] and then moves on picking a new color. Then the next computer turn it will do the same thing.. It will light up color [i] which was the computers previous turn, but it wont light up the previous turns before that.


//MAYBE I NEED TO MAKE A SCORE COUNTER AND SOMETHING THAT LOGS SCORE. SO TECHNICALLY GAME NEVER ENDS. YOU JUST TRY TO BEAT HIGH SCORES.

// function userTurn(e){
//     e.target.classList.add('glow');
//     userArray.push(e.target);
//     console.log(userArray);
//     if(JSON.stringify(userArray) === JSON.stringify(computerArray)){
//         console.log('good job..now computers turn');
//         setTimeout(()=> {
//             userArray = []; //this resets array to empty so you can create a new array.
//             console.log(userArray);
//             switchTurnDisplay();
//             computerTurn()
//         }, 1500);
//     } else {
//         console.log('you lose');
//     }
//     
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



// function removeGlow(e) {
//     boxArray[computerColorChoice].classList.remove('glow');
// }









//USABLE REFACTORED CODE**********************************************************************

// game.addEventListener('click', (e)=> {
//     box.forEach(box => {
//         boxArray.push(box.className);
//     })
//     console.log(boxArray);
// })


// setTimeout(()=> {
//     // if(computerArray.length === 1){
//     // for(i = 1; i < computerArray.length; i++){
//     //     computerArray[i].classList.add('glow');
//     // } else {
//         computerArray.forEach(indexPlace => {
//             indexPlace.classList.add('glow');
//         // })

//     }
//         //fist time this function runs, it just needs to target arrayplace 0, light it up and then
//         //move on. 
//         //The second time this runs(which is actually computer turn 3), it needs to target
//         //arrayplace 0, light it up, and then array place 1, light it up, and then move on...
//         //The third time this runds (which is actually computer turn 4), it needs to target
//         //arryplace 0, light it up, and then array place 1, light it up, and then array place 2,
//         //light it up and then move on..and So on and so on and so on. 
    
//     }
// }, 2500)

//*********************************** */

// computersTurnText.style.display = 'block';
// setTimeout(function(){
//     if(computerArray.length === 0){
//     boxGlow();
//     addTocomputerArray();
//     console.log(computerArray);
//     } else {
//         computerArray.forEach(indexPlace => {
//             console.log(indexPlace);
//             indexPlace.classList.add('glow');
//                 setTimeout(function(){
//                     boxGlow();
//                     addTocomputerArray();
//                     console.log(computerArray);
//                 }, 500);
//         });
//     }
// }, 2500)
// setTimeout(function(){
//     switchTurnDisplay();
// },2500)

//fictional 2nd turn array [box 2(already here from computerstart), box3 ]
// function computerTurn(){

//     setTimeout(() => {
//         boxGlow();
//         addTocomputerArray();
//         console.log(computerArray);
//         switchTurnDisplay();
//     }, 2900)
// }

//calls removeGlow() when "box glow" animation is over
// box.forEach(box => box.addEventListener('transitionend', removeGlow));

        //  //loop through commputer Array, light up 0, wait, light up 1 wait..etc
        //     for(i=0; i<computerArray.length;i++){
        //         setTimeout(() => {
        //             console.log(i);
        //         },1000)

        // computerArray.forEach(function (item, index) {
        //     setTimeout(function () {
        //         item.classList.add('glow');
        //         setTimeout(()=>{
        //             item.classList.remove('glow');
        //         },1000)
        //     }, index * 1000);
        // });
        //this is where i need to put the code
        // that calls the allComputerSteps();
        //but i need to make sure this only runs AFTER
        //the for Each is done, because apparently
        //the forEach doesn't block following code
        //from running. So we need to add some sort of blocker
        //aka a promise would do the trick.