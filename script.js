'use strict';
/*
Oyunun başlangıcında, ilk oyuncu zar atarak oyuna başlar ve atılan zarın değeri 1 gelene kadar zar atma hakkına sahiptir. Atılan her zarın değeri toplanarak "current" adı altında yazılır. Eğer oyuncunun attığı zarın değeri 1 gelirse, o zamana kadar attığı tüm zar değerlerinin toplamı sıfırlanır ve hanesine puan geçmez. Sıra diğer oyuncuya geçer. Oyuncular "hold" butonuna basarak sırayı karşı tarafa bırakabilirler ve o zamana kadar attıkları tüm zarların değerleri hanesine geçer. Oyuncular 100 puanı geçene kadar zar atmaya devam ederler ve ilk 100 puanı geçen oyuncu oyunu kazanır.
*/
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const names = document.querySelectorAll('.name');
const currentScore1 = document.querySelector('#current--0');
const currentScore2 = document.querySelector('#current--1');
const totalScore1 = document.getElementById(`score--0`);
const totalScore2 = document.getElementById(`score--1`);
let scores, currentScore, activePlayer, isPlaying;

function defaultStats() {
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  scores = [0, 0];
  dice.classList.add('hidden');
  currentScore1.textContent = currentScore;
  currentScore2.textContent = currentScore;
  totalScore1.textContent = scores[0];
  totalScore2.textContent = scores[1];
  document.querySelector(`.winner--0`).classList.add('hidden');
  document.querySelector(`.winner--1`).classList.add('hidden');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
}

document.addEventListener('DOMContentLoaded', defaultStats);

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  if (isPlaying) {
    let rndImg = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${rndImg}.png`;
    dice.classList.remove('hidden');

    if (rndImg != 1) {
      currentScore += rndImg;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (isPlaying) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.winner--${activePlayer}`)
        .classList.remove('hidden');
    } else {
      switchPlayer();
    }
  }
});
btnNewGame.addEventListener('click', defaultStats);
