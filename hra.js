import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle';

const playingFieldElement = document.querySelector('.game__playing-area')

const playingArea = [
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
]

document.querySelector('#game-infography').classList.add('game__infography-circle')


// Při kliknutí se:
const whenClicked = (event) => {
  // přidá se kolečko nebo křížek a změní se info o tom kdo je na tahu
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

    // zamezení obnovení stránky
    event.target.disabled = true

    // aktualizace pole po tahu
    let cellIndex = Array.from(playingFieldElement.children).indexOf(event.target);
    playingArea[cellIndex] = currentPlayer === 'circle' ? 'x' : 'o';

    // pokud je na tahu křížek, odešlou se data api s AI
    if (currentPlayer === 'cross') {
      const fetchData = async () => {
        const answer = await fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            board: playingArea,
            player: 'x'
          })
        });

        const bodyOfAnswer = await answer.json();
        console.log(bodyOfAnswer.result);

        // Aktualizace pole a kontrola vítěze po obdržení návrhu tahu od AI
        const suggestedMove = bodyOfAnswer.result;
        playingArea[suggestedMove] = 'x';
        let winner = findWinner(playingArea);

      };

      let winner = findWinner(playingArea)


      // oznámení o tom kdo vyhrál
      if (winner === 'o' || winner === 'x') {
        setTimeout(() => {
          alert(`Vyhrál hráč se symbolem ${winner}.`);
          location.reload();
        }, 500);
      }
  
      // oznámení o remíze
      if (winner === 'tie') {
        setTimeout(() => {
          alert(`Hra skončila nerozhodně.`);
          location.reload();
        }, 500);
      }

      // Zavolání asynchronní funkce
      fetchData();
    }

}

// přidání posluchačů na hlací políčka
const playingFields = document.querySelectorAll('.game__playing-field')
playingFields.forEach((playingField) => 
  playingField.addEventListener('click', whenClicked)
)

// dotaz na znovu spuštění hry
const whenRefreshed = (event) => {
    const result = window.confirm('Opravdu chcete hru spustit znovu?');
    if (result === true) {
        window.open("hra.html", 'Refresh...');
      } else {
        event.preventDefault()
      }
}

document.querySelector('#restart').addEventListener('click', whenRefreshed)
