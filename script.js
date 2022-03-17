'use strict';

// Selecting elements;
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Defining the initial variables;
// Initial variables declared as global so they can be
// accesesed by the local function variables;
let scores, activePlayer, currentScore, playing;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Setting the Roll Dice functionality;
const roll = function () {
  if (playing) {
    // 1. Generating a random dice;
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Displaying a dice;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    // 3. Check for rolled 1;
    if (dice !== 1) {
      // Add dice to the current score;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player;
      switchPlayer();
    }
  }
};
btnRoll.addEventListener('click', roll);

// Setting the Hold functionality;
const hold = function () {
  if (playing) {
    // 1. Current score is added to the total score;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if total score is >= 100 for a winner;
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
    } else {
      // 3. Switch to another player;
      switchPlayer();
    }
  }
};
btnHold.addEventListener('click', hold);

// Setting the New Game functionality;
btnNew.addEventListener('click', init);
