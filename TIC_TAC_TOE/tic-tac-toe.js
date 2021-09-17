/*
* Tic Tac Toe scripts, January 2021
* Version 2
* Name: Ferhad Mislim
*/


//this is an document object to reach into each cell(td tag) in the game board
var board = document.getElementsByTagName("td");

// assuming we index the 9 tic tac toe cells from left to right, top to
// bottom, as 0-8, these would be all of the winning combinations:
var winSets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// X always gets to go first
var player = "X";

// keep track of how many cells are empty at any time
var empty = 9;

// keep track of game status - false if still playing
var gameOver = false;

/* Function resetGame() is called when user clicks on the "game reset" button
 1. sets content of all 9 cells to nothing
 2. sets the starting player (this version, X always starts the game)
 3. updates the message to the current player
 4. resets the number of empty cells to 9
 5. sets the game over flag to false to indicate that the game is in progress
 */
function resetGame() {


    // this for-loop is for changing the text contents of the 9 cells in the table to be empty.
    for (i = 0; i < board.length; i++) {
        board[i].innerHTML = "";
    }

    //  reset player back to X and update it on the page
    player = "X";
    document.getElementById("player").innerHTML = player;
    //  reset gameOver and # of empty cells
    gameOver = false;
    empty = 9;
}

/* Function cellClicked() is called
 when the event listeners for the "td" cells fire which occurs
 when the user clicks on one of the nine cells of the board
 1. decreases # of empty cells by 1
 2. sets the content of the clicked cell to the current player's mark
 3. checks whether or not there is a winner
 4. flips (changes) the current player
 5. updates the message to the current player
 */
function cellClicked(cell) {

    // 1-5 should occur only when the selected cell is empty and the game is 
    // still in progress!
    if (cell.innerHTML == "" && !gameOver) {
        // decrease # of empty cells by 1
        empty--;

        // change the content of the clicked cell to X or O
        cell.innerHTML = player;
        // recall the function checkWin()  
        checkWin();
        //this code changes the value of player to X if it is O and vice versa
        player = (player === "X") ? "O" : "X";
        //this code changes the text content of id = "player" to X or O according to the previous line
        document.getElementById("player").innerHTML = player;
    }
}

/* Function checkWin() is called to check all winning combinations and display results
 */
function checkWin() {


    // a for loop for cheking the combination of 3 cells that if they have the same value, the game will be over
    //and the winner's name (X or O) will be displayed. 
    for (i = 0; i < winSets.length; i++) {
        //cheking if 3 consecutive cells(horizontal,vertical,diagonal) have the same value
        if (board[winSets[i][0]].innerHTML == board[winSets[i][1]].innerHTML
            && board[winSets[i][1]].innerHTML == board[winSets[i][2]].innerHTML
            && board[winSets[i][0]].innerHTML != "") {

            //console.log("We have a winner!");


            //  - set gameOver variable: game is now over 
            gameOver = "game is now over";
            //  - display "X Wins!" or "O Wins!" in the winner H3
            var winner = (player === "X") ? "X Wins!" : "O Wins!";
            document.getElementById("winner").innerHTML = winner;
            //  - call displayWin(true) function
            displayWin(true);
            //  - break out of this loop: no point in continuing
            break;
        }
    }
    //  if there are no empty cells left and game is not yet over,
    //       it means that there is no winner for this game
    // - set gameOver variable: game is now over  
    // - display "No one wins! :(" in the winner H3
    // - call displayWin(true) function
    if (empty == 0 && !gameOver) {//====================================================================================
        gameOver = "game is now over";
        document.getElementById("winner").innerHTML = "No one wins! :(";
        displayWin(true);
    }
}
// ==========================================================================

document.getElementById("reset").addEventListener("click", resetGame);
document.getElementById("message").addEventListener("click", function () {
    displayWin(false);
});
for (i = 0; i < board.length; i++) {
    document.getElementsByTagName("td")[i].addEventListener("click", function () {
        cellClicked(this);
    });
}
// displays the results window with the winner inside it: the method will
// either show the results or hide them (displayWin(true) shows and 
// displayWin(false) hides)
function displayWin(show) {
    if (show) {
        document.getElementById("message").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    } else {
        document.getElementById("message").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }
}

// ===============================================================