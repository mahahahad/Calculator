import { darkModeCheckbox, moreBtn, numpad } from "./modules/DOMElements";
import "./modules/calculator";
import "./modules/themes";
import "./modules/tabRoving";

moreBtn.addEventListener("click", function () {
  moreBtn.classList.toggle("expanded");
  numpad.classList.toggle("condensed");
  if (moreBtn.classList.contains("expanded")) {
    darkModeCheckbox.setAttribute("tabIndex", "0");
    document.querySelector(".more__chevron-up").style.transform =
      "rotate(180deg)";
  } else {
    // If checkbox is not in focus range, then don't make it accessible through keyboard
    darkModeCheckbox.setAttribute("tabIndex", "-1");
    document.querySelector(".more__chevron-up").style.transform =
      "rotate(0deg)";
  }
});

moreBtn.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    moreBtn.click();
  }
});
