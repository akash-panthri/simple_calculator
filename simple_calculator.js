class Calculator {
  constructor(previousoperandTextElement, currentoperandTextElement) {
    this.previousoperandTextElement = previousoperandTextElement;
    this.currentoperandTextElement = currentoperandTextElement;
    this.clear();
  }
  clear() {
    this.currentoperand = "";
    this.previousoperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentoperand = this.currentoperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentoperand.includes(".")) return;
    this.currentoperand = this.currentoperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentoperand === "") return;
    if (this.currentoperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousoperand = this.currentoperand;
    this.currentoperand = "";
  }
  compute() {
    let computaion;
    const prev = parseFloat(this.previousoperand);
    const current = parseFloat(this.currentoperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computaion = prev + current;
        break;
      case "-":
        computaion = prev - current;
        break;
      case "*":
        computaion = prev * current;
        break;
      case "/":
        computaion = prev / current;
        break;

      default:
        return;
    }
    this.currentoperand = computaion;
    this.operation = undefined;
    this.previousoperand = "";
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
        integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }
if(decimalDigits !== (null || undefined)){
    return `${integerDisplay}.${decimalDigits}`
}else{

   return integerDisplay
}
  
  }
  updateDisplay() {
    this.currentoperandTextElement.innerText = this.getDisplayNumber(this.currentoperand);
    if (this.operation != null) {
      this.previousoperandTextElement.innerText = `${this.getDisplayNumber(this.previousoperand)} ${this.operation}`;
    } else {
      this.previousoperandTextElement.innerText = "";
    }
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");

const deleteButton = document.querySelector("[data-delete]");
const allclearButton = document.querySelector("[data-all-clear]");
const previousoperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentoperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousoperandTextElement,
  currentoperandTextElement
);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
  
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
allclearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
