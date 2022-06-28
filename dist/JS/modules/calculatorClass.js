export class Calculator {
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
