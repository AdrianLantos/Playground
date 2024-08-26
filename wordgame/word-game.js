const questionObjecst = [
  { question: "What is the name of a sybirean dog breed?", answer: "husky" },
  {
    question:
      "What dog breed holds the records for the longest toung of a dog?",
    answer: "BOXER",
  },
  {
    question:
      "Name the cross breed of Yorkshire Terrier and Australian Terrier?",
    answer: "SILKY",
  },
  {
    question: "Long Word test?",
    answer: "SILKYasdasd",
  },
];

const loadingDiv = document.querySelector(".spiral");
const ROUNDS = 5;
const QUESTION_OBJ =
  questionObjecst[Math.floor(Math.random() * questionObjecst.length)];
const QUESTION = QUESTION_OBJ.question;
const ANSWER = QUESTION_OBJ.answer.toUpperCase();
const ANSWER_LENGTH = ANSWER.length;

document.querySelector(".question").innerHTML = QUESTION;

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function mapNumberOfLetters(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      obj[array[i]]++;
    } else {
      obj[array[i]] = 1;
    }
  }

  return obj;
}

function createLetterBoxes() {
  let letterBoard = document.querySelector(".letterboard");

  for (let i = 0; i < ROUNDS; i++) {
    let newRow = document.createElement("div");
    newRow.className = "answer-row";
    newRow.id = "round-" + i;
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      let newDiv = document.createElement("div");
      newDiv.className = "letterboard-letter";
      newDiv.id =
        "letter-" + (ANSWER_LENGTH * ROUNDS - (ANSWER_LENGTH * ROUNDS - i));
      newRow.appendChild(newDiv);
    }

    letterBoard.appendChild(newRow);
  }
}

async function init() {
  let currentGuess = "";
  let currentRow = 0;
  let gameFinished = false;

  //Create answer boxes depending o word length
  createLetterBoxes();
  let letters = document.querySelectorAll(".letterboard-letter");

  const word = ANSWER;
  const wordLetters = word.split("");

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
    if (currentGuess === word) {
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
