const displayCalculator = document.querySelector("h1");
const buttons = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");
const deleteBtn = document.getElementById("delete");
const toggleBtn = document.querySelector("input");
const toggleIcon = document.querySelector("i");
// ========= global var ========
let firstValue = 0;
let awaitingNextValue = false;
let operatorValue = "";

// ========= logic ===========
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};
// ================ function for showing the numbers ===========
function sendNumberValue(number) {
  if (awaitingNextValue) {
    displayCalculator.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = displayCalculator.textContent;
    displayCalculator.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

// ============ function for adding decimal ============
function addDecimal() {
  if (awaitingNextValue) {
    return;
  }
  if (!displayCalculator.textContent.includes(".")) {
    displayCalculator.textContent = `${displayCalculator.textContent}.`;
  }
}

// ============= function for using operator ==========
function useOperator(operator) {
  const currentValue = Number(displayCalculator.textContent);
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    displayCalculator.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}
// ====== function for backspace ===========
function backSpace() {
  const displayValue = displayCalculator.textContent;
  if (displayValue.length === 1) {
    displayCalculator.textContent = "0";
  } else {
    displayCalculator.textContent = displayValue.slice(0, -1);
  }
}
// ============== function for switching the theme ==========
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    toggleIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "light");
  }
}
// ======== localStorage section =============
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleBtn.checked = true;
    toggleIcon.classList.replace("fa-sun", "fa-moon");
  }
}
// ========== eventListener section ===============
buttons.forEach((button) => {
  if (
    !button.classList.contains("operator") &&
    !button.classList.contains("decimal")
  ) {
    button.addEventListener("click", () => sendNumberValue(button.value));
  } else if (button.classList.contains("operator")) {
    button.addEventListener("click", () => useOperator(button.value));
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", () => addDecimal());
  }
});

// ============ eventListener for clear btn ===========
clearBtn.addEventListener("click", () => {
  firstValue = 0;
  awaitingNextValue = false;
  operatorValue = "";
  displayCalculator.textContent = "0";
});

// ============eventListener for  keys section ==============
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key >= "0" && key <= "9") {
    sendNumberValue(key);
  }
  if (key === "+" || key === "-" || key === "*" || key === "/") {
    useOperator(key);
  }
  if (key === ".") {
    addDecimal();
  }
  if (key === "=" || key === "Enter") {
    useOperator("=");
  }
  if (key === "Escape") {
    clearBtn.click();
  }
  if (key === "Backspace") {
    backSpace();
  }
});

// ========== eventListener for deleteBtn =======
deleteBtn.addEventListener("click", backSpace);
// ======== eventListener for toggleBtn =======
toggleBtn.addEventListener("change", switchTheme);
