

//create array to hold 9 squares and initialize to nulls
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let player1;
let player2;
let round = 0;
let currentPlayer = "";
let gameOver = false;

console.log(gameBoard);

//initialize variables:
function initializeVariables () {
    gameBoard = [0,1,2,3,4,5,6,7,8];
    player1 = "X";
    player2 = "O";
    round = 0;
    currentPlayer = "X";
    gameOver = false;
};

initializeVariables ();
showState();


//create player object - don't need this yet

//pick a square - player 1
//get the player selections
const selection = getUserSelection ("Player pick a square 1-9");
console.log(selection);


//console.log(currentPlayer);
markSquare(selection, currentPlayer);
currentPlayer = changePlayer(currentPlayer);

showState();



function getUserSelection(message) {
    const input = prompt(message);
    return input;
};


//check to see if square is valid (is null, not an X or O)
//mark the array if it's a valid selection
function markSquare (selection, player) {

    //check if game over
    if (gameOver || round >8) {
        return;
    };
    //check array board to see if mark already exists
    if (gameBoard[selection] === "X" || gameBoard[selection] === "O") {
        return;
    };

    //now we can put mark in square
    gameBoard[selection] = player;
    //increase round
    round++;
};


function changePlayer (current) {
    current = current === "X" ? "O" : "X";
    return current;
    //here we wil lneed to do stuff to the DOM in the UI version
};


function showState () {
    console.log(gameBoard);
    console.log(player1);
    console.log(player2);
    console.log(round);
    console.log(currentPlayer);
    console.log(gameOver);
};