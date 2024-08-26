import { ROUNDS, QUESTION, ANSWER, ANSWER_LENGTH } from "./constants.js";
import { gameSetUp, isLetter, mapNumberOfLetters } from "./util.js";

async function init() {
  gameSetUp(QUESTION, ANSWER, ROUNDS);

  const wordLetters = ANSWER.split("");
  const letters = document.querySelectorAll(".letterboard-letter");
  let currentGuess = "";
  let currentRow = 0;
  let gameFinished = false;

  // Function Responsible for adding and removing the css animation class
  function markInvalidWord(_shake) {
    let applyShake = _shake || false;
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (applyShake) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("shake");
        letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
      } else {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
      }

      setTimeout(() => {
        letters[
          currentRow * ANSWER_LENGTH + i - ANSWER_LENGTH
        ].classList.remove("invalid");
        if (applyShake) {
          letters[
            currentRow * ANSWER_LENGTH + i - ANSWER_LENGTH
          ].classList.remove("shake");
        }
      }, 450);
    }
  }

  // Function that handle guessing from player
  async function guess() {
    if (currentGuess.length !== ANSWER_LENGTH) {
      markInvalidWord();
      //Don't allow invalid guesses
      return;
    }

    const guessLetters = currentGuess.split("");
    const letterMap = mapNumberOfLetters(wordLetters);

    // Check for correct letters first
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessLetters[i] === wordLetters[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        letterMap[guessLetters[i]]--;
      }
    }

    // Game Won if guess is correct
    if (currentGuess === ANSWER) {
      gameFinished = true;
      return;
    } else {
      markInvalidWord(true);
    }

    // Check if word contains letter from guess or letter is wrong
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessLetters[i] === wordLetters[i]) {
        // do nothing if it's correct
        continue;
      }

      if (
        wordLetters.includes(guessLetters[i]) &&
        letterMap[guessLetters[i]] > 0
      ) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        letterMap[guessLetters[i]]--;
      }
    }

    currentRow++;

    // Game Lost if the current row is above number of guesses allowed
    if (currentRow === ROUNDS) {
      gameFinished = true;
      alert("game lost");
      return;
    }
    currentGuess = "";
  }

  function erase() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
  }

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText =
      letter;
  }

  document.addEventListener("keydown", function handleKeyPress(event) {
    if (gameFinished) return;

    const action = event.key;

    if (action === "Enter") {
      guess();
    } else if (action === "Backspace") {
      erase();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    }
  });
}

init();
