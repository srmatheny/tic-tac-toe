
let globalArrayGameBoard = [];
let gameWinner = "";
let gameOver = false;

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


//Gameboard object - state of the board
function Gameboard () {
    const board = [];

    //push cell object into the array for each square in the board
    for (let i=0; i < 9; i++) {
        board.push(Cell());
        //console.log(board);
    };

    //method to get board - future UI render
    const getBoard = () => board;

    const markSquare = (square, player) => {

        //get array of non-marked cells
        //DEBUG - try to get value of one spoace on board:


        let availableSpaces = board.filter((space) => space.getValue() !== "X" && space.getValue() !== "O");
        console.log(availableSpaces.length);

        //if no cells make it thru filter, move is invalid. stop execution
        if (!availableSpaces.length) return;
        

        //otherwisae, I have a valid move
        board[square].markSpace(player);
        };
    

        //This method prints board to the console
        const printBoard = () => {
            const boardWithCellValues = board.map((cell) => cell.getValue());

            console.log(boardWithCellValues);
            globalArrayGameBoard = boardWithCellValues;
    
        };

        //const return true if space is not marked
        const isSpaceAvailable = (space) => {

        let temp0 = board[0].getValue();
        // let temp1 = board[1].getValue();

        console.log(temp0);
        // console.log(temp1);

        let temp = board[space].getValue();
        console.log (temp);

        if (board[space].getValue() === "X" || board[space].getValue() === "O") {
            let errorMsg = "Invalid pick, square already taken. Please try again."
            alert(errorMsg);
            return false;
        };
        
        //loop array and check value of each cell, if X or O, then invalid move, stop execution
        // for (i=0; i<9; i++) {
        //     let tempSpace = board[i].getValue();
        //     console.log(tempSpace);
        // };
        return true;
        };


        //here is the interface for the rest of program
        //app to interact with the board
        return { getBoard, markSquare, printBoard, isSpaceAvailable};
};


// A cell represents one square in the board and can only be:
// a numbered item - no mark
//Player one - "X"
//Player two - "O"

function Cell() {
    let value = "";

    //accept player mark to change the value of the cell
    const markSpace = (player) => {
        value = player;
    };

    //how we will retrieve the current value of the cell - closure
    const getValue = () => value;

    return {
        markSpace,
        getValue
    };
};


/*
**So, GameController wil lbe the controller for the flow and state 
** of the game turns, as well as if anyone has won
*/
function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {

    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            mark: "X"
        },
        {
            name: playerTwoName,
            mark: "O"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (space) => {

        //is game over?
        if (gameOver) {
            return;
        };

        //is space already marked?
        console.log(space);
        let temp = (board.isSpaceAvailable(space));
        //console.log("Temp = " + temp);
        if (!temp) return;
        
        // if (board[space].getValue() === "X" || board[space].getValue() === "O") {
        //     let errorMsg = "Invalid pick, square already taken. Please try again."
        //     alert(errorMsg);
        //     return;
        // };

        //mark a space for current player
        console.log(`Marking ${getActivePlayer().name}'s mark onto space ${space}...`);
        board.markSquare(space, getActivePlayer().mark);

        //need to handle if an error was occurred during markSquare- reset player to previous?


        //this is where we would check for a winner and handle that
        //such as win message
        //populate global array for testing win conditions
        board.printBoard();
        console.log(globalArrayGameBoard);

        let player = getActivePlayer().mark;
        console.log("DEBUG---Player= " + player);

        winningConditions.forEach(condition => {

            console.log(globalArrayGameBoard[0]);

            if (globalArrayGameBoard[condition[0]] === player &&
                globalArrayGameBoard[condition[1]] === player &&
                globalArrayGameBoard[condition[2]] === player
            ) {
            
            gameWinner = getActivePlayer().name;
            console.log(gameWinner);

            gameOver = true;
            console.log("DEBUG---GAME OVER = " + gameOver);


            };
        });


        //switch plkayer turn
        switchPlayerTurn();
        printNewRound();
    };

    //Initial play game message
    printNewRound();

    //for console, we only need playRound, but we need 
    //getActivePlayer for UI version
    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
};

function displayWinnerMessage () {
    const headerMessage = document.querySelector('.header');
    headerMessage.textContent = gameWinner + " Wins!";
}


function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    //check for winner here?
    if (gameOver === true) {
        console.log("DEBUG---SC---GAME OVER = " + gameOver);
        displayWinnerMessage();

        //disable all buttons in grid
        board.forEach(() => {
            const cellBtn = document.getElementsByClassName("cell");
            cellBtn.disabled = true;
        });
    };

    // Render board squares
    board.forEach((cell, index) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function 
        cellButton.dataset.column = index
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
    })

  }

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn) return;
    
    game.playRound(selectedColumn);
    updateScreen();

    // if (gameOver === true) {
    //     console.log("DEBUG---SC---GAME OVER = " + gameOver);
    //     displayWinnerMessage();
    // };


  };

  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();

  //check for winner here? No, only runs once
  //console.log("DEBUG---SC---GAME OVER = " + gameOver);

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
}

ScreenController();