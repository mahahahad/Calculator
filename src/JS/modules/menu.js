// Menu stuff goes here
import { menu, fab } from "./DOMElements";

document.querySelector(".fab").onclick = function () {
  menu.classList.toggle("expanded");
};
