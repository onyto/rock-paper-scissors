let playerScore = 0;
let computerScore = 0;
let ingame = false;

const currentScore = document.querySelector('#current-score');
const finalScore = document.querySelector('#final-score');
const results = document.querySelector('#results');
const buttons = document.querySelectorAll('.btn');
const startButton = document.querySelector('#start');

startButton.addEventListener('click', () => {
  if (!ingame) {
    startGame();
    ingame = true;
  } else {
    resetGame();
    ingame = false;
  }
})

function computerPlay() {
  let randomNumber = Math.floor(Math.random() * 3) + 1;

  switch (randomNumber) {
    case 1:
      return 'Rock';

    case 2:
      return 'Paper';

    case 3:
      return 'Scissors';
  }
}

function playRound(playerSelection, computerSelection) {
  let playerWin = 'playerWin';
  let computerWin = 'computerWin';

  if (
    playerSelection === 'Scissors' && computerSelection === 'Paper' ||
    playerSelection === 'Paper' && computerSelection === 'Rock' ||
    playerSelection === 'Rock' && computerSelection === 'Scissors'
  ) {
    results.textContent = `Results: You win this round, ${playerSelection} beats ${computerSelection}.`;
    return playerWin;

  } else if (
    playerSelection === 'Paper' && computerSelection === 'Scissors' ||
    playerSelection === 'Scissors' && computerSelection === 'Rock' ||
    playerSelection === 'Rock' && computerSelection === 'Paper'
  ) {
    results.textContent = `Results: You lose this round, ${playerSelection} loses to ${computerSelection}.`;
    return computerWin;

  } else {
    results.textContent = 'Draw.';
    return 'draw';
  }
}

function game() {
  const selection = this.textContent;
 
  switch (playRound(selection, computerPlay())) {
    case 'playerWin':
      playerScore++;
      currentScore.textContent = (`Score: ${playerScore}:${computerScore}`);
      break;
    case 'computerWin':
      computerScore++;
      currentScore.textContent = (`Score: ${playerScore}:${computerScore}`);
      break;
    case 'draw':
      currentScore.textContent = (`Score: ${playerScore}:${computerScore}`);
      break;
  }

  if (playerScore === 5) {
    finalScore.textContent = 'You win!';
    buttons.forEach(button => button.removeEventListener('click', game))
  }

  if (computerScore === 5) {
    finalScore.textContent = 'You lose!';
    buttons.forEach(button => button.removeEventListener('click', game))
  }
}

function showUi() {
  const content = document.querySelector('#ui');
  content.removeAttribute('hidden');
}

function hideUi() {
  const content = document.querySelector('#ui');
  content.setAttribute('hidden', 'hidden');
}

function startGame() {
  buttons.forEach(button => button.addEventListener('click', game))
  showUi();
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  results.textContent = "Results:";
  currentScore.textContent = "Score:";
  finalScore.textContent = "";

  buttons.forEach(button => button.removeEventListener('click', game))
  hideUi();
}