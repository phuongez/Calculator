const bottomDisplay = document.querySelector('#bottomDisplay');
const topDisplay = document.querySelector('#topDisplay');

let isCalculationComplete = false;

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', ()=> {
    bottomDisplay.textContent = '';
    topDisplay.textContent = '';
})

const numberButtons = document.querySelectorAll('.numbers');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // If a calculation has just been completed, clear and start fresh
        if (isCalculationComplete) {
            topDisplay.textContent = '';
            bottomDisplay.textContent = button.textContent;
            isCalculationComplete = false; // Reset the flag after new input
        } else {
            // Otherwise, continue adding numbers to the display
            bottomDisplay.textContent += button.textContent;
        }
    });
})

const addButton = document.querySelector('#plus')
addButton.addEventListener('click', () =>  {
    // If calculation is complete, start with the result and append the new operator
    if (isCalculationComplete) {
        isCalculationComplete = false;  // reset flag for new operation
        bottomDisplay.textContent += '+';
    } else if (/[x+\-*/]/.test(bottomDisplay.textContent)) {
        executingMath(); // Complete the current operation first if an operator exists
        bottomDisplay.textContent += '+';
        isCalculationComplete = false;
    } else {
        bottomDisplay.textContent += '+';
    }
})

const subtractButton = document.querySelector('#minus')
subtractButton.addEventListener('click', () =>  {
    // If calculation is complete, start with the result and append the new operator
    if (isCalculationComplete) {
        isCalculationComplete = false;  // reset flag for new operation
        bottomDisplay.textContent += '-';
    } else if (/[x+\-*/]/.test(bottomDisplay.textContent)) {
        executingMath(); // Complete the current operation first if an operator exists
        bottomDisplay.textContent += '-';
        isCalculationComplete = false;
    } else {
        bottomDisplay.textContent += '-';
    }
})

const multiplyButton = document.querySelector('#multiply')
multiplyButton.addEventListener('click', () =>  {
    // If calculation is complete, start with the result and append the new operator
    if (isCalculationComplete) {
        isCalculationComplete = false;  // reset flag for new operation
        bottomDisplay.textContent += 'x';
    } else if (/[x+\-*/]/.test(bottomDisplay.textContent)) {
        executingMath(); // Complete the current operation first if an operator exists
        bottomDisplay.textContent += 'x';
        isCalculationComplete = false;
    } else {
        bottomDisplay.textContent += 'x';
    }
})

const equalButton = document.querySelector('#equal');
equalButton.addEventListener('click', executingMath);

// Function for operators
function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide (a,b) {
    return a/b;
}

function operate(number1,operator,number2) {
    switch(operator) {
        case '+':
            return add(number1, number2);
        case '-':
            return subtract(number1, number2);
        case 'x':
        case '*':
            return multiply(number1, number2);
        case '/':
            return divide(number1, number2);
        default:
            throw new Error("Invalid operator");                
    }
}

function executingMath() {
    topDisplay.textContent = bottomDisplay.textContent;
    let operation;

    // Check if the first character is "-" to handle negative numbers
    if (bottomDisplay.textContent.trim().at(0) === '-') {
        // Adjust parsing for negative numbers
        operation = bottomDisplay.textContent.slice(1).replace(/\s+/g, '').split(/(\D)/).filter(Boolean);
        const number1 = -parseFloat(operation[0]);
        const operator = operation[1];
        const number2 = parseFloat(operation[2]);

        // Verify that parsed numbers and operator are valid
        if (!isNaN(number1) && operator && !isNaN(number2)) {
            bottomDisplay.textContent = operate(number1, operator, number2);
            isCalculationComplete = true;
        }
    } else {
        // Parsing for regular (non-negative) numbers
        operation = bottomDisplay.textContent.replace(/\s+/g, '').split(/(\D)/).filter(Boolean);
        const number1 = parseFloat(operation[0]);
        const operator = operation[1];
        const number2 = parseFloat(operation[2]);

        // Verify that parsed numbers and operator are valid
        if (!isNaN(number1) && operator && !isNaN(number2)) {
            bottomDisplay.textContent = operate(number1, operator, number2);
            isCalculationComplete = true;
        }
    }
}