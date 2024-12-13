document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  let currentInput = "";
  let firstNumber = null;
  let operator = null;
  let secondNumber = null;

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
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  }

  function operate(operator, num1, num2) {
    switch (operator) {
      case "+":
        return add(num1, num2);
      case "-":
        return subtract(num1, num2);
      case "*":
        return multiply(num1, num2);
      case "/":
        return divide(num1, num2);
      default:
        throw new Error("Unsupported operator");
    }
  }

  function updateDisplay(value) {
    display.value += value;
  }

  function handleDigitClick(digit) {
    currentInput += digit;
    updateDisplay(digit);
  }

  document.getElementById("buttons").addEventListener("click", function (e) {
    const value = e.target.innerText;

    if (!isNaN(value)) {
      handleDigitClick(value);
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (firstNumber === null) {
        firstNumber = parseFloat(currentInput);
      } else if (operator) {
        secondNumber = parseFloat(currentInput);
        firstNumber = operate(operator, firstNumber, secondNumber);
      }
      operator = value;
      currentInput = "";
      updateDisplay(" " + operator + " ");
    } else if (value === "=") {
      if (firstNumber !== null && operator !== null && currentInput) {
        secondNumber = parseFloat(currentInput);
        const result = operate(operator, firstNumber, secondNumber);
        display.value = result;
        currentInput = result.toString();
        firstNumber = null;
        operator = null;
      }
    } else if (value === "Clear") {
      display.value = "";
      currentInput = "";
      firstNumber = null;
      operator = null;
      secondNumber = null;
    }
  });
});
