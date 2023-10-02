let currentPlayer = 'circle';


const whenClicked = (event) => {
	if (currentPlayer === 'circle') {
        event.target.classList.add('game__playing-field--circle');
        document.querySelector('#game-infography').classList.remove('game__infography-cross')
        document.querySelector('#game-infography').classList.add('game__infography-circle')
        currentPlayer = 'cross';
    } else {
        event.target.classList.add('game__playing-field--cross');
        document.querySelector('#game-infography').classList.remove('game__infography-circle')
        document.querySelector('#game-infography').classList.add('game__infography-cross')
        currentPlayer = 'circle';
    }
}

document.querySelector('#field-1').addEventListener('click', whenClicked);
document.querySelector('#field-2').addEventListener('click', whenClicked);
document.querySelector('#field-3').addEventListener('click', whenClicked);
document.querySelector('#field-4').addEventListener('click', whenClicked);
document.querySelector('#field-5').addEventListener('click', whenClicked);
document.querySelector('#field-6').addEventListener('click', whenClicked);
document.querySelector('#field-7').addEventListener('click', whenClicked);
document.querySelector('#field-8').addEventListener('click', whenClicked);
document.querySelector('#field-9').addEventListener('click', whenClicked);
document.querySelector('#field-10').addEventListener('click', whenClicked);

