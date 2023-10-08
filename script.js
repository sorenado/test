const countingDown = () => {
    document.getElementById("countdown").style.display("block");
    let count = document.getElementByID("countdown").innerHTML;
    count -= count;
}