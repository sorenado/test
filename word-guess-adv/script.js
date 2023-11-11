const words = ["sus", "amongus", "imposter", "doctor", "kid", "milk", "honey", "job", "college",
  "baby", "children", "dog", "supercalifragilisticexpialidocious", "counterclockwise", "eat", "lynx", "rex", "document", "character", "selection", "outline"];

// collecting objects from HTML
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
const checkButton = document.getElementById("check");
const guessBox = document.getElementById("user-guess");
const hangmanContent = document.getElementById("hangman-content");
const guessingArea = document.getElementById("guessing");
const difficultyScreen = document.getElementById("options-wrapper");
const easyDiff = document.getElementById("easy");
const normalDiff = document.getElementById("normal");
const hardDiff = document.getElementById("hard");
const okBtn = document.getElementById("btn-ok");

let correctWord = words[Math.floor(Math.random() * words.length)]; // Random number from 1 to words length 

// difficulty check
let easyDiffCheck = 0;
let normalDiffCheck = 0;
let hardDiffCheck = 0;

easyDiff.addEventListener("click", () => {
  easyDiffCheck = 1;
  normalDiffCheck = 0;
  hardDiffCheck = 0;
  console.log("easy selected.");
});

normalDiff.addEventListener("click", () => {
  easyDiffCheck = 0;
  normalDiffCheck = 1;
  hardDiffCheck = 0;
  console.log("normal selected.");
});

hardDiff.addEventListener("click", () => {
  easyDiffCheck = 0;
  normalDiffCheck = 0;
  hardDiffCheck = 1;
  console.log("hard selected.");
});

okBtn.addEventListener("click", () => {
  difficultyScreen.style.display = "none";
  console.log("done!");
  guessingArea.classList.toggle("on");
});

//

console.log(correctWord);
let guessCount = 6;
const outputSection = document.getElementById("input-to-user");
console.log(outputSection);
let guessedWords = [];
let errorForUser = document.createElement("p");




let spaced;
// Spaces the word so each individual character can be checked
function seperateWords(words) {
  spaced = words.split('');
  return spaced;
};


let hangmanBarsMerge;
let hangmanBars = [];
function generateHangmanBars(word) {
  for (let i = 0; i < word.length; i++) {
    hangmanBars[i] = "-";
  }
  hangmanBarsMerge = hangmanBars.join('');
};


function displayBars() {
  let cont = `<p>${hangmanBarsMerge}</p>`;
  hangmanContent.innerHTML = cont;
}

function checkForTrue() {
  const userGuess = document.getElementById("user-guess").value.toLowerCase();
  console.log("working!");
  if (correctWord.includes(userGuess) && userGuess !== "") {
    console.log("it is true.");

    let hangmanSplit = hangmanBarsMerge.split(""); // allows for iteration
    console.log(hangmanSplit);
    for (let i = 0; i < correctWord.length; i++) {
      if (seperateWords(correctWord)[i] === userGuess && guessedWords.includes(userGuess)) {
        errorForUser.style.opacity = "100%";
        errorForUser.textContent = "You've already guessed that.";
        errorForUser.style.color = "red";
        errorForUser.style.padding = "0";
        errorForUser.style.marginBottom = "6px";
        errorForUser.style.marginTop = "1px";
        errorForUser.style.display = "none";
        outputSection.innerHTML = `You have ${guessCount} guesses left.`;
        guessBox.value = "";
        outputSection.insertBefore(errorForUser, outputSection.firstChild);
        return;
      } else if (seperateWords(correctWord)[i] === userGuess) {
        errorForUser.style.opacity = "0%";
        hangmanSplit[i] = userGuess;
        guessBox.value = "";
      } else {
        continue;
      }
    }

    console.log(hangmanSplit);
    hangmanContent.innerHTML = hangmanSplit.join('');
    hangmanBarsMerge = hangmanSplit.join(''); // to allow for repetition.
    guessedWords.push(userGuess);
    console.log(guessedWords);
    guessBox.value = "";
    checkForWin(hangmanSplit);
    if (checkForWin(hangmanSplit) === true) {
      return;
    }

  } else {
    guessCount = guessCount - 1;
    outputSection.innerHTML = `<span style="color: red;"> Incorrect.</span> <br>
    You have ${guessCount} guesses left.`;
    checkCounts();
    guessedWords.push(userGuess.value);
    guessBox.value = "";
  }



}

async function checkCounts() {
  console.log("checking");
  if (guessCount === 0) {
    guessBox.disabled = true;
    console.log("uh oh");
    outputSection.classList.add("incorrect");
    checkButton.disabled = true;
    await sleep(4000); // adds transition; pauses console.
    outputSection.style.transition = "none";
    outputSection.style.fontSize = "40px"; // game over text
    console.log("2 sec pas");
    outputSection.innerHTML = "Game Over";
    outputSection.style.color = "red";
    outputSection.style.transition = "opacity 4s";
    outputSection.classList.toggle("incorrect");
    const revealedAnswer = document.createElement("p");
    revealedAnswer.textContent = `The word was ${correctWord}.`;
    revealedAnswer.style.color = "white";
    revealedAnswer.style.fontSize = "20px";
    outputSection.appendChild(revealedAnswer);


  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function checkWithEnter(e) {
  if (e.key === "Enter" && guessBox.value !== "") {
    checkForTrue();
  }
}

function checkForWin(array) {
  if (!array.includes("-")) {
    console.log("Complete!");
    outputSection.innerHTML = '<span style="color: green">You Win!</span>';
    guessBox.disabled = true;
    return true;
  }
}


// Starts it up
generateHangmanBars(correctWord);
displayBars();

outputSection.innerHTML = `You have ${guessCount} guesses left.`

checkButton.addEventListener("click", checkForTrue);
guessBox.addEventListener("keydown", checkWithEnter);
