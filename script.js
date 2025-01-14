document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const winnerText = document.getElementById("winner");
    const resetButton = document.getElementById("resetGame");
    
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    function createBoard() {
        board.innerHTML = "";
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.dataset.index = index;
            cellElement.innerText = cell;
            cellElement.addEventListener("click", makeMove);
            board.appendChild(cellElement);
        });
    }

    function makeMove(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] === "" && gameActive) {
            gameBoard[index] = currentPlayer;
            event.target.innerText = currentPlayer;
            event.target.classList.add("taken");
            
            if (checkWinner()) {
                winnerText.innerText = `Wygrał gracz ${currentPlayer}!`;
                gameActive = false;
                highlightWinningCells();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return combination;
            }
        }
        return null;
    }

    function highlightWinningCells() {
        const winningCells = checkWinner();
        if (winningCells) {
            winningCells.forEach(index => {
                document.querySelector(`[data-index="${index}"]`).classList.add("winning-cell");
            });
        }
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        winnerText.innerText = "";
        gameActive = true;
        createBoard();
    }

    resetButton.addEventListener("click", resetGame);
    createBoard();
});