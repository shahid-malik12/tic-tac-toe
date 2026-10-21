const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], // First row
    [3, 4, 5], // Second row
    [6, 7, 8], // Third row
    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column
    [0, 4, 8], // Main diagonal
    [2, 4, 6]  // Other diagonal
];

function handleCellClick(event) {
    const cell = event.currentTarget;
    const index = Number(cell.dataset.index);

    // Ignore clicks after the game ends or on a filled cell.
    if (!gameActive || board[index] !== "") {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.disabled = true;

    const winningCombination = checkWinner();

    if (winningCombination) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;

        winningCombination.forEach(index => {
            cells[index].classList.add("winner");
        });

        gameActive = false;
        updatePlayerDisplay();
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        updatePlayerDisplay();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    updatePlayerDisplay();
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            return combination;
        }
    }

    return null;
}

function updatePlayerDisplay() {
    playerX.classList.toggle("active", gameActive && currentPlayer === "X");
    playerO.classList.toggle("active", gameActive && currentPlayer === "O");
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("x", "o", "winner");
    });

    statusText.textContent = "Player X's Turn";
    updatePlayerDisplay();
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
updatePlayerDisplay();
