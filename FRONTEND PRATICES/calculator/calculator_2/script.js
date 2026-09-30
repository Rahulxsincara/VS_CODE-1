// ============================================
//  CALCULATOR 2
//  CREATED BY: SINCARA
// ============================================


// ---------- 1. GET DOM ELEMENTS ----------
const display = document.getElementById("display");

const clearAllBtn = document.getElementById("clearAll");
const clearBtn    = document.getElementById("clear");
const percentBtn  = document.getElementById("percent");
const divideBtn   = document.getElementById("divide");
const multiplyBtn = document.getElementById("multiply");
const minusBtn    = document.getElementById("minus");
const plusBtn     = document.getElementById("plus");
const equalBtn    = document.getElementById("equal");
const decimalBtn  = document.getElementById("decimal");

const numButtons = {
    '0': document.getElementById('zero'),
    '1': document.getElementById('one'),
    '2': document.getElementById('two'),
    '3': document.getElementById('three'),
    '4': document.getElementById('four'),
    '5': document.getElementById('five'),
    '6': document.getElementById('six'),
    '7': document.getElementById('seven'),
    '8': document.getElementById('eight'),
    '9': document.getElementById('nine'),
};


// ---------- 2. STATE VARIABLES ----------
let currentInput     = '0';
let firstOperand     = null;
let operator         = null;
let waitingForSecond = false;
let justEvaluated    = false;


// ---------- 3. UPDATE DISPLAY ----------
function updateDisplay(value) {
    display.textContent = value;
}


// ---------- 4. RESET EVERYTHING ----------
function resetAll() {
    currentInput     = '0';
    firstOperand     = null;
    operator         = null;
    waitingForSecond = false;
    justEvaluated    = false;
    updateDisplay('0');
}


// ---------- 5. CALCULATE ----------
function calculate(a, b, op) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch (op) {
        case '+': return numA + numB;
        case '-': return numA - numB;
        case '*': return numA * numB;
        case '/':
            if (numB === 0) return 'Error';
            return numA / numB;
        default:  return numB;
    }
}


// ---------- 6. HANDLE DIGIT PRESS (0-9) ----------
function handleDigit(digit) {

    // If we just pressed '=', start a fresh calculation.
    if (justEvaluated === true) {
        resetAll();
    }

    // If we're waiting for the second number,
    // replace what's on the screen with this digit.
    if (waitingForSecond === true) {
        currentInput = digit;
        waitingForSecond = false;
    }
    // If the screen shows "0", replace it.
    else if (currentInput === '0') {
        currentInput = digit;
    }
    // Otherwise, add the digit to the end.
    else {
        currentInput = currentInput + digit;
    }

    updateDisplay(currentInput);
}


// ---------- 7. HANDLE DECIMAL PRESS (.) ----------
function handleDecimal() {

    // If we just pressed '=', start fresh.
    if (justEvaluated === true) {
        resetAll();
    }

    // If we're waiting for the second number,
    // start with "0."
    if (waitingForSecond === true) {
        currentInput = '0.';
        waitingForSecond = false;
        updateDisplay(currentInput);
        return;
    }

    // Only add the dot if there isn't one already.
    if (currentInput.indexOf('.') === -1) {
        currentInput = currentInput + '.';
        updateDisplay(currentInput);
    }
}


// ---------- 8. HANDLE OPERATOR PRESS (+, -, *, /) ----------
function handleOperator(sign) {

    // If we just pressed '=', we can still use the result.
    if (justEvaluated === true) {
        justEvaluated = false;
    }

    // Save the number currently shown.
    const inputValue = parseFloat(currentInput);

    // If there's already a sign AND the user typed a second number,
    // do the math first (chaining).
    if (operator !== null && waitingForSecond === false) {

        const result = calculate(firstOperand, inputValue, operator);

        // If the result is Error, stop here.
        if (result === 'Error') {
            updateDisplay('Error');
            resetAll();
            return;
        }

        // Show the result and remember it as the new first number.
        updateDisplay(result);
        firstOperand = result;
        currentInput = result.toString();
    }
    else {
        // No pending calculation — just save the current number.
        firstOperand = inputValue;
    }

    // Remember the sign and wait for the second number.
    operator = sign;
    waitingForSecond = true;
}


// ---------- 9. HANDLE EQUALS PRESS (=) ----------
function handleEqual() {

    // If no operator, there's nothing to calculate.
    if (operator === null) {
        return;
    }

    // Figure out the second number.
    // If user pressed '=' right after '+', use the first number.
    let secondValue;
    if (waitingForSecond === true) {
        secondValue = firstOperand;
    } else {
        secondValue = parseFloat(currentInput);
    }

    // Do the math.
    const result = calculate(firstOperand, secondValue, operator);

    // If Error, show and reset.
    if (result === 'Error') {
        updateDisplay('Error');
        resetAll();
        return;
    }

    // Show the result.
    updateDisplay(result);

    // Prepare for the next calculation.
    currentInput     = result.toString();
    firstOperand     = null;
    operator         = null;
    waitingForSecond = false;
    justEvaluated    = true;
}


// ---------- 10. HANDLE PERCENT (%) ----------
function handlePercent() {
    const value = parseFloat(currentInput);

    if (isNaN(value)) {
        return;
    }

    const result = value / 100;

    currentInput = result.toString();
    updateDisplay(currentInput);
}


// ---------- 11. HANDLE CLEAR (C) ----------
function handleClear() {
    currentInput = '0';
    updateDisplay('0');
}


// ---------- 12. HANDLE CLEAR ALL (AC) ----------
function handleClearAll() {
    resetAll();
}


// ---------- 13. EVENT LISTENERS ----------

// Number buttons (0-9)
numButtons['0'].onclick = function() { handleDigit('0'); };
numButtons['1'].onclick = function() { handleDigit('1'); };
numButtons['2'].onclick = function() { handleDigit('2'); };
numButtons['3'].onclick = function() { handleDigit('3'); };
numButtons['4'].onclick = function() { handleDigit('4'); };
numButtons['5'].onclick = function() { handleDigit('5'); };
numButtons['6'].onclick = function() { handleDigit('6'); };
numButtons['7'].onclick = function() { handleDigit('7'); };
numButtons['8'].onclick = function() { handleDigit('8'); };
numButtons['9'].onclick = function() { handleDigit('9'); };

// Decimal button
decimalBtn.onclick = handleDecimal;

// Operator buttons
plusBtn.onclick     = function() { handleOperator('+'); };
minusBtn.onclick    = function() { handleOperator('-'); };
multiplyBtn.onclick = function() { handleOperator('*'); };
divideBtn.onclick   = function() { handleOperator('/'); };

// Equal button
equalBtn.onclick = handleEqual;

// Clear buttons
clearBtn.onclick    = handleClear;
clearAllBtn.onclick = handleClearAll;

// Percent button
percentBtn.onclick = handlePercent;


// ---------- READY ----------
console.log("Calculator ready — Created by SINCARA");