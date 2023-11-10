const words = ["sus", "amongus", "imposter", "doctor", "kid", "milk", "honey", "job", "college",
  "baby", "children", "dog"];
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
const checkButton = document.getElementById("check");
const guessBox = document.getElementById("user-guess");
const hangmanContent = document.getElementById("hangman-content");
let correctWord = words[Math.floor(Math.random() * words.length)]; // Random number from 1 to words length 
console.log(correctWord);
let guessCount = 6;
let errorForUser = `<span style="color: red;"> You've already guessed that.</span>`
const outputSection = document.getElementById("input-to-user");
console.log(outputSection);




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
      if (seperateWords(correctWord)[i] === userGuess) {
        if(hangmanSplit.includes(userGuess)){
          outputSection.innerHTML = errorForUser + `<br>
          You have ${guessCount} guesses left.`;
          errorForUser.style.transition = "1s";
          errorForUser.style.opacity = "0";

        }else{
          hangmanSplit[i] = userGuess;
          outputSection.innerHTML = `You have ${guessCount} guesses left.`
        }
        
      }
    }


    console.log(hangmanSplit);
    hangmanContent.innerHTML = hangmanSplit.join('');
    hangmanBarsMerge = hangmanSplit.join(''); // to allow for repetition.
    guessBox.value = "";
    checkForWin(hangmanSplit);
    if (checkForWin(hangmanSplit) === true) {
      return;
    }

  } else {
    guessCount = guessCount - 1;
    outputSection.innerHTML = `<span style="color: red;"> Incorrect.</span> <br>
    You have ${guessCount} guesses left.`
    checkCounts();
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
    return true;
  }
}


// Starts it up
generateHangmanBars(correctWord);
displayBars();

outputSection.innerHTML = `You have ${guessCount} guesses left.`

checkButton.addEventListener("click", checkForTrue);
guessBox.addEventListener("keydown", checkWithEnter);
