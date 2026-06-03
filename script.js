let display = document.getElementById('display');
let currentValue = '0';
let previousValue = '';
let operator = '';
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentValue;
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentValue = number;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0') {
            currentValue = number;
        } else {
            currentValue += number;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    previousValue = currentValue;
    operator = op;
    shouldResetDisplay = true;
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentValue = '0.';
        shouldResetDisplay = false;
    } else if (!currentValue.includes('.')) {
        currentValue += '.';
    }
    updateDisplay();
}

function deleteLastChar() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function calculate() {
    if (!operator || shouldResetDisplay) {
        return;
    }

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 0;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operator = '';
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLastChar();
    } else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
});

// Initialize display
updateDisplay();
