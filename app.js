



const displayNumber = document.querySelector("h1");
const buttons = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");
// ======== global var =========
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;
// ========== logic =============
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

// ========== function for showing the number ==========
function sendNumberValue(number) {
  if (awaitingNextValue) {
    displayNumber.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = displayNumber.textContent;
    displayNumber.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}
// ============== function for adding decimal ==========
function addDecimal() {
  if (awaitingNextValue) return;
  if (!displayNumber.textContent.includes(".")) {
    displayNumber.textContent = `${displayNumber.textContent}.`;
  }
}
// ============ function for using operator ===========
function useOperator(operator) {
  const currentValue = Number(displayNumber.textContent);
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    firstValue = calculation;
    displayNumber.textContent = calculation;
  }

  awaitingNextValue = true;
  operatorValue = operator;
}
buttons.forEach((button) => {
  if (button.classList.length === 0) {
    button.addEventListener("click", () => sendNumberValue(button.value));
  } else if (button.classList.contains("operator")) {
    button.addEventListener("click", () => useOperator(button.value));
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", () => addDecimal());
  }
});
// =============== eventlistener for clear all ============
clearBtn.addEventListener("click", () => {
  displayNumber.textContent = 0;
});
