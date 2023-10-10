const menu = document.getElementById("menu");
const menuButton = document.getElementById("topbutton");
menuButton.addEventListener("click", () => {
    menu.style.display = "block";
    menu.classList.toggle("act");
});
