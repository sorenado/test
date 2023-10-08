let setTimer;
const actualCount = document.getElementById("countdown");
let count = 1;
function startTim(){
  /*when button pressed, check if timer is running*/
  if(!setTimer){
    count = parseInt(document.getElementById("countN").value.trim());
    if(count > 0){
      actualCount.innerHTML = count;
      actualCount.style.display = "block";
      if(!isNaN(count)){
        setTimer = setInterval(countingDown, 1000);
      }
    }
  }
  
}

function countingDown(){
  count -= 1;
  actualCount.innerHTML = count;
  
  if(count === 0){
      clearInterval(setTimer);
      setTimer = null;
      count = 10;
    }
}
