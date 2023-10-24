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
        console.log(bodyOfAnswer);
    
        const suggestedMove = bodyOfAnswer.position;
        const index = suggestedMove.x + suggestedMove.y * 10;
        playingArea[index] = 'x';
    
        // Aktualizace UI hracího pole
        const buttonToClick = playingFieldElement.children[index];
        buttonToClick.classList.add('game__playing-field--cross');
    
        // Kontrola vítěze po obdržení návrhu tahu od AI
        let winner = findWinner(playingArea);
    
        // Oznámení o vítězi nebo remíze
        if (winner === 'o' || winner === 'x') {
          setTimeout(() => {
            alert(`Vyhrál hráč se symbolem ${winner}.`);
            location.reload();
          }, 500);
        }
    
        if (winner === 'tie') {
          setTimeout(() => {
            alert(`Hra skončila nerozhodně.`);
            location.reload();
          }, 500);
        }
      };
    
      // Zavolání asynchronní funkce
      fetchData();
    }
    

}

// přidání posluchačů na hrací políčka
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
