const display = document.querySelector(".display");

display.textContent = "0";
let operandOne = 0;
let operation = 0;

let waitingForNewInput = true;
let waitingForSecondOperand = false;
let decimalAvailable = true;

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
    //If waiting for new input, clear display and show digits instead of appending to old string
    if (waitingForNewInput) {
        display.textContent = event.target.id;
        waitingForNewInput = false;
    }
    else {
        display.textContent += event.target.id;
    }
}

function clearDisplay() {
    display.textContent = "0";
    operandOne = 0; 
    operation = 0;
    decimalAvailable = true;
    waitingForNewInput = true;
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
    //Activate decimal again
    decimalAvailable = true;
}

function addDecimal() {
    //check if decimal btn is active for current operand.
    //if so, add decimal to current display string.
    if (decimalAvailable && waitingForNewInput) {
        display.textContent = "."
        waitingForNewInput = false;
    }
    else if (decimalAvailable) {
        display.textContent += "."
    }
    decimalAvailable = false;
}

function main() {
    const digitsButtons = document.querySelectorAll(".digits");
    const clearButton = document.querySelector("#clearDisplay");
    const operators = document.querySelectorAll(".operators");
    const decimalBtn = document.querySelector(".decimal")

    digitsButtons.forEach((button) => button.addEventListener("click", displayNumber));
    clearButton.addEventListener("click", clearDisplay);
    operators.forEach((button) => button.addEventListener("click", storeNum));
    decimalBtn.addEventListener("click", addDecimal);
}

main();