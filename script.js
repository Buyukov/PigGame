'use strict';

// Selecting Elements //
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');


const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


const switchPlayer = () => {
    // Switch to next player
 document.getElementById(`current--${activePlayer}`).textContent = 0;
 currentScore = 0;

 activePlayer = activePlayer === 0 ? 1 : 0;

 player0.classList.toggle('player--active');
 player1.classList.toggle('player--active');
}
//-------------------------------

// Sarting Condition //
let score, currentScore, activePlayer, playing;

const init = () => {
   score = [0, 0];
   currentScore = 0;
   activePlayer = 0; // 0 / 1
   playing = true;
   score0.textContent = score1.textContent = '0';
   current0.textContent = current1.textContent = '0';
   diceEl.classList.add('hidden');
   player0.classList.remove('player--winner');
   player1.classList.remove('player--winner');
   player0.classList.add('player--active');
   player1.classList.remove('player--active');
   btnRoll.style.cursor = 'pointer';
   btnHold.style.cursor = 'pointer';

};

init();



// Rolling dice functionality //
btnRoll.addEventListener('click', function(){
if (playing ) {

// 1. Generate a random dice roll
   const diceNum = Math.trunc(Math.random()* 6) + 1;

// 2. Display dice
   diceEl.src = `dice-${diceNum}.png`;
   diceEl.classList.remove('hidden');

// 3. Check for rolled 1: if true:
if (diceNum !== 1) {
    currentScore = currentScore + diceNum;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    // If true:
} // !==  teng bo'lmasa degan manoni anglatadi.

else {
 // Switch to next player
     switchPlayer();
   }
 }
});


// Hold score functionality
btnHold.addEventListener('click', function(){
if (playing) {

   // 1. add current score to active player's score
     score[activePlayer] += currentScore;
     document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

   // 2. Check if player's score is >= 100
   if (score[activePlayer] >= 100) {
      //Finish the game
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
      btnHold.style.cursor = 'not-allowed';
      btnRoll.style.cursor = 'not-allowed';
   }
   else {
      // Switch to the next player
      switchPlayer();
   }
 }
});


// New game functionality
btnNew.addEventListener('click', init);

