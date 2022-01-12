'use strict';

// Select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initial state
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
};
const resetGame = function(){
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    document.querySelector(`.player--0`).classList.add('player--active')
    diceEl.classList.add('hidden');
    currentScore = 0;
    score = [0, 0];
    playing = true;
}

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
// Rolling dice funtionality
btnRoll.addEventListener('click', function(){
    if(playing){
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random()*6)+1;
    
        // 2. Display diice
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`;
        
        // 3. Check for rolled 1: if true, switch to next player
        if (dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    if(playing){
        //1. Add current scire to active player score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
    
        //2. Check if player score is >= 100
        if(score[activePlayer] >= 20){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            diceEl.classList.add('hidden');

        }else{
            //3. switch to the next player
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', function(){
    resetGame();
})