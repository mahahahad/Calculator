import { darkModeCheckbox, moreBtn, numpad, HTMLElement } from "./DOMElements";

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
  HTMLElement.style.setProperty("color-scheme", "dark");
  HTMLElement.style.setProperty("--color-background", BG);
  HTMLElement.style.setProperty("--color-primary", PRIMARY);
  HTMLElement.style.setProperty("--color-text", TEXT);
  darkModeCheckbox.checked = true;
}

function toggleLight(
  BG = "#F9F9F9",
  PRIMARY = "hsl(78, 87%, 80%)",
  TEXT = "#000000"
) {
  HTMLElement.style.setProperty("color-scheme", "light");
  HTMLElement.style.setProperty("--color-background", BG);
  HTMLElement.style.setProperty("--color-primary", PRIMARY);
  HTMLElement.style.setProperty("--color-text", TEXT);
  darkModeCheckbox.checked = false;
}

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

darkModeCheckbox.onclick = function () {
  if (darkModeCheckbox.checked === true) {
    toggleDark("#111", "hsl(312, 35%, 10%)");
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
