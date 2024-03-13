//set variables

const wordleGrid = document.getElementById('base_container');
const guessInput = document.getElementById('guess_text');
const submitButton = document.querySelector('.button');
const guessLabel = document.getElementById('guess_times');
let answerWord = '';
let currentAttempt = 0;
let guessList = []; 

//temp wordlist:
wordList = ['APPLE', 'BRAVE', 'CRISP', 'DELVE', 'ETHER', 'FLOCK', 'GRIME', 'HASTE', 'INLET', 'JUMBO', 'KNEEL', 'LEMON', 'MOUND', 'NOBLE', 'OPINE', 'PRIDE', 'QUICK', 'RIVER', 'SCALE', 'TRUCE', 'UNITE', 'VEXED', 'WITCH', 'XENON', 'YIELD', 'ZEBRA'];

function startGame() {
    currentAttempt = 0;
    answerWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(`Answer: ${answerWord}`);
   
}

startGame();

//check the word is vaild
submitButton.addEventListener('click', () => {
    const guess = guessInput.value.toUpperCase();
    if (guess.length === 5) {
        processGuess(guess);
        guessInput.value = ''; 
    } else {
        alert('Please enter a 5 letter word.');
    }
});

function processGuess(guess) {
    const answerArray = Array.from(answerWord);
    const guessArray = Array.from(guess);
    // Initialize the result array with default values
    const result = guessArray.map((letter, index) => {
        if (letter === answerArray[index]) {
            return 'correct'; // Letter matches exactly
        } else if (answerWord.includes(letter)) {
            return 'wrong-place'; // Letter is in the word but in the wrong place
        } else {
            return 'not-in-word'; // Letter is not in the word
        }
    });

    // Update UI with the result
    updateUI(currentAttempt, guess, result);

    currentAttempt++;
    if (guess === answerWord) {
        alert('Congratulations! You guessed the word!');
        // Implement restart game logic here
    } else if (currentAttempt >= 6) {
        alert(`Game over! The word was ${answerWord}.`);
        // Show restart button or auto-restart
        startGame(); // Restart the game for simplicity; implement better UI/UX in production
    }
}


function updateUI(attempt, guess, result) {
    
    const rowDivs = document.querySelectorAll(`.wordle-input-row${attempt + 1} .letter`);
    rowDivs.forEach((div, index) => {
        div.textContent = guess[index];
        div.className = 'letter'; // Reset class to just 'letter' before adding result class
        div.classList.add(result[index]); // Adds class based on correctness: 'correct', 'wrong-place', 'not-in-word'
    });
}



