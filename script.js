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
  grid.innerHTML = ""; // Clear previous grid

  // Compare each digit
  for (let i = 0; i < 3; i++) {
    const guessDigit = guess[i];
    const correctDigit = String(randomNumber)[i];
    const div = document.createElement('div');

    if (guessDigit === correctDigit) {
      div.classList.add('correct');
      div.textContent = guessDigit;
    } else if (String(randomNumber).includes(guessDigit)) {
      div.classList.add('partial');
      div.textContent = guessDigit;
    } else {
      div.classList.add('wrong');
      div.textContent = guessDigit;
    }

    grid.appendChild(div);
  }

  if (guess === String(randomNumber)) {
    message.textContent = `You guessed the correct number in ${attempts} attempts!`;
    document.getElementById('guessInput').disabled = true;
  }

  guessInput.value = "";
}
