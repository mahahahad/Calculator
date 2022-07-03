// Menu stuff goes here
import { menu, fab } from "./DOMElements";

fab.onclick = function () {
  menu.classList.toggle("expanded");
};
