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
    if (buttons.indexOf(event.target) === -1) {
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

// Figure out if the current element has an element above it.
function focusAboveItem(columns, array) {
  const item = document.activeElement;
  let itemAbove;
  let i = 0;
  while (i <= columns) {
    itemAbove = "item" + ".previousElementSibling".repeat(i);
    itemAbove = eval(itemAbove);
    if (itemAbove === null) break;
    i++;
  }
  if (itemAbove) {
    activate(itemAbove, array);
  }
}

// Figure out if the current element has an element below it.
function focusBelowItem(columns, array) {
  const item = document.activeElement;
  let itemBelow;
  let i = 0;
  while (i <= columns) {
    itemBelow = "item" + ".nextElementSibling".repeat(i);
    itemBelow = eval(itemBelow);
    if (itemBelow === null) break;
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
