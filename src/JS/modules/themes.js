// FOR WEBPACK
import { darkModeCheckbox, moreBtn, numpad, HTMLElement } from "./DOMElements";
// import {
//   darkModeCheckbox,
//   moreBtn,
//   numpad,
//   HTMLElement,
// } from "./DOMElements.js";

// Initial colours
let hue = 210;
let hueCompliment = ((hue % 360) + 240) % 360;
let saturation = 1;
let lightness = 48;

// 13 Material Design tones
let tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
let toneOffset;
let surfaceTones = [0.05, 0.08, 0.11, 0.12, 0.14];

// Temporary variables to store colours in the loop
let clr_name;
let clr;

// Setting up colour variables
function initializeColourScheme() {
  // Set up primary tones
  tones.forEach((tone) => {
    clr_name = `--Primary${tone}`;

    toneOffset = 10 ** -(tone / 100) * 4;

    if (toneOffset + tone < 90 && tone != 0) tone += parseInt(toneOffset);

    // Easing formula for saturation so a
    // higher lightness gets more saturation
    saturation = parseInt(Math.sin(((tone / 100) * Math.PI) / 2) * 100);

    clr = `hsl(${hue}, ${saturation}%, ${tone}%)`;
    HTMLElement.style.setProperty(clr_name, clr);
  });

  // Set up neutral tones
  tones.forEach((tone) => {
    clr_name = `--Neutral${tone}`;

    toneOffset = 10 ** -(tone / 100) * 4;

    if (toneOffset + tone < 90 && tone != 0) tone += parseInt(toneOffset);

    saturation = parseInt((1 - Math.cos(((tone / 100) * Math.PI) / 2)) * 100);
    // saturation = parseInt((-(Math.cos((Math.PI * tone) / 100) - 1) / 2) * 100);
    // saturation = parseInt((tone / 100) ** 2 * 100);
    // saturation = parseInt(Math.sin(((tone / 100) * Math.PI) / 2) * 100);
    // saturation = parseInt((1 - (1 - tone / 100) * (1 - tone / 100)) * 100);

    clr = `hsl(${hueCompliment}, ${saturation}%, ${tone}%)`;

    HTMLElement.style.setProperty(clr_name, clr);
  });

  // Set up surface tones
  surfaceTones.forEach((tone, index) => {
    clr_name = `--Surface${index + 1}`;
    clr = `hsla(${hue}, ${saturation}%, ${lightness}%, ${tone})`;
    HTMLElement.style.setProperty(clr_name, clr);
  });
}

// call initialize function
initializeColourScheme();

// Swap the respective variable with it's relevant new colour
function toggleDark(
  BG = "var(--Neutral10)",
  ON_BG = "var(--Neutral99)",
  PRIMARY = "var(--Primary80)",
  ON_PRIMARY = "var(--Primary20)",
  PRIMARY_CONTAINER = "var(--Primary30)",
  ON_PRIMARY_CONTAINER = "var(--Primary90)"
) {
  HTMLElement.style.setProperty("color-scheme", "dark");
  HTMLElement.style.setProperty("--background", BG);
  HTMLElement.style.setProperty("--on-background", ON_BG);
  HTMLElement.style.setProperty("--primary", PRIMARY);
  HTMLElement.style.setProperty("--on-primary", ON_PRIMARY);
  HTMLElement.style.setProperty("--primary-container", PRIMARY_CONTAINER);
  HTMLElement.style.setProperty("--on-primary-container", ON_PRIMARY_CONTAINER);
  darkModeCheckbox.checked = true;
}

function toggleLight(
  BG = "var(--Neutral99)",
  ON_BG = "var(--Neutral10)",
  PRIMARY = "var(--Primary40)",
  ON_PRIMARY = "var(--Primary100)",
  PRIMARY_CONTAINER = "var(--Primary90)",
  ON_PRIMARY_CONTAINER = "var(--Primary10)"
) {
  HTMLElement.style.setProperty("color-scheme", "light");
  HTMLElement.style.setProperty("--background", BG);
  HTMLElement.style.setProperty("--on-background", ON_BG);
  HTMLElement.style.setProperty("--primary", PRIMARY);
  HTMLElement.style.setProperty("--on-primary", ON_PRIMARY);
  HTMLElement.style.setProperty("--primary-container", PRIMARY_CONTAINER);
  HTMLElement.style.setProperty("--on-primary-container", ON_PRIMARY_CONTAINER);
  darkModeCheckbox.checked = false;
}

// Check user colour scheme on page load
// and set their colour scheme based on that
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  toggleDark();
} else {
  toggleLight();
}

// if user changes their system color scheme
// in the middle for some reason
window.matchMedia("(prefers-color-scheme: dark)").onchange = function () {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    toggleDark();
  } else {
    toggleLight();
  }
};

// If user toggles dark mode through checkbox
darkModeCheckbox.onclick = function () {
  if (darkModeCheckbox.checked === true) {
    toggleDark();
  } else {
    toggleLight();
  }
};

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
