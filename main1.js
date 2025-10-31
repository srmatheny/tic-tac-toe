
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


const Gameboard = (() => {

    let gameboard = ["", "", "", "", "", "", "", "", ""]

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");

        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        });

    };

    return {
        render, 
    };

}) ();


const createPlayer = (name, mark) => {
    return {
        name,
        mark
    };
};


const Game = (() => {

    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")  
        ];
        currentPlayerIndex = 0;
        gameOver = false;

        Gameboard.render();
    };

    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
        alert(index);
    };

    return {
        start, 
        handleClick
    };

})();


const startButton = document.querySelector("#start-button");
//console.log(startButton);     



startButton.addEventListener("click", () => {
    //alert("Hello World");
    Game.start();

});

