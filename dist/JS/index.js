import {
  resultActive,
  resultPrevious,
  numbers,
  equalBtn,
  ACBtn,
  deleteBtn,
  operators,
} from "./modules/calculatorVariables.js";

class Calculator {
  constructor(currentNumberElement, previousNumberElement) {
    this.currentNumberElement = currentNumberElement;
    this.previousNumberElement = previousNumberElement;
    this.allClear();
  }

  allClear() {
    this.currentNumber = "";
    this.previousNumber = "";
    this.operator = "";
  }

  deleteCharacter() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentNumber.includes(".")) return;
    this.currentNumber += number.toString();
  }

  operatorPick(operator) {
    if (this.currentNumber === "") return;
    if (this.previousNumber) {
      this.evaluate();
    }
    this.operator = operator;
    this.previousNumber = this.currentNumber + " " + operator;
    this.currentNumber = "";
  }

  evaluate() {
    let result;
    let previousNumber = parseFloat(this.previousNumber),
      currentNumber = parseFloat(this.currentNumber);

    if (isNaN(previousNumber) || isNaN(currentNumber)) return;

    switch (this.operator) {
      case "×":
        result = previousNumber * currentNumber;
        break;

      case "÷":
        if (currentNumber === 0) return;
        result = previousNumber / currentNumber;
        break;

      case "+":
        result = previousNumber + currentNumber;
        break;

      case "-":
        result = previousNumber - currentNumber;
        break;

      default:
        break;
    }

    this.currentNumber = result;
    this.previousNumber = "";
  }

  updateInterface() {
    this.currentNumberElement.innerText = this.currentNumber;
    this.previousNumberElement.innerText = this.previousNumber;
  }
}

let calculator = new Calculator(resultActive, resultPrevious);

numbers.forEach((num) => {
  num.onclick = function () {
    calculator.appendNumber(num.value);
    calculator.updateInterface();
  };
});

ACBtn.onclick = function () {
  calculator.allClear();
  calculator.updateInterface();
};

operators.forEach((operator) => {
  operator.onclick = function () {
    calculator.operatorPick(operator.value);
    calculator.updateInterface();
  };
});

equalBtn.onclick = function () {
  calculator.evaluate();
  calculator.updateInterface();
};

deleteBtn.onclick = function () {
  calculator.deleteCharacter();
  calculator.updateInterface();
};

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "*":
      calculator.operatorPick("×");
      calculator.updateInterface();
      break;
    case "/":
      calculator.operatorPick("÷");
      calculator.updateInterface();
      break;
    case "+":
      calculator.operatorPick("+");
      calculator.updateInterface();
      break;
    case "-":
      calculator.operatorPick("-");
      calculator.updateInterface();
      break;
    case "Enter":
      calculator.evaluate();
      calculator.updateInterface();
      break;
    case "Backspace":
      calculator.deleteCharacter();
      calculator.updateInterface();
      break;
    default:
      if (isNaN(parseInt(e.key)) && e.key != ".") return;
      calculator.appendNumber(e.key);
      calculator.updateInterface();
      break;
  }
});

let moreBtn = document.querySelector(".more"),
  numpad = document.querySelector(".numpad");

// Code from web.dev to help with accessibility
// and focusing on buttons with arrow keys

// Copyright 2018 Google LLC.
// SPDX-License-Identifier: Apache-2.0

// It can be really helpful to have constants for keycodes
// That way when you look at your source in a 3 months you won't
// have to remember what keycode 37 means :)
const KEYCODE = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

const numpadNumbers = document.querySelector(".numbers");
const numpadOperators = document.querySelector(".operators");
numpadNumbers.addEventListener("keydown", onKeyDown(3, numpadNumbers));
numpadOperators.addEventListener("keydown", onKeyDown(2, numpadOperators));
numpadNumbers.addEventListener("click", onClick(numpadNumbers));
numpadOperators.addEventListener("click", onClick(numpadOperators));

