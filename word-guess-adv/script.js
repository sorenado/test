document.addEventListener("DOMContentLoaded", () => {

  easyWords = ["baby", "boy", "sus", "amongus", "imposter", "doctor", "kid", "milk", "honey"];
  normalWords = ["document", "character", "selection", "blackjack", "expedition"];
  hardWords = ["supercalifragilisticexpialidocious", "counterclockwise", "abandonment", "entrepreneurship"];

  let words = ["job", "college",
    "baby", "children", "dog",  "eat", "lynx", "rex", "outline"];
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

  let hangmanBarsMerge;
  let hangmanBars = [];
  let correctWord;
  

  // difficulty check
  let easyDiffCheck = 0;
  let normalDiffCheck = 0;
  let hardDiffCheck = 0;

  easyDiff.addEventListener("click", () => {
    easyDiffCheck = 1;
    normalDiffCheck = 0;
    hardDiffCheck = 0;
    easyDiff.classList.add("clic");
    normalDiff.classList.remove("clic");
    hardDiff.classList.remove("clic");
    console.log("easy selected.");
  });

  normalDiff.addEventListener("click", () => {
    easyDiffCheck = 0;
    normalDiffCheck = 1;
    hardDiffCheck = 0;
    normalDiff.classList.add("clic");
    easyDiff.classList.remove("clic");
    hardDiff.classList.remove("clic");
    console.log("normal selected.");
  });

  hardDiff.addEventListener("click", () => {
    easyDiffCheck = 0;
    normalDiffCheck = 0;
    hardDiffCheck = 1;
    hardDiff.classList.add("clic");
    normalDiff.classList.remove("clic");
    easyDiff.classList.remove("clic");
    console.log("hard selected.");
  });

  okBtn.addEventListener("click", () => {
    
    
    if(easyDiffCheck === 1){
      words = easyWords;
      difficultyScreen.style.display = "none";
      guessingArea.classList.toggle("on");
      console.log("done!");
    } else if (normalDiffCheck === 1){
      words = normalWords;
      difficultyScreen.style.display = "none";
      guessingArea.classList.toggle("on");
      console.log("done!");
    } else if (hardDiffCheck === 1){
      words = hardWords;
      difficultyScreen.style.display = "none";
      console.log("done!");
      guessingArea.classList.toggle("on");
    } else {
      console.log("haven't selected a difficulty");
      let noDiffSelect = document.createElement("p");
      
    }
    correctWord = words[Math.floor(Math.random() * words.length)]; // Random number from 1 to words length
    console.log(correctWord);
    hangmanBars = [];
    hangmanBarsMerge = undefined;
    spaced = undefined;
    guessedWords = [];
    generateHangmanBars(correctWord);
    displayBars();

    guessBox.disabled = false;
    checkButton.disabled = false;

    outputSection.innerHTML = `You have ${guessCount} guesses left.`

    checkButton.addEventListener("click", checkForTrue);
    guessBox.addEventListener("keydown", checkWithEnter);


  });



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
          console.log("Already guessesed");
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
          console.log(hangmanSplit);
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
      const btnForRetry = document.createElement("button");
      btnForRetry.id = "retry";
      outputSection.appendChild(btnForRetry);
      const retryBtn = document.getElementById("retry");
      console.log(retryBtn);
      retryBtn.addEventListener("click", userRestart);


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

      
      outputSection.innerHTML = '<span style="color: green">You Win!</span><br><button id="retry">Retry</button>';
      guessBox.disabled = true;
      const retryBtn = document.getElementById("retry");
      console.log(retryBtn);

      retryBtn.addEventListener("click", userRestart);
      return true;
    }
  }

  // to retry

  function userRestart(){
    console.log("retry");
    guessingArea.classList.toggle("on");
    difficultyScreen.style.display = "flex";
    outputSection.style.fontSize = "16px";
    outputSection.style.color = "white";
    guessCount = 6;
    
  }




  // Starts it up
});
