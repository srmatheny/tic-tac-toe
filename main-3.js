
//Gameboard object - state of the board
function Gameboard () {
    const board = [];

    //push cell object into the array for each square in the board
    for (let i=0; i < 9; i++) {
        board.push(Cell());
        console.log(board);
    };

    //method to get board - future UI render
    const getBoard = () => board;

    const markSquare = (square, player) => {

        //get array of non-marked cells
        let availableSpaces = board.filter((space) => space !== "X" && space !== "O");
        
        //if no cells make it thru filter, move is invalid. stop execution
        if (!availableSpaces.length) return;
        
        //otherwisae, I have a valid move
        board[square].markSpace(player);
        };

        //This method prints board to the console
        const printBoard = () => {
            console.log(board[0] + "|" + board[1] + "|" + board[2]);
            //console.log("-----");
            console.log(board[3] + "|" + board[4] + "|" + board[5]);
            //console.log("-----");
            console.log(board[6] + "|" + board[7] + "|" + board[8]);        
        };

        //here is the interface for the rest of program
        //app to interact with the board
        return { getBoard, markSquare, printBoard};
};


// A cell represents one square in the board and can only be:
// a numbered item - no mark
//Player one - "X"
//Player two - "O"

function Cell() {
    let value = 0;

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
            token: "O"
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
        //mark a space for current player
        console.log(`Marking ${getActivePlayer().name}'s mark onto space ${space}...`);
        board.markSquare(space, getActivePlayer().token);

        //this is where we would check for a winner and handle that
        //such as win message

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
        getActivePlayer
    };
};


const game = GameController();

