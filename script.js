
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const restartBtn = document.querySelector('.restart-btn');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

    status.textContent = currentPlayerTurn();

    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    };

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i <= 6; i += 3) {
            if (gameState[i] !== '' && gameState[i] === gameState[i + 1] && gameState[i] === gameState[i + 2]) {
                roundWon = true;
                break;
            }
        }
        for (let i = 0; i <= 2; i++) {
            if (gameState[i] !== '' && gameState[i] === gameState[i + 3] && gameState[i] === gameState[i + 6]) {
                roundWon = true;
                break;
            }
        }
        if (gameState[0] !== '' && gameState[0] === gameState[4] && gameState[0] === gameState[8]) {
            roundWon = true;
        }
        if (gameState[2] !== '' && gameState[2] === gameState[4] && gameState[2] === gameState[6]) {
            roundWon = true;
        }

        if (roundWon) {
            status.textContent = winningMessage();
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            status.textContent = drawMessage();
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = currentPlayerTurn();
    };

    const handleRestartGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = currentPlayerTurn();
        cells.forEach(cell => cell.textContent = '');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', handleRestartGame);
});
