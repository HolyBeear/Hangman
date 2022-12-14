document.getElementById("gameWon").style.display = "none";
document.getElementById("gameOverScreen").style.display = "none";

const startButton = document.getElementById("startButton");
// Add an event listener to the start button to start the game when it is clicked
startButton.addEventListener("click", startGame);

function startGame() {
  // Hide the start screen and start the game
  document.getElementById("startScreen").style.display = "none";
}

// Declare variables for the game
const wordList = [
  "baby",
  "vater",
  "adler",
  "stoff",
  "gitarre",
  "lebensraum",
  "eisberg",
  "jacke",
  "känguru",
  "lampe",
  "mutter",
  "nacht",
  "meer",
  "pyjama",
  "königin",
  "waschbär",
  "koffer",
  "lehrer",
  "regenschirm",
  "urlaub",
  "brieftasche",
  "xylophon",
  "jahr",
  "zebra",
  "apfel",
  "buch",
  "katze",
  "schreibtisch",
  "ei",
  "frosch",
  "ziege",
  "honig",
  "iglu",
  "saft",
  "schlüssel",
  "zitrone",
  "mond",
  "krankenschwester",
  "orange",
  "birne",
  "federkiel",
  "kaninchen",
  "socke",
  "tisch",
  "regenschirm",
  "geige",
  "uhr",
  "röntgenbild",
  "jo-jo",
  "reißverschluss",
  "alarm",
  "boot",
  "kuh",
  "puppe",
  "elefant",
  "fächer",
  "weintrauben",
  "hut",
  "leguan",
  "qualle",
  "drachen",
  "löwe",
  "becher",
  "notizbuch",
  "krake",
  "stift",
  "steppdecke",
]; // list of possible words to choose from
let answer = ""; // the chosen word
const maxWrong = 6; // maximum number of wrong guesses allowed
let mistakes = 0; // number of wrong guesses made by the player
let guessed = []; // array to hold letters that have been guessed by the player
let wordStatus = null; // current state of the word as the player guesses letters
let wrongLetters = []; // array to hold letters that have been guessed incorrectly

// Function to choose a random word from the wordList array and set it as the answer
function randomWord() {
  answer = wordList[Math.floor(Math.random() * wordList.length)];
}

// Function to handle a letter guess from the player
function handleGuess() {
  // Get the value of the guess from the input field
  let guess = document.getElementById("guess");
  let chosenLetter = guess.value;

  // Convert the letter to lowercase
  chosenLetter = chosenLetter.toLowerCase();

  // Add the letter to the guessed array if it has not been guessed before
  if (guessed.indexOf(chosenLetter) === -1) {
    guessed.push(chosenLetter);
  }

  // Check if the letter is in the answer and has not been guessed before
  if (
    answer.indexOf(chosenLetter) >= 0 &&
    wrongLetters.indexOf(chosenLetter) === -1
  ) {
    // Update the wordStatus and check if the game has been won
    guessedWord();
    checkIfGameWon();
  } else if (
    answer.indexOf(chosenLetter) === -1 &&
    wrongLetters.indexOf(chosenLetter) === -1
  ) {
    // Increment the mistakes, add the letter to the wrongLetters array, and check if the game is lost
    mistakes++;
    wrongLetters.push(chosenLetter);
    updateMistakes();
    checkIfGameLost();
  } else {
    // Alert the player that the letter has already been guessed
    alert("You have already guessed that letter");
  }

  if (mistakes === 1) {
    document.getElementById("hangmanPic").src = "./img/1.png";
  } else if (mistakes === 2) {
    document.getElementById("hangmanPic").src = "./img/2.png";
  } else if (mistakes === 3) {
    document.getElementById("hangmanPic").src = "./img/3.png";
  } else if (mistakes === 4) {
    document.getElementById("hangmanPic").src = "./img/4.png";
  } else if (mistakes === 5) {
    document.getElementById("hangmanPic").src = "./img/5.png";
  } else if (mistakes === 6) {
    document.getElementById("hangmanPic").src = "./img/6.png";
  }
}

// Function to update the wordStatus with the current state of the word
function guessedWord() {
  // Split the answer into individual letters, replace unguessed letters with underscores, and join the letters back into a string
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");

  // Update the page with the current wordStatus
  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

// Function to update the number of mistakes on the page
function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

// Function to check if the game has been won
function checkIfGameWon() {
  if (wordStatus === answer) {
    gameWon();
  }

  function gameWon() {
    // Hide the game container and show the game over screen
    document.getElementById("gameWon").style.display = "flex";
    const continueButton = document.getElementById("continueButton");
    continueButton.addEventListener("click", function () {
      reset();
      document.getElementById("hangmanPic").src = "./img/0.png";
    });
    // Check if the wordStatus matches the answer and alert the player if they have won
  }
}

// Function to check if the game is lost
function checkIfGameLost() {
  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", function () {
    reset();
    guessed = [];
    document.getElementById("hangmanPic").src = "./img/0.png";
  });

  function gameOver() {
    // Hide the game container and show the game over screen
    document.getElementById("gameOverScreen").style.display = "flex";
  }
  // Check if the number of mistakes has reached the maximum allowed and alert the player if the game is lost
  if (mistakes === maxWrong) {
    gameOver();
  }
}

// Function to reset the game
function reset() {
  mistakes = 0;
  guessed = [];
  wrongLetters = [];
  document.getElementById("gameWon").style.display = "none";
  document.getElementById("gameOverScreen").style.display = "none";
  randomWord();
  guessedWord();
  updateMistakes();
  clearInput();
}

// This resets the input field for the next letter guess
function clearInput() {
  let getValue = document.getElementById("guess");
  if (getValue.value !== "") {
    getValue.value = "";
  }
}

// This line sets the value of the element with the id "maxWrong" to the value of the maxWrong variable.
document.getElementById("maxWrong").innerHTML = maxWrong;

randomWord();
guessedWord();
