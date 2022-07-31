import {
  expressions,
  LWBs,
  UPBs,
  addToExps,
  addToLWBs,
  addToUPBs,
} from "./piecewise.js";

import { getLimit } from "./limit.js";

// import { customElements } from "./functionElements.js";

import "./functionElements.js";

console.log(customElements);

let functionOverlayWrapper = document.querySelector(
  ".function-overlay-wrapper"
);
let functionOverlay = document.querySelector(".function-overlay");
let userFunction = document.querySelector("#userFunction");
let lowerBound = document.querySelector("#lowerBound");
let upperBound = document.querySelector("#upperBound");
let functionCloseBtn = document.querySelector(".function-overlay__close");

let userFunctions = document.querySelector(".user-functions");

function newExpression(HTMLElement) {
  HTMLElement.innerHTML += `
  <div class="function">
  <div class="function__expression user-input">
  <label for="userFunction">Expression</label>
  <input type="text" id="userFunction" placeholder="x**2" />
  </div>
  <span class="for">for</span>
  <div class="function__lower-bound user-input">
  <label for="lowerBound">Lower Bound</label>
  <input type="number" id="lowerBound" placeholder="2" />
  </div>
  <span class="interval-text">
  &#60;= <span class="math">x</span> &#60;</span
  >
  <div class="function__upper-bound user-input">
  <label for="upperBound">Upper Bound</label>
  <input type="number" id="upperBound" placeholder="4" />
  </div>
  </div>
  `;
}

// Initialize dialogue
newExpression(userFunctions);

let newExpressionButton = document.querySelector("#newExpression");

newExpressionButton.addEventListener("click", () => {
  newExpression(userFunctions);
});

function showFunctionInputOverlay() {
  functionOverlayWrapper.classList.toggle("hidden");
  setTimeout(() => {
    functionOverlay.style.opacity = "1";
    functionOverlay.style.transform = "initial";
  }, 50);
}
function hideFunctionInputOverlay() {
  functionOverlay.style.opacity = "0";
  functionOverlay.style.transform = "translateY(5px)";
  setTimeout(() => {
    functionOverlayWrapper.classList.toggle("hidden");
  }, 250);
}
functionCloseBtn.addEventListener("click", () => {
  hideFunctionInputOverlay();
});
document.querySelector("#lim").addEventListener("click", () => {
  if (expressions.length == 0) {
    showFunctionInputOverlay();
  } else {
    // In the future, replace this with append limit symbol to display
    window.open("#limit", "_self");
  }
});
document.querySelector("#saveFunction").addEventListener("click", () => {
  if (userFunction.value == "") {
    return;
  }
  addToExps(userFunction.value);
  addToLWBs(parseFloat(lowerBound.value));
  addToUPBs(parseFloat(upperBound.value));

  window.open("#limit", "_self");
  hideFunctionInputOverlay();
});

document.querySelector("#calculateLimit").addEventListener("click", () => {
  let userLimitValue = document.querySelector("#userLimitValue");
  console.log(getLimit(expressions, UPBs, LWBs, userLimitValue.value));
});
