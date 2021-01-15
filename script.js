const resultDisplay = document.getElementById('result-display');
const inputDisplay = document.getElementById('input-display');

//Prevent non numeric characters from being displayed
inputDisplay.addEventListener('keypress', function(e) {
    const allowedChars = /[0-9]+/;

    if (!allowedChars.test(e.key)) {
        e.preventDefault();
    }
    
    // Limit display to 16 characters
    inputDisplay.value = inputDisplay.value.slice(0, 16)
});

const specialButtons = document.getElementsByClassName('special-buttons');
Array.prototype.slice.call(specialButtons).forEach(e => e.addEventListener('click', updateDisplay));

const operatorButtons = document.querySelectorAll('.operators');
Array.prototype.slice.call(operatorButtons).forEach(e => e.addEventListener('click', setOperator));

const numButtons = document.querySelectorAll('.numbers');
Array.prototype.slice.call(numButtons).forEach(e => e.addEventListener('click', updateDisplay));

const equalButton = document.querySelector('.equal-sign');
equalButton.addEventListener('click', equal);

let numberArray = [];
let operator;
let result;

function add(array) {
    return Math.round((array[0] + array[1]) * 1000) / 1000;
}

function subtract(array) {
    return Math.round((array[0] - array[1]) * 1000) / 1000;
}

function multiply(array) {
    return Math.round((array[0] * array[1]) * 1000) / 1000;
}

function divide(array) {
    if (array[0] > 1 && array[1] === 0) {
        handleError();
        return 'STOP IT! 😠'
    }
    return Math.round((array[0] / array[1]) * 1000) / 1000;
}

function  addDecimal() {
    if (inputDisplay.value.includes('.')) {
        return;
    } else {
        inputDisplay.value += '.';
    }
    
}

function makeNegative() {
    if (inputDisplay.value.includes('-')) {
        inputDisplay.value = inputDisplay.value.replace('-', '');
    } else {
        inputDisplay.value = '-' + inputDisplay.value;
    }
    
}

function updateDisplay(e) {
    if (e.target.innerText.match(/[0-9]/)) {
        inputDisplay.value += e.target.innerText;
    } 
    // Limit display to 16 characters
    inputDisplay.value = inputDisplay.value.slice(0, 16)

    switch(e.target.innerText) {
        case ('+ / -'):
            makeNegative();
            break;
        case ('.'):
            addDecimal();
            break;
        case ('CE'):
            reset();
            break;
        case ('⌫'):
            deleteChar();
            break;
        default:
            return;
    }
}

function setOperator(e) {
    numberArray.push(parseFloat(inputDisplay.value));
    if (numberArray.length === 2) {
        operate();
        resultDisplay.value = result.toString();
        numberArray.length = 0;
        numberArray.push(result);

    } else if (numberArray.length > 2) {
        numberArray.length = 0;
        numberArray.push(result);
    }

    operator = e.target.innerText;
    inputDisplay.value = '';
}

function equal() {
    if (numberArray.length < 2) {
        numberArray.push(parseFloat(inputDisplay.value));

    } else if (numberArray.length > 2) {
        numberArray.length = 0;
        numberArray.push(result);    
    }   
    
    operate();
    inputDisplay.value = '';
}

function operate() {
    switch (operator) {
        case ('+'):
            result = add(numberArray);
            showResults();
            break;
        case ('-'):
            result =  subtract(numberArray);
            showResults();
            break;
        case ('x'):
            result =  multiply(numberArray);
            showResults();
            break;
        case ('÷'):
            result =  divide(numberArray);
            showResults();
            break;
        default:
            handleError();
    }

    if (numberArray.includes(NaN)) {
        handleError();
    }
}

function showResults() {
    resultDisplay.value = result;
}

function reset() {
    inputDisplay.value = '';
    resultDisplay.value = '';
    numberArray.length = 0;
    operator = null;
    result = null;
}

function deleteChar() {
    inputDisplay.value = inputDisplay.value.slice(0, -1);
}

function handleError() {
    result = 'error';
    showResults();
    numberArray.length = 0
}