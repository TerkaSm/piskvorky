import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle';

document.querySelector('#game-infography').classList.add('game__infography-circle')

const whenClicked = (event) => {
	if (currentPlayer === 'circle') {
        event.target.classList.add('game__playing-field--circle');
        document.querySelector('#game-infography').classList.remove('game__infography-circle')
        document.querySelector('#game-infography').classList.add('game__infography-cross')
        currentPlayer = 'cross';
    } else {
        event.target.classList.add('game__playing-field--cross');
        document.querySelector('#game-infography').classList.remove('game__infography-cross')
        document.querySelector('#game-infography').classList.add('game__infography-circle')
        currentPlayer = 'circle';
    }

    event.target.disabled = true
}

const playingFields = document.querySelectorAll('.game__playing-field')
playingFields.forEach((playingField) => 
  playingField.addEventListener('click', whenClicked)
)


const whenRefreshed = (event) => {
    const result = window.confirm('Opravdu chcete hru spustit znovu?');
    if (result === true) {
        window.open("hra.html", 'Refresh...');
      } else {
        event.preventDefault()
      }
}

document.querySelector('#restart').addEventListener('click', whenRefreshed)

const playingArea = [
  '_', 'o', 'x', 'x', 'o', '_', '_', 'o', '_', '_',
  '_', 'o', 'x', 'x', 'o', '_', '_', 'o', '_', '_',
  '_', 'o', 'x', 'x', 'o', '_', '_', 'o', '_', '_',
  '_', 'o', 'x', 'x', 'o', '_', '_', 'o', '_', '_',
  '_', 'o', 'x', 'x', 'o', '_', '_', 'o', '_', '_',
  '_', 'o', 'x', 'x', 'o', '_', '_', 'o', '_', '_',
  '_', 'o', 'x', 'x', 'o', '_', '_', 'o', '_', '_',
  '_', 'o', 'x', 'x', 'o', '_', '_', 'o', '_', '_',
  '_', 'o', 'x', 'x', 'o', '_', '_', 'o', '_', '_',
  '_', 'o', 'x', 'x', 'o', '_', '_', 'o', '_', '_',
]


const winner = findWinner(playingArea)

if (winner === 'o' || winner === 'x') {
	alert(`Vyhrál hráč se symbolem ${winner}.`) 
}

