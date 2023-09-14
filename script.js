let firstNum = "";
let secondNum = "";
let resetScreen = false;
let currentOperation = null;

const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const equalBtn = document.getElementById("eqlsBtn");
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.getElementById("deleteBtn");
const calcScreen = document.getElementById("calcScreen");

numberBtns.forEach((button) =>
  button.addEventListener("click", () => appendNum(button.textContent))
);
operatorBtns.forEach((button) =>
  button.addEventListener("click", () => chooseOperation(button.textContent))
);
clearBtn.addEventListener("click", clearFunc);
deleteBtn.addEventListener("click", deleteFunc);
equalBtn.addEventListener("click", evaluate);

function clearFunc() {
  calcScreen.textContent = "0";
  firstNum = '';
  secondNum = '';
  currentOperation = null;
  resetScreen = false;
}

function resetScreenFunc() {
  calcScreen.textContent = '';
  resetScreen = false;
}

function chooseOperation(operator) {
  firstNum = calcScreen.textContent; 
  currentOperation = operator;
  resetScreen = true;
}

function deleteFunc() {
    calcScreen.textContent = calcScreen.textContent.toString().slice(0, -1);
}

function appendNum(number) {
  if (calcScreen.textContent === '0' || resetScreen) {
    resetScreenFunc();
  }
  if (calcScreen.textContent.length < 8) {
    calcScreen.textContent += number;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function roundNum(num) {
  return Math.round(num * 100) / 100;
}

function evaluate() {
  secondNum = calcScreen.textContent;
  var ans = roundNum(operate(currentOperation, firstNum, secondNum));
  if (ans.toString().length > 8) {
    ans = ans.toExponential(2);
  }
  calcScreen.textContent = ans;
  currentOperation = null;
  resetScreen = true;
}

function operate(sign, a, b) {
  a = Number(a);
  b = Number(b);
  if (sign === '*') {
    sign = 'x';
  } else if (sign === '/') {
    sign = '÷';
  }
  switch (sign) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b === 0) {
        return "null";
      } else {
        return divide(a, b);
      }
    default:
      return "s";
  }
}
