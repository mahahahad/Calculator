import {
  expressions,
  LWBs,
  UPBs,
  addToExps,
  addToLWBs,
  addToUPBs,
} from "./piecewise.js";

import { getLimit } from "./limit.js";

let functionOverlayWrapper = document.querySelector(
  ".function-overlay-wrapper"
);
let functionOverlay = document.querySelector(".function-overlay");
let userFunction = document.querySelector("#userFunction");
let lowerBound = document.querySelector("#lowerBound");
let upperBound = document.querySelector("#upperBound");
let functionCloseBtn = document.querySelector(".function-overlay__close");

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
