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

const divideButton = document.querySelector('#divide')
divideButton.addEventListener('click', () =>  {
    // If calculation is complete, start with the result and append the new operator
    if (isCalculationComplete) {
        isCalculationComplete = false;  // reset flag for new operation
        bottomDisplay.textContent += '/';
    } else if (/[x+\-*/]/.test(bottomDisplay.textContent)) {
        executingMath(); // Complete the current operation first if an operator exists
        bottomDisplay.textContent += '/';
        isCalculationComplete = false;
    } else {
        bottomDisplay.textContent += '/';
    }
})

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => {
    // Nếu vừa thực hiện phép tính, bắt đầu lại với "0."
    if (isCalculationComplete || bottomDisplay.textContent== '') {
        topDisplay.textContent = '';
        bottomDisplay.textContent = "0.";
        isCalculationComplete = false; // Reset cờ sau khi nhập mới
    } else {
        // Kiểm tra nếu chưa có dấu "." nào trước đó
        if (!bottomDisplay.textContent.includes(".")) {
            bottomDisplay.textContent += ".";
        }
    }
});

const percenButton = document.querySelector('#percentage')
percenButton.addEventListener('click', () => {
    if (isCalculationComplete) {
        topDisplay.textContent = '';
        bottomDisplay.textContent += '%';
        isCalculationComplete = false; // Reset cờ sau khi nhập mới
    } else {
        // Kiểm tra nếu chưa có dấu "%" nào trước đó
        if (!bottomDisplay.textContent.includes("%")) {
            bottomDisplay.textContent += "%";
        }
    }
});

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
    let result;
    switch(operator) {
        case '+':
            return add(number1, number2);
        case '-':
            return subtract(number1, number2);
        case 'x':
        case '*':
            return multiply(number1, number2);
        case '/':
            if (number2 === 0) {
                return "Error"; // Handle divide by zero case
            }
            return Math.round(divide(number1, number2)*100)/100;
        default:
            throw new Error("Invalid operator");                
    }
}

function executingMath() {
    topDisplay.textContent = bottomDisplay.textContent;
    let operation;

    // Kiểm tra nếu chuỗi bắt đầu bằng dấu "-" để xử lý số âm
    if (bottomDisplay.textContent.trim().at(0) === '-') {
        // Cắt bỏ ký tự đầu "-" và tách các thành phần
        let number1;
        let number2;
        operation = bottomDisplay.textContent.slice(1).match(/(\d+\.\d+%?|\d+%?|[+\-*x/])/g);
        if (operation[0].includes('%')) {
            number1 = -parseFloat(operation[0].slice(0, -1)) / 100;
        } else {
            number1 = -parseFloat(operation[0]);
        }
        const operator = operation[1];
        if (operation[2].includes('%')) {
            number2 = parseFloat(operation[2].slice(0, -1)) / 100;
        } else {
            number2 = parseFloat(operation[2]);
        }

        // Xác minh rằng các số và toán tử hợp lệ
        if (!isNaN(number1) && operator && !isNaN(number2)) {
            bottomDisplay.textContent = operate(number1, operator, number2);
            isCalculationComplete = true;
        }
    } else {
        // Tách các thành phần cho biểu thức không âm
        let number1;
        let number2
        operation = bottomDisplay.textContent.match(/(\d+\.\d+%?|\d+%?|[+\-*x/])/g);
        if (operation[0].includes('%')) {
            number1 = parseFloat(operation[0].slice(0, -1)) / 100;
        } else {
            number1 = parseFloat(operation[0]);
        }
        const operator = operation[1];
        if (operation[2].includes('%')) {
            number2 = parseFloat(operation[2].slice(0, -1)) / 100;
        } else {
            number2 = parseFloat(operation[2]);
        }

        // Xác minh rằng các số và toán tử hợp lệ
        if (!isNaN(number1) && operator && !isNaN(number2)) {
            bottomDisplay.textContent = operate(number1, operator, number2);
            isCalculationComplete = true;
        }
    }
}

