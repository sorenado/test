const words = ["sus", "amongus", "imposter"];
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
const checkButton = document.getElementById("check");
const guessBox = document.getElementById("user-guess");
const hangmanContent = document.getElementById("hangman-content");
let correctWord = words[Math.floor(Math.random() * words.length)]; // Random number from 1 to words length 
console.log(correctWord);
let guessCount = 6;
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
  const userGuess = document.getElementById("user-guess").value;
  console.log("working!");
  if (correctWord.includes(userGuess) && userGuess !== "") {
    console.log("it is true.");
    let hangmanSplit = hangmanBarsMerge.split("");
    console.log(hangmanSplit);
    for(let i = 0; i < correctWord.length; i++){
      if(seperateWords(correctWord)[i] === userGuess){
        hangmanSplit[i] = userGuess;
      }
    }
    
 
    console.log(hangmanSplit);
    hangmanContent.innerHTML = hangmanSplit.join('');
    hangmanBarsMerge = hangmanSplit.join('');

  } else {
    guessCount = guessCount - 1;
    outputSection.innerHTML = `You have ${guessCount} guesses left.`
    checkCounts();
  }



}

function checkCounts(){
  console.log("checking");
  if(guessCount === 0){
    guessBox.disabled = true;
    console.log("uh oh");
    outputSection.classList.add("incorrect");
    checkButton.disabled = true;
  }
}

function checkUserRetry() {
  if (guessBox.value !== "") {
  }
}


// Starts it up
generateHangmanBars(correctWord);
displayBars();

checkButton.addEventListener("click", checkForTrue);