
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

//create array to hold 9 squares and initialize to nulls
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let player1;
let player2;
let round = 0;
let currentPlayer = "";
let gameOver = false;
let gameWinner = "";

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
//showState();

if (checkWinner("X")) {
    console.log("Winner");

} else {
    console.log("No winner");
};



//create player object - don't need this yet

//pick a square - player 1
//get the player selections
// const selection = getUserSelection ("Player pick a square 0-8");
// console.log(selection);


//console.log(currentPlayer);
//markSquare(selection, currentPlayer);
//currentPlayer = changePlayer(currentPlayer);

//showState();


function GameController (
    playerOne = "Player One (X)",
    playerTwo = "Player Two (O)"
) {

    if (gameOver === true) {
        return;
    };

    while (gameOver === false) {
        console.log("Next turn: " + currentPlayer);
        
        if (checkWinner("X") || checkWinner("O")) {
            gameOver = true;
            console.log("Winner is: Player " + gameWinner);
            return;
        };

        const selection = getUserSelection ("Player pick a square 0-8");
        console.log(currentPlayer + " selected square: " + selection);

        //turn 1
        markSquare(selection, currentPlayer);
        currentPlayer = changePlayer(currentPlayer);
        showState();

    };
    console.log("Winner is: Player " + gameWinner);

};

function getUserSelection(message) {
    const input = prompt(message);
    return input;
};


//check to see if square is valid (is null, not an X or O)
//mark the array if it's a valid selection
function markSquare (selection, player) {

    //check if game over
    if (gameOver || round > 8) {
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


function endConditions () {

    if (checkWinner(currentPlayer)) {
        //change screen to reflect whatever needed
        console.log(currentPlayer + " has won the game");
        return true;
    } else if (round === 9) {
        //change screen to reflect whatever needed
        console.log("It's a tie!");
        gameOver = true;
        return true;
    };
    return false;
};

function checkWinner (player) {
    let result = false;
    winningConditions.forEach(condition => {
        if (gameBoard[condition[0]] === player &&
            gameBoard[condition[1]] === player &&
            gameBoard[condition[2]] === player
        ) {
            result = true;
            gameWinner = player;
        };
    });
    return result;
};

function changePlayer (current) {
    current = current === "X" ? "O" : "X";
    return current;
    //here we wil lneed to do stuff to the DOM in the UI version
};


function showState () {
    console.log(gameBoard); 

    console.log(gameBoard[0] + "|" + gameBoard[1] + "|" + gameBoard[2]);
    //console.log("-----");
    console.log(gameBoard[3] + "|" + gameBoard[4] + "|" + gameBoard[5]);
    //console.log("-----");
    console.log(gameBoard[6] + "|" + gameBoard[7] + "|" + gameBoard[8]);

    //console.log("Player 1 = " + player1);
    //console.log("Player 2 = " + player2);
    console.log("Round = " + round);
    console.log("Current Player = " + currentPlayer);
    console.log("Game Over:  " + gameOver);
};

function printBoard () {
    console.log(gameBoard[0] + "|" + gameBoard[1] + "|" + gameBoard[2]);
    //console.log("-----");
    console.log(gameBoard[3] + "|" + gameBoard[4] + "|" + gameBoard[5]);
    //console.log("-----");
    console.log(gameBoard[6] + "|" + gameBoard[7] + "|" + gameBoard[8]);
};

GameController();