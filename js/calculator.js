const display = document.querySelector(".display");

let operandOne = 0;
let operandTwo = 0; 
let operation = 0;

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
    display.textContent += event.target.id;
}

function clearDisplay() {
    display.textContent = "";
}

function main() {
    const digitsButtons = document.querySelectorAll(".digits");
    const clearButton = document.querySelector("#clearDisplay");
    const operators = document.querySelectorAll(".operators");

    digitsButtons.forEach((button) => button.addEventListener("click", displayNumber));
    clearButton.addEventListener("click", clearDisplay);
    operators.forEach((button) => button.addEventListener("click", operateNum));
}

main();