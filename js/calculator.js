const display = document.querySelector(".display");

display.textContent = "0";
let operandOne = 1;
let operation = "none";

let waitingForNewInput = true;
let waitingForOperandTwo = false;
let decimalAvailable = true;
let digitsEntered = false;

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
        case "none":
            result = operandTwo;
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
    digitsEntered = true;
}

function clearCurrentEntry() {
    display.textContent = "0";
    waitingForNewInput = true;
}

function clearAll() {
    display.textContent = "0";
    operandOne = 0; 
    operation = "none";
    decimalAvailable = true;
    waitingForNewInput = true;
    waitingForOperandTwo = false;
    digitsEntered = false;
}

function storeNum(event) {
    if (waitingForOperandTwo && digitsEntered) {
        operandOne = operate(operandOne, Number(display.textContent), operation);
        display.textContent = operandOne;
        operation = event.target.id;
    }
    else {
        operandOne = Number(display.textContent);
        operation = event.target.id;
        waitingForOperandTwo = true;
    }
    waitingForNewInput = true;
    //Activate decimal again
    decimalAvailable = true;
    digitsEntered = false;
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

function equalSignCompute() {
    if (digitsEntered) {
        display.textContent = operate(operandOne, Number(display.textContent), operation);
        waitingForOperandTwo = false;
        waitingForNewInput = true;
        decimalAvailable = true;
        digitsEntered = false;
        operation = "none";
    }  
}

function main() {
    const digitsBtns = document.querySelectorAll(".digits");
    const clearAllBtn = document.querySelector("#clearAll");
    const operators = document.querySelectorAll(".operators");
    const decimalBtn = document.querySelector(".decimal")
    const equalBtn = document.querySelector("#equal")
    const clearEntryBtn = document.querySelector("#clearEntry");

    digitsBtns.forEach((button) => button.addEventListener("click", displayNumber));
    clearAllBtn.addEventListener("click", clearAll);
    operators.forEach((button) => button.addEventListener("click", storeNum));
    decimalBtn.addEventListener("click", addDecimal);
    equalBtn.addEventListener("click", equalSignCompute);
    clearEntryBtn.addEventListener("click", clearCurrentEntry);
}

main();