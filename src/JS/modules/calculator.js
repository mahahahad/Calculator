// Contains main calculator logic

// Seperate file containing all the variables to be organized
import {
  resultActive,
  resultPrevious,
  numbers,
  equalBtn,
  ACBtn,
  deleteBtn,
  operators,
} from "./calculatorVariables";

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

// map buttons to their functions
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

// this makes it possible to type numbers through keyboard
// directly to the calculator
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
