// Select all the game cells and the restart button
let cellTarget = document.querySelectorAll(".game--container .cell");
let reset = document.querySelector(".game--restart");

// Define an array of X's and O's for the players
let signed = ["X","O"];

// Define the current player and an array to hold the state of the cells in the game
let currentPlayer = signed[0];
var myArray = new Array(9);

// Set the winner variable to false and attach a click event to the reset button
let winner = false;
reset.onclick = resetFunc;

// Display the current player in the game status message and attach click events to each game cell
document.querySelector(".game--status").innerHTML = "It's X's turn";
for (let cellTargetElement of cellTarget) {
    cellTargetElement.onclick = handleCellClick;
}

// Function to handle changing the current player
function handlePlayerChange () {
    if (currentPlayer == "X") {
        currentPlayer = signed[1];
    }else {
        currentPlayer = signed[0];
    }
    document.querySelector(".game--status").innerHTML = "It's "+currentPlayer+"'s turn";
}

// Function to handle a click on a game cell
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    // Check if the cell is empty and there is no winner yet
    if (clickedCell.innerHTML === '' && !winner) {
        clickedCell.innerHTML = currentPlayer;
        // Update the game state array with the current player's move
        myArray[clickedCellEvent.target.attributes['data-cell-index'].value] = clickedCell.innerHTML;
        // Change the current player, check for a winner, and check for a draw
        handlePlayerChange();
        checkOwn(myArray);
        checkDraw(myArray);
    }
}

// Function to reset the game to its initial state
function resetFunc () {
    // Clear all the game cells and reset the winner and game state array
    for (let cellTargetElement of cellTarget) {
        cellTargetElement.innerHTML = '';
    }
    winner = false;
    myArray.fill(undefined);
    // Set the current player to O and update the game status message
    currentPlayer = signed[1];
    handlePlayerChange();
}

// Function to check if a player has won the game
function checkOwn (arr) {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
            winner = true;
            document.querySelector(".game--status").innerHTML = "Player "+arr[a]+" has won";
        }
    }

    return null;
}

// Function to check if the game is in a draw state
function checkDraw(arr) {
    for (let x = 0; x < arr.length; x++) {
        if (arr[x] === undefined) {
            return;
        }
    }
    document.querySelector(".game--status").innerHTML = "Game ended in a draw";
}