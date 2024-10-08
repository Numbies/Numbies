let randomNumber = generateRandomNumber();
let attempts = 0;

function generateRandomNumber() {
  return Math.floor(Math.random() * 900) + 100; // Generates a 3-digit number
}

function submitGuess() {
  const guessInput = document.getElementById('guessInput');
  const grid = document.getElementById('grid');
  const message = document.getElementById('message');

  const guess = guessInput.value;

  if (guess.length !== 3) {
    message.textContent = "Please enter a valid 3-digit number.";
    return;
  }

  attempts++;
  message.textContent = "";

  const correctNumberArray = String(randomNumber).split('');
  const guessArray = guess.split('');
  const guessRow = document.createElement('div');
  guessRow.classList.add('guessRow');

  let correctPositions = [false, false, false]; // Tracks if a position has been correctly guessed
  let usedInPartialCheck = [false, false, false]; // Tracks which positions have been used in partial check

  // First pass: Check for correct digits in the correct position (green)
  for (let i = 0; i < 3; i++) {
    const div = document.createElement('div');

    if (guessArray[i] === correctNumberArray[i]) {
      div.classList.add('correct');
      div.textContent = guessArray[i];
      correctPositions[i] = true; // Mark this position as matched
      usedInPartialCheck[i] = true; // Mark this position as used in partial check
      correctNumberArray[i] = null; // Prevent reuse of this digit in the second pass
    } else {
      div.textContent = guessArray[i];
    }

    guessRow.appendChild(div);
  }

  // Second pass: Check for correct digits in the wrong position (yellow)
  for (let i = 0; i < 3; i++) {
    if (!correctPositions[i]) {
      const div = guessRow.children[i];

      // Check if the digit exists in the remaining unmatched digits
      const index = correctNumberArray.indexOf(guessArray[i]);
      if (index !== -1 && !usedInPartialCheck[index]) {
        div.classList.add('partial');
        correctNumberArray[index] = null; // Prevent reuse of this digit
      } else {
        div.classList.add('wrong');
      }
    }
  }

  grid.appendChild(guessRow); // Add the guess to the grid for history

  if (guess === String(randomNumber)) {
    message.textContent = `You guessed the correct number in ${attempts} attempts!`;
    document.getElementById('guessInput').disabled = true;
  }

  guessInput.value = "";
}
