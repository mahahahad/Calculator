import { darkModeCheckbox } from "./DOMElements.js";

function toggleDark(BG = "#111111", PRIMARY = "hsl(312, 35%, 10%)") {
  document.querySelector("html").style.setProperty("color-scheme", "dark");
  document.querySelector("html").style.setProperty("--color-background", BG);
  document.querySelector("html").style.setProperty("--color-primary", PRIMARY);
}

function toggleLight(BG = "#f9f9f9", PRIMARY = "hsl(78, 87%, 80%)") {
  document.querySelector("html").style.setProperty("color-scheme", "light");
  document.querySelector("html").style.setProperty("--color-background", BG);
  document.querySelector("html").style.setProperty("--color-primary", PRIMARY);
}

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  toggleDark();
  darkModeCheckbox.checked = true;
} else {
  toggleLight();
  darkModeCheckbox.checked = false;
}

// if user changes their system color scheme in the middle for some reason
window.matchMedia("(prefers-color-scheme: dark)").onchange = function () {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    toggleDark();
    darkModeCheckbox.checked = true;
  } else {
    toggleLight();
    darkModeCheckbox.checked = false;
  }
};

darkModeCheckbox.onclick = function () {
  if (darkModeCheckbox.checked == true) {
    toggleDark("#111", "hsl(312, 35%, 10%)");
  } else {
    toggleLight();
  }
};

export { toggleDark, toggleLight };
