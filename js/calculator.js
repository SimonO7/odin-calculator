const display = document.querySelector(".display");

let operandOne = 1;
let operation = 1;

let waitingForNewInput = false;
let waitingForSecondOperand = false;

function add(operandOne, operandTwo) {
    return operandOne + operandTwo;
}

function subtract(operandOne, operandTwo) {
    return operandOne - operandTwo;
}

function multiply(operandOne, operandTwo) {
    return operandOne * operandTwo;
}

function divide(operandOne, operandTwo) {
    if(operandTwo === 0) {
        return "BOOM"
    }
    return operandOne / operandTwo;
}

function operate(operandOne, operandTwo, operator) {
    let result;
    switch(operator) {
        case "add":
            result = add(operandOne, operandTwo);
            break;
        case "subtract":
            result = subtract(operandOne, operandTwo);
            break;
        case "multiply":
            result = multiply(operandOne, operandTwo);
            break;
        case "divide":
            result = divide(operandOne, operandTwo);
            break;
    }
    return result;
}

function displayNumber(event) {
    if (waitingForNewInput) {
        display.textContent = event.target.id;
        waitingForNewInput = false;
    }
    else {
        display.textContent += event.target.id;
    }
}

function clearDisplay() {
    display.textContent = "";
    operandOne = 1; 
    operation = 1;
}

function storeNum(event) {
    if (waitingForSecondOperand) {
        operandOne = operate(operandOne, Number(display.textContent), operation);
        operation = event.target.id;
        display.textContent = operandOne;
    }
    else {
        operandOne = Number(display.textContent);
        operation = event.target.id;
        waitingForSecondOperand = true;
    }
    waitingForNewInput = true;
}

function main() {
    const digitsButtons = document.querySelectorAll(".digits");
    const clearButton = document.querySelector("#clearDisplay");
    const operators = document.querySelectorAll(".operators");
    const equalBtn = document.querySelector("#equal");

    digitsButtons.forEach((button) => button.addEventListener("click", displayNumber));
    clearButton.addEventListener("click", clearDisplay);
    operators.forEach((button) => button.addEventListener("click", storeNum));
    equalBtn.addEventListener("click", () => {
        display.textContent = operate(operandOne, Number(display.textContent), operation);
        waitingForNewInput = true;
        waitingForSecondOperand = false;
    });
}

main();