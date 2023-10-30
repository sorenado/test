const words = ["sus", "amongus", "imposter"];
const userGuess = document.getElementById("user-guess").value;
lowerGuess = userGuess.toLowerCase();
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
checkButton = document.getElementById("check");

function guessNumber(){
    for(let i = 0; i < words.length; i++){
        if(lowerGuess === words[i]){
            return true;
            break;
        }
    }
}

function checkForTrue(){
    if(guessNumber()){
        correct.style.display = "block";
        incorrect.style.display = "none";
    }else{
        incorrect.style.display = "block";
        correct.style.display = "none";
    }
}

function checkUserRetry(){
    if(userGuess !=="" && incorrect.style.display === "block"){
        incorrect.style.display = "none";
    }
}

checkButton.addEventListener("click", checkForTrue());
checkUserRetry();
