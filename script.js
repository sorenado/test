document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const menuButton = document.getElementById("topbutton");
    

    menuButton.addEventListener("click", () => {
        menu.classList.toggle("act");
        menu.style.display = "block";
    });
    

});