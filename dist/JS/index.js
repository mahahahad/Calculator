let resultActive = document.querySelector(".result__active__text"),
    resultPrevious = document.querySelector(".result__previous__text"),
    numbers = document.querySelectorAll(".calculator__number"),
    multiplyBtn = document.querySelector(".oper-multiply"),
    divideBtn = document.querySelector(".oper-divide"),
    addBtn = document.querySelector(".oper-add"),
    subtractBtn = document.querySelector(".oper-subtract")
    equalBtn = document.querySelector(".oper-equal"),
    ACBtn = document.querySelector(".oper-ac"),
    deleteBtn = document.querySelector(".oper-del"),
    operators = [multiplyBtn, divideBtn, addBtn, subtractBtn];

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
    this.currentNumber = this.currentNumber.toString().slice(0,-1);
  }

  appendNumber(number){
    if(number === "." && this.currentNumber.includes(".")) return;
    this.currentNumber += number.toString();
  }

  operatorPick(operator) {
    if(this.currentNumber === "") return;
    if(this.previousNumber) {
      this.evaluate()
    };
    this.operator = operator;
    this.previousNumber = this.currentNumber + " " + operator;
    this.currentNumber = "";
  }

  evaluate() {

    let result;
    let previousNumber = parseFloat(this.previousNumber),
        currentNumber = parseFloat(this.currentNumber);

    if(isNaN(previousNumber) || isNaN(currentNumber)) return;

    switch (this.operator) {

      case "×":
        result = previousNumber * currentNumber;
        break;

      case "÷":
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
}

operators.forEach((operator) => {
  operator.onclick = function () {
    calculator.operatorPick(operator.value);
    calculator.updateInterface();
  }
});

equalBtn.onclick = function () {
  calculator.evaluate();
  calculator.updateInterface();
}

deleteBtn.onclick = function () {
  calculator.deleteCharacter();
  calculator.updateInterface();
}
