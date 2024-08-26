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

// Sets the question and the number of boxes
export function gameSetUp(question, answer, rounds) {
  document.querySelector(".question").innerHTML = question;
  createLetterBoxes(answer, rounds);
}
