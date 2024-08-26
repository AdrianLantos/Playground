export function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

export function mapNumberOfLetters(array) {
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

// Creates the UI elements for the letterboxes
function createLetterBoxes(answer, rounds) {
  let letterBoard = document.querySelector(".letterboard");

  for (let i = 0; i < rounds; i++) {
    let newRow = document.createElement("div");
    newRow.className = "answer-row";
    newRow.id = "round-" + i;
    for (let i = 0; i < answer.length; i++) {
      let newDiv = document.createElement("div");
      newDiv.className = "letterboard-letter";
      newDiv.id =
        "letter-" + (answer.length * rounds - (answer.length * rounds - i));
      newRow.appendChild(newDiv);
    }

    letterBoard.appendChild(newRow);
  }
}

function createKeyboard() {
  let keyboard = document.querySelector(".keyboard-holder");
  for (let i = 0; i < 3; i++) {
    let newKeyRow = document.createElement("div");
    newKeyRow.id = "keyboard-row-" + (i + 1);
    newKeyRow.className = "keyboard-row";

    for (let j = 0; j < 10; j++) {
      if (i === 2 && j === 0) {
        let newKey = document.createElement("div");
        let charValue = "Enter";
        newKey.innerHTML = charValue;
        newKey.id = "key-" + charValue;
        newKey.className = "keyboard-key";
        newKeyRow.appendChild(newKey);
      } else if (i === 2 && j >= 6) {
        let newKey = document.createElement("div");
        let charValue = "Del";
        newKey.innerHTML = charValue;
        newKey.id = "key-" + charValue;
        newKey.className = "keyboard-key";
        newKeyRow.appendChild(newKey);
        break;
      }
      let newKey = document.createElement("div");
      let charValue;
      if (i === 2 && j === 0) {
        charValue = "Enter";
      } else if (i === 2 && j === 9) {
        charValue = "Del";
      }

      charValue = String.fromCharCode(65 + 10 * i + j);
      newKey.innerHTML = charValue;
      newKey.id = "key-" + charValue;
      newKey.className = "keyboard-key";
      newKeyRow.appendChild(newKey);
    }
    keyboard.appendChild(newKeyRow);
  }
}

// Sets the question and the number of boxes
export function gameSetUp(question, answer, rounds) {
  document.querySelector(".question").innerHTML = question;
  createKeyboard();
  createLetterBoxes(answer, rounds);
}
