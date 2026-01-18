import "../scss/style.scss";

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close");

burger.addEventListener("click", () => {
  menu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  menu.classList.remove("active");
});
