const display = document.querySelector(".display");
const intermediateStepsDisplay = document.querySelector(".intStepsDisplay");

display.textContent = "0";
let operandOne = 1;
let operation = "none";

let waitingForNewInput = true;
let waitingForOperandTwo = false;
let decimalAvailable = true;
let digitsEntered = false;
let equalBtnPressed = false;

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
    //inputs operandOne and operandTwo are numbers. Operator is a string.
    //Output is number
    let result;
    switch(operator) {
        case "add":
        case "+":
            result = add(operandOne, operandTwo);
            break;
        case "subtract":
        case "-":
            result = subtract(operandOne, operandTwo);
            break;
        case "multiply":
        case "*":
            result = multiply(operandOne, operandTwo);
            break;
        case "divide":
        case "/":
            result = divide(operandOne, operandTwo);
            break;
    }
    return result;
}

function displayNumber(number) {
    //Input: number: type string. The number/digit to display
    //What to do when a digit button is pressed
    //If waiting for new input, clear display and show digits instead of appending to old string
    if (equalBtnPressed) {
        intermediateStepsDisplay.textContent = ""
        equalBtnPressed = false;
    }
    if (waitingForNewInput || display.textContent === "0") {
        display.textContent = number;
        waitingForNewInput = false;
    }
    else {
        display.textContent += number;
    }
    digitsEntered = true;
}

function clearCurrentEntry() {
    //Clear the displays
    display.textContent = "0";
    intermediateStepsDisplay.textContent = ""
}

function clearFlags() {
    //Clear the flags
    operandOne = 0; 
    operation = "none";
    decimalAvailable = true;
    waitingForNewInput = true;
    waitingForOperandTwo = false;
    digitsEntered = false;
}

function storeNum(operatorPressed) {
    //Input: operatorPressed: type String. The operator pressed.
    //What to do when a operator button is pressed
    if (waitingForOperandTwo && digitsEntered) {
        operandOne = operate(operandOne, Number(display.textContent), operation);
        display.textContent = operandOne;
        operation = operatorPressed;
    }
    else {
        operandOne = Number(display.textContent);
        operation = operatorPressed;
        waitingForOperandTwo = true;
    }
    intermediateStepsDisplay.textContent = `${operandOne} ${convertOperatorToSymbol(operation)}`;
    waitingForNewInput = true;
    decimalAvailable = true;    //Reactivate decimal button
    digitsEntered = false;      //Tell program it's now waiting for new digits to be entered
    equalBtnPressed = false;    //Have to set to allow chaining operations to be displayed
}

function addDecimal() {
    //check if decimal btn is active for current operand.
    //if so, add decimal to current display string.
    if (decimalAvailable && waitingForNewInput) {
        display.textContent = "0."  //If decimal is pressed before other number, add a zero before it to avoid bug with interpreting.
        waitingForNewInput = false;
        if (equalBtnPressed) {
            intermediateStepsDisplay.textContent = "";
        }
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
        let operandTwo = Number(display.textContent);
        display.textContent = operate(operandOne, operandTwo, operation);
        intermediateStepsDisplay.textContent = `${operandOne} ${convertOperatorToSymbol(operation)} ${operandTwo} =`;
        clearFlags();
        equalBtnPressed = true;
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
            display.textContent = "0";  //Only clear primary display. Don't clear intermediate steps display.
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

function convertOperatorToSymbol(operation) {
    //Convert operator symbols from its name to the correcy symbol
    //for display on the intermediate step display
    //Input: symbol, string: the word of the operation to convert to symbol
    //Returns: string, the symbol to represent the operation
    switch(operation) {
        case "add":
        case "+":
            return "\u002B";
        case "subtract":
        case "-":
            return "\u2212";
        case "multiply":
        case "*":
            return "\u00D7";
        case "divide":
        case "/":
            return "\u00F7";
    }
}

function main() {
    //Select the buttons and add the appropriate event listeners
    const digitsBtns = document.querySelectorAll(".digits");
    const clearAllBtn = document.querySelector("#clearAll");
    const operators = document.querySelectorAll(".operators");
    const decimalBtn = document.querySelector("#decimal")
    const equalBtn = document.querySelector("#equal")
    const percentageBtn = document.querySelector("#percent");
    const negativeToggleBtn = document.querySelector("#negativeValueToggle")
    const backspaceBtn = document.querySelector("#backspace")

    digitsBtns.forEach((button) => button.addEventListener("click", (event) => displayNumber(event.target.id)));
    clearAllBtn.addEventListener("click", () => {
        clearCurrentEntry();
        clearFlags();
    });
    operators.forEach((button) => button.addEventListener("click", (event) => storeNum(event.target.id)));
    decimalBtn.addEventListener("click", addDecimal);
    equalBtn.addEventListener("click", equalSignCompute);
    percentageBtn.addEventListener("click", percentage);
    negativeToggleBtn.addEventListener("click", toggleNegativeSign);
    backspaceBtn.addEventListener("click", deleteLastDigit);

    //Add listener to page for keyboard input
    document.addEventListener("keydown", keyboardListener);
}

function keyboardListener(event) {
    const keyPressed = event.key;
    //Number buttons
    if (Number.isInteger(Number(keyPressed)) && keyPressed !== " ") {
        displayNumber(keyPressed);
    }
    else {
        switch (keyPressed) {
            //Operator buttons
            case "+":
            case "-":
            case "*":
            case "/":
                storeNum(keyPressed);                    
                break;
                //Decimal button
            case ".":
                addDecimal();
                break;
            //Enter or equal key -> equal button
            case "Enter":
            case "=":
                equalSignCompute();
                break;
            //Escape key -> clear all
            case "Escape":
                clearCurrentEntry();
                clearFlags();
                break;
            //Backspace key -> backspace
            case "Backspace":
                deleteLastDigit();
                break;
            //Percent key -> percent
            case "%":
                percentage();
                break;
            //F9 key -> toggle negative
            case "F9":
                toggleNegativeSign();
                break;
        }
    }
};

main();
keyboardListener();
