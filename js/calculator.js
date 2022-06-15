const display = document.querySelector(".display");

let operandOne = 0;
let operation = 0;

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
    operandOne = 0; 
    operation = 0;
}

function storeNum(event) {
    if (waitingForSecondOperand) {
        operandOne = operate(operandOne, Number(display.textContent), operation);
        display.textContent = operandOne;
        //If equal sign is pressed, don't need to store the operation. It means compute done.
        if (event.target.id === "equal") {
            waitingForSecondOperand = false;
        }
        else {
            operation = event.target.id;
        }
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

    digitsButtons.forEach((button) => button.addEventListener("click", displayNumber));
    clearButton.addEventListener("click", clearDisplay);
    operators.forEach((button) => button.addEventListener("click", storeNum));
}

main();