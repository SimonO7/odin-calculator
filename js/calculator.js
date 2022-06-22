//JS file for calculator project

const display = document.querySelector(".display");
const intermediateStepsDisplay = document.querySelector(".intStepsDisplay");

//Flags that will keep track of the calculator's operation. These are the default values.
display.textContent = "0";
let operandOne = 1;
let operation = "none";
let waitingForNewInput = true;      //Tracks if calculator is waiting for new input.
let waitingForOperandTwo = false;   //Tracks if calculator is waiting for the second operand. (ie. it's in between operations)
let decimalAvailable = true;        //Tracks if the decimal button is available to be entered on the current operand.
let digitsEntered = false;          //Tracks if new digits have been entered in between operations.
let equalBtnPressed = false;        //Tracks if the equal button has been pressed in the current calculation.

//The basic four operations: add, subtract, multiply, and divide.
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
    //Perform an operation on two operands.
    //Parameters: operandOne, Number: the first operand.
    //            operandTwo, Number: the second operand.
    //            operator, string: the operation to perform.
    //Returns: number, the result of the calculation.
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
    //Define what to do when a digit button is pressed.
    //Parameters: number, string: The digit to display.
    //Returns: None. It will modify the display directly.

    //If equal button was pressed, clear the intermediate steps display as well, and reset the flag.
    if (equalBtnPressed) {
        intermediateStepsDisplay.textContent = ""
        equalBtnPressed = false;
    }
    //If waiting for new input, clear the display and show digits instead of appending to existing display values.
    if (waitingForNewInput || display.textContent === "0") {
        display.textContent = number;
        waitingForNewInput = false;
    }
    else if (display.textContent.length < 11) {
        display.textContent += number;
    }
    digitsEntered = true;
}

function clearCurrentEntry() {
    //Clear the displays
    //Parameters: None
    //Returns: None. It will directly modify the displays.
    display.textContent = "0";
    intermediateStepsDisplay.textContent = ""
}

function clearFlags() {
    //Reset the flags to default values.
    //Parameters: None
    //Returns: None
    operandOne = 0; 
    operation = "none";
    decimalAvailable = true;
    waitingForNewInput = true;
    waitingForOperandTwo = false;
    digitsEntered = false;
}

function storeNum(operatorPressed) {
    //Define what to do when an operator button (add, subtract, multiply, divide button) is pressed.
    //Parameter: operatorPressed, string: the operator pressed, represented in either words or the symbol.
    //Returns: None.

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
    decimalAvailable = true;    //Reactivate decimal button.
    digitsEntered = false;      //Tell program it's now waiting for new digits to be entered.
    equalBtnPressed = false;    //Have to set to allow chaining operations to be displayed
}

function addDecimal() {
    //Check if decimal button is active for current operand.
    //Decimal button is active if the current operand does not already have a decimal.
    //Parameters: None
    //Returns: None
    if (decimalAvailable && waitingForNewInput) {
        display.textContent = "0."  //If decimal is pressed before other number, add a zero before it.
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
    //What to do when the equal sign is pressed.
    //When equal sign is pressed, check if it's waiting for operand two or not, as well as if a new digit has been entered. If so, calculate and display result, then reset the flags.
    //Parameters: None
    //Returns: None
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
    //If number is already negative, remove the negative symbol from beginning of number.
    //If number is postive, add negative symbol in front of number.
    //Parameters: None
    //Returns: None
    if (Number(display.textContent) < 0) {
        display.textContent = display.textContent.slice(1);
    }
    else if (Number(display.textContent) > 0) {
        display.textContent = "-" + display.textContent;
    }
}

function deleteLastDigit() {
    //What to do when backspace button is pressed. Remove the last digit entered.
    //Backspace button only works when not waiting for new input (ie. cannot delete a digit after a operator is pressed).
    //If only 1 digit left on display when backspace is pressed, just clear the display.
    //Parameters: None
    //Returns: None
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
    //What to do when percent button is pressed.
    //Calculate the decimal equivalent of the percent of the currently input number.
    //Parameters: None
    //Returns: None
    display.textContent = Number(display.textContent)/100;
}

function convertOperatorToSymbol(operation) {
    //Convert operator symbols from its name to the correct symbol for display on the intermediate step display
    //Parameter: operation, string: the word of the operation to convert to symbol, or the symbol of the operation.
    //Returns: string, the symbol to represent the operation on the display.
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
    //Main function to run on page load.
    //Select the buttons and add the appropriate event listeners.
    //Parameters: None
    //Returns: None
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
    //Defines how to handle key presses on the keyboard.
    //Parameters: event, Event: the keyDown event generated when a keyboard key is pressed.
    //Returns: None
    const keyPressed = event.key;
    //Number buttons. Check if the key pressed is a number.
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
