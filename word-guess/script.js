const words = ["sus", "amongus", "imposter"];
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
const checkButton = document.getElementById("check");
const guessBox = document.getElementById("user-guess");

function guessNumber(userGuess){
    const lowerGuess = userGuess.toLowerCase();
    for(let i = 0; i < words.length; i++){
        if(lowerGuess === words[i]){
            return true;
            break;
        }
    }
}

function checkForTrue(){
    const userGuess = document.getElementById("user-guess").value;
    if(guessNumber(userGuess) === true){
        correct.style.display = "block";
        incorrect.style.display = "none";
    }else{
        incorrect.style.display = "block";
        correct.style.display = "none";
        guessBox.value = "";
    }
}

function checkUserRetry(){
    if(guessBox.value !=="" && incorrect.style.display === "block"){
        incorrect.style.display = "none";
    }
}

function checkEnterPress(e){
    if(e.key === "Enter" && guessBox.value === "" || guessBox.value === " "){
        checkForTrue();
    }
}
checkButton.addEventListener("click", checkForTrue);
guessBox.addEventListener("keypress", checkUserRetry);
guessBox.addEventListener("keypress", checkEnterPress);

