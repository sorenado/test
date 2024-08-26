let numberOfIter;
let numbersDiv = document.getElementsByClassName('numbers');
const userInputWord = window.prompt("Enter a word.");

while (true) {
  numberOfIter = window.prompt("How long?");
  if (!isNaN(parseInt(numberOfIter))) {
    console.log(numberOfIter);
    break;
  }
}

for (let i = 1; i < parseInt(numberOfIter) + 1; i++) {
  if (i % 3 === 0) {
    let word = document.createElement("p");
    word.textContent = userInputWord;
    numbersDiv[0].append(word);
    console.log("1.")
  } else {
    console.log("iteration");
  }
  
}