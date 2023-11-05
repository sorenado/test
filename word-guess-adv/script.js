const words = ["sus", "amongus", "imposter"];
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
const checkButton = document.getElementById("check");
const guessBox = document.getElementById("user-guess");
const hangmanContent = document.getElementById("hangman-content");
let correctWord = words[Math.floor(Math.random() * words.length)]; // Random number from 1 to words length 
console.log(correctWord);
let bob;



let spacedWords = [];
// Spaces the words so each individual character can be checked
function seperateWords(words) {
  for (let i = 0; i < words.length; i++) {
    let spaced = words[i].split('');
    spacedWords.push(spaced);

  };
};



let hangmanBars = [];
function generateHangmanBars(word) {
  for(let i = 0; i < words.length;i++){
    hangmanBars[i] = "-";
  }
  bob = hangmanBars.join('');
};


function displayBars() {
  let cont = `<p>${bob}</p>`;
  hangmanContent.innerHTML = cont;
}

function checkForTrue() {
  const userGuess = document.getElementById("user-guess").value;
  if (guessNumber(userGuess) === true) {
    correct.style.display = "block";
    incorrect.style.display = "none";
  } else {
    incorrect.style.display = "block";
    correct.style.display = "none";
    guessBox.value = "";
  }
}

function checkUserRetry() {
  if (guessBox.value !== "" && incorrect.style.display === "block") {
    incorrect.style.display = "none";
  }
}

function checkEnterPress(e) {
  if (e.key === "Enter" && guessBox.value !== "" || guessBox.value !== " ") {
    checkForTrue();
  }
}


// Starts it up
generateHangmanBars(correctWord);
displayBars();

checkButton.addEventListener("click", checkForTrue);
guessBox.addEventListener("keypress", checkUserRetry);
guessBox.addEventListener("keypress", checkEnterPress);

