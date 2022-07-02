import { darkModeCheckbox } from "./DOMElements";

// Add themes here
const themes = [
  {
    name: "Light",
    bg: "#f3e5f5",
    primary: "#ab47bc",
    text: "#4a148c",
    category: "light",
  },
  {
    name: "Dark",
    bg: "#222222",
    primary: "GoldenRod",
    text: "#FFFFFF",
    category: "dark",
  },
];

function toggleDark(
  BG = "#111111",
  PRIMARY = "hsl(312, 35%, 10%)",
  TEXT = "#FFFFFF"
) {
  document.querySelector("html").style.setProperty("color-scheme", "dark");
  document.querySelector("html").style.setProperty("--color-background", BG);
  document.querySelector("html").style.setProperty("--color-primary", PRIMARY);
  document.querySelector("html").style.setProperty("--color-text", TEXT);
}

function toggleLight(
  BG = "#F9F9F9",
  PRIMARY = "hsl(78, 87%, 80%)",
  TEXT = "#000000"
) {
  document.querySelector("html").style.setProperty("color-scheme", "light");
  document.querySelector("html").style.setProperty("--color-background", BG);
  document.querySelector("html").style.setProperty("--color-primary", PRIMARY);
  document.querySelector("html").style.setProperty("--color-text", TEXT);
}

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  toggleDark();
  darkModeCheckbox.checked = true;
} else {
  toggleLight();
  darkModeCheckbox.checked = false;
}

// if user changes their system color scheme
// in the middle for some reason
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
  if (darkModeCheckbox.checked === true) {
    toggleDark("#111", "hsl(312, 35%, 10%)");
  } else {
    toggleLight();
  }
};

toggleLight(themes[0].bg, themes[0].primary, themes[0].text);

export { toggleDark, toggleLight };
