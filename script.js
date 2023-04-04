const gameBoard = document.querySelector('.game-board');
const restartBtn = document.querySelector('#restart-btn');
const gameStatus = document.querySelector('.game-status');
let currentPlayer = 'X';
let gameFinished = false;

// initialize game board
for (let i = 0; i < 9; i++) {
	const cell = document.createElement('div');
	cell.classList.add('cell');
	cell.id = `cell-${i}`;
	cell.addEventListener('click', handleCellClick);
	gameBoard.appendChild(cell);
}

// handle cell click event
function handleCellClick(e) {
	const cell = e.target;
	if (cell.textContent || gameFinished) return;
	cell.textContent = currentPlayer;
	cell.classList.add(currentPlayer);
	if (checkWin()) {
		gameFinished = true;
		gameStatus.textContent = `${currentPlayer} ganhou!`;
		return;
	}
	if (checkTie()) {
		gameFinished = true;
		gameStatus.textContent = 'Empate!';
		return;
	}
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// check if there is a winner
function checkWin() {
	const winPatterns = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	return winPatterns.some(pattern => {
		return pattern.every(index => {
			return gameBoard.querySelector(`#cell-${index}`).classList.contains(currentPlayer);
		});
	});
}

// check if it's a tie
function checkTie() {
	return Array.from(gameBoard.children).every(cell => {
		return cell.textContent;
	});
}

// handle restart button click event
restartBtn.addEventListener('click', () => {
	Array.from(gameBoard.children).forEach(cell => {
		cell.textContent = '';
		cell.classList.remove('X', 'O');
	});
	gameStatus.textContent = '';
	currentPlayer = 'X';
	gameFinished = false;
});