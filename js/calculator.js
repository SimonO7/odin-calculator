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
    }
    return result;
}

function displayNumber(event) {
    //If waiting for new input, clear display and show digits instead of appending to old string
    if (waitingForNewInput || display.textContent === "0") {
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
}

function clearFlags() {
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
    //When equal sign is pressed, check if it's waiting for operand two or not, as well as if a new digit
    //has been entered. If so, calculate and display result, then reset the flags.
    if (waitingForOperandTwo && digitsEntered) {
        display.textContent = operate(operandOne, Number(display.textContent), operation);
        clearFlags();
    }  
}

function toggleNegativeSign() {
    //Toggle the negative sign.
    //If number is already negative, remove the negative symbol
    //If number is postive, add negative symbol.
    if (Number(display.textContent) < 0) {
        display.textContent = display.textContent.slice(1);
    }
    else if (Number(display.textContent) > 0) {
        display.textContent = "-" + display.textContent;
    }
}

function deleteLastDigit() {
    //For backspace button. Remove the last digit entered.
    //Backspace button only works when not waiting for new input 
    //(ie. cannot delete a digit after a operator is pressed)
    //If only 1 digit left on display when backspace is pressed, just clear the display.
    if (!(waitingForNewInput)) {
        if (display.textContent.length === 1) {
            clearCurrentEntry();
        }
        else {
            //If deleting a dot, restore the dot's ability to be enter again
            if (display.textContent[display.textContent.length-1] === ".") {
                decimalAvailable = true;
            }
            display.textContent = display.textContent.slice(0,display.textContent.length-1);
        }
    }
}

function percentage() {
    display.textContent = Number(display.textContent)/100;
}

function main() {
    //Select the buttons and add the appropriate event listeners
    const digitsBtns = document.querySelectorAll(".digits");
    const clearAllBtn = document.querySelector("#clearAll");
    const operators = document.querySelectorAll(".operators");
    const decimalBtn = document.querySelector(".decimal")
    const equalBtn = document.querySelector("#equal")
    const percentageBtn = document.querySelector("#percent");
    const negativeToggleBtn = document.querySelector("#negativeValueToggle")
    const backspaceBtn = document.querySelector("#backspace")

    digitsBtns.forEach((button) => button.addEventListener("click", displayNumber));
    clearAllBtn.addEventListener("click", () => {
        clearCurrentEntry();
        clearFlags();
    });
    operators.forEach((button) => button.addEventListener("click", storeNum));
    decimalBtn.addEventListener("click", addDecimal);
    equalBtn.addEventListener("click", equalSignCompute);
    percentageBtn.addEventListener("click", percentage);
    negativeToggleBtn.addEventListener("click", toggleNegativeSign);
    backspaceBtn.addEventListener("click", deleteLastDigit);
}

main();