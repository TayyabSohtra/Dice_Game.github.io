'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const curr_score0 = document.getElementById('current--0');
const curr_score1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');


// starting condition
let playerstate = true;
let scores = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');
let activeplayer = 0;
let curr_score = 0;
const switchplayer = () => {
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    curr_score = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    //Switch to another player's turn
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

}

// Rolling the dice
btnroll.addEventListener('click', () => {
    if (playerstate) {
        //Generate the random dice 
        const diceno = Math.trunc(Math.random() * 6) + 1;
        console.log(diceno);

        //display the dice
        dice.classList.remove('hidden');
        dice.src = `images/dice-${diceno}.png`;

        //check the dice is 1 or not if it is true then switch 
        if (diceno !== 1) {
            curr_score += diceno;
            document.getElementById(`current--${activeplayer}`).textContent = curr_score;
            // curr_score0.textContent = curr_score;
        } else {
            switchplayer();
            // document.getElementById(`current--${activeplayer}`).textContent = 0;
            // curr_score = 0;
            //        activeplayer = activeplayer === 0 ? 1 : 0;
            //Switch to another player's turn
            // player0El.classList.toggle('player--active');
            // player1El.classList.toggle('player--active');
            //resetting current score
            // curr_score = 0;
            // curr_score0.textContent = 0;

        }

    }
});
btnhold.addEventListener('click', () => {
    if (playerstate) {

        //Adding the current score of the round
        scores[activeplayer] += curr_score;
        //Updating the UI with the new score
        document.querySelector(`#score--${activeplayer}`).textContent = scores[activeplayer];

        //Check if the game has ended
        if (scores[activeplayer] >= 100) {
            playerstate = false;
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
        }
        else {
            switchplayer();
        }
    }
});
btnnew.addEventListener('click', () => {
    //Reset everything
    window.location.reload();
});