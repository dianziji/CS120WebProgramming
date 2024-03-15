//set variables

const wordleGrid = document.getElementById("base_container");
const guessInput = document.getElementById("guess_text");
const actionButton = document.getElementById("actionButton");
const guessLabel = document.getElementById("guess_times");
let answerWord = "";
let currentAttempt = 0;
let guessList = [];

//temp wordlist called when word API failed
wordList = [
  "APPLE",
  "BRAVE",
  "CRISP",
  "DELVE",
  "ETHER",
  "FLOCK",
  "GRIME",
  "HASTE",
  "INLET",
  "JUMBO",
  "KNEEL",
  "LEMON",
  "MOUND",
  "NOBLE",
  "OPINE",
  "PRIDE",
  "QUICK",
  "RIVER",
  "SCALE",
  "TRUCE",
  "UNITE",
  "VEXED",
  "WITCH",
  "XENON",
  "YIELD",
  "ZEBRA",
];

function generateWord() {
  const url = "https://random-word-api.herokuapp.com/word?length=5";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      answerWord = data[0].toUpperCase();

      console.log(`Answer: ${answerWord}`);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      //call backup wordlist
      answerWord = wordList[Math.floor(Math.random() * wordList.length)];

      console.log(`Answer: ${answerWord}`);
    });
}

document.addEventListener("DOMContentLoaded", startGame);
function startGame() {
  currentAttempt = 0;
  generateWord();
  actionButton.innerText = "Submit";
  actionButton.onclick = GuessSubmit;
  resetBoard();
}

//check the word is vaild

function GuessSubmit() {
  let guess = guessInput.value.toUpperCase();

  let isCorrectLength = guess.length === 5;
  // Check if the guess contains only letters
  let containsOnlyLetters = /^[A-Z]+$/.test(guess);

  if (!isCorrectLength) {
    alert("Your guess must be exactly 5 letters.");
  } else if (!containsOnlyLetters) {
    alert("Your guess must contain only letters (A-Z).");
  } else {
    // If both checks are passed, process the guess
    processGuess(guess);
    // reset input field after processing the guess
    guessInput.value = "";
  }
}

function processGuess(guess) {
  const answerArray = Array.from(answerWord);
  //tracking remaining letters
  let remainingLetters = answerWord;

  // Generate an initial result array filled with 'not-in-word' to cover all letters initially
  const result = Array.from(guess, () => "not-in-word");

  // Check if all letters that are correctly placed
  guess.split("").forEach((letter, index) => {
    if (letter === answerArray[index]) {
      result[index] = "correct"; // Letter matches exactly
      remainingLetters = remainingLetters.replace(letter, "");
    }
  });

  // check if letters in the wrong place without double counting
  guess.split("").forEach((letter, index) => {
    if (answerArray.includes(letter) && result[index] !== "correct") {
      if (remainingLetters.includes(letter)) {
        // Letter is in the word but in the wrong place
        result[index] = "wrong-place";

        remainingLetters = remainingLetters.replace(letter, "");
      } else {
        // If the letter has already been used the correct number of times in the answer, it remains 'not-in-word'
        result[index] = "not-in-word";
      }
    }
  });

  // Update board here
  const rowDivs = document.querySelectorAll(
    `.wordle-input-row${currentAttempt + 1} .letter`
  );
  rowDivs.forEach((div, index) => {
    div.textContent = guess[index];

    div.className = "letter";

    div.classList.add(result[index]);
  });

  //finish check
  if (guess === answerWord) {
    handleWin();
  } else {
    currentAttempt++;
    if (currentAttempt >= 6) {
      handleLoss();
    }
  }
}

function handleWin() {
  alert("Congratulations! You guessed the word!");
  actionButton.innerText = "Restart";
  guessInput.disabled = true;
  actionButton.onclick = resetGame;
}

function handleLoss() {
  alert(`Game over! The word was ${answerWord}.`);
  actionButton.innerText = "Restart";
  guessInput.disabled = true;
  actionButton.onclick = resetGame;
}

function resetGame() {
  // Re-enable the guess input
  guessInput.disabled = false;
  guessInput.value = "";

  // Reset the game state
  currentAttempt = 0;
  generateWord();

  resetBoard();
  // Set the button back to its initial state
  actionButton.innerText = "Submit";
  actionButton.onclick = GuessSubmit;
}

function resetBoard() {
  const letters = document.querySelectorAll(".letter");
  letters.forEach((letter) => {
    letter.textContent = "";
    letter.className = "letter"; // Reset any additional classes
  });
  // Re-enable the submit button if it was disabled
  actionButton.disabled = false;
}