function onKeyDown(columns, array) {
  return function (event) {
    switch (event.keyCode) {
      case KEYCODE.RIGHT:
        event.preventDefault();
        focusNextItem(array);
        break;
      case KEYCODE.LEFT:
        event.preventDefault();
        focusPreviousItem(array);
        break;
      case KEYCODE.UP:
        event.preventDefault();
        focusAboveItem(columns, array);
        break;
      case KEYCODE.DOWN:
        event.preventDefault();
        focusBelowItem(columns, array);
        break;
    }
  };
}

function onClick(array) {
  // Make sure the clicked item is one of the buttons and
  // not something random :)
  return function (event) {
    const buttons = Array.from(array.querySelectorAll("button"));
    if (buttons.indexOf(event.target) == -1) {
      return;
    }
    activate(event.target, array);
  };
}

// Figure out if the current element has a next sibling.
// If so, moving focus to it.
function focusNextItem(array) {
  const item = document.activeElement;
  if (item.nextElementSibling) {
    activate(item.nextElementSibling, array);
  }
}

// Figure out if the current element has a previous sibling.
// If so, moving focus to it.
function focusPreviousItem(array) {
  const item = document.activeElement;
  if (item.previousElementSibling) {
    activate(item.previousElementSibling, array);
  }
}

function focusAboveItem(columns, array) {
  const item = document.activeElement;
  let itemAbove;
  let i = 0;
  while (i <= columns) {
    itemAbove = "item" + ".previousElementSibling".repeat(i);
    itemAbove = eval(itemAbove);
    if (itemAbove == null) break;
    i++;
  }
  if (itemAbove) {
    activate(itemAbove, array);
  }
}

function focusBelowItem(columns, array) {
  const item = document.activeElement;
  let itemBelow;
  let i = 0;
  while (i <= columns) {
    itemBelow = "item" + ".nextElementSibling".repeat(i);
    itemBelow = eval(itemBelow);
    if (itemBelow == null) break;
    i++;
  }
  if (itemBelow) {
    activate(itemBelow, array);
  }
}

// This is where the roving tabindex magic happens!
function activate(item, array) {
  // Set all of the buttons to tabindex -1
  array.querySelectorAll("button").forEach((btn) => (btn.tabIndex = -1));

  // Make the current button "active"
  item.tabIndex = 0;
  item.focus();
}
function toggleDark() {
  document.querySelector("html").style.setProperty("color-scheme", "dark");
  document
    .querySelector("html")
    .style.setProperty("--color-background", "#111111");
  document
    .querySelector("html")
    .style.setProperty("--color-primary", "hsl(312, 55%, 20%)");
  document
    .querySelector("html")
    .style.setProperty("--color-primary--transparent", "hsl(312, 35%, 10%)");
}
function toggleLight() {
  document.querySelector("html").style.setProperty("color-scheme", "light");
  document
    .querySelector("html")
    .style.setProperty("--color-background", "#fcfcfc");
  document
    .querySelector("html")
    .style.setProperty("--color-primary", "hsl(78, 67%, 60%)");
  document
    .querySelector("html")
    .style.setProperty("--color-primary--transparent", "hsl(78, 87%, 80%)");
}
// Light mode is done, Add dark mode through
// preferably in another file for better understanding
let darkModeCheckbox = document.querySelector("#isDarkMode");

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
    toggleDark();
  } else {
    toggleLight();
  }
};

moreBtn.addEventListener("click", function () {
  moreBtn.classList.toggle("expanded");
  numpad.classList.toggle("condensed");
  moreBtn.classList.contains("expanded")
    ? darkModeCheckbox.setAttribute("tabIndex", "0")
    : darkModeCheckbox.setAttribute("tabIndex", "-1");
});
// moreBtn.onclick = function () {
//   moreBtn.classList.toggle("expanded");
//   numpad.classList.toggle("condensed");
// };

moreBtn.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // e.preventDefault();
    moreBtn.click();
  }
});
