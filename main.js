// Calculator Object //
const calculator = {
    displayValue: '',
    firstNum: null,
    secondNum: false,
    operator: null,
};
// If button is number //
function inputNum(number) {
    const { displayValue, secondNum } = calculator;

    if (secondNum === true) {
        calculator.displayValue = number;
        calculator.secondNum = false;
    } else {
        calculator.displayValue = displayValue === '' ? number : displayValue + number;
    }
    console.log(calculator)
}
// If button is decimal //
function inputDecimal(dot) {
    if (calculator.displayValue === '' || calculator.secondNum === true) {
        calculator.displayValue = '0.'
        calculator.secondNum = false
    }
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue = calculator.displayValue + dot;
    }
}
// If divide by zero //
function zero() {
    let description = [
        "https://64.media.tumblr.com/0dac9c4a0d340e5de41a37f351d6773d/094e648c7e3710ba-5a/s500x750/26ad1bda56c4afca0492e07f38ea2e470a084d9d.gifv",
        "https://i.pinimg.com/originals/e0/80/02/e080022895bad950703d80f13da1f368.gif",
        "https://64.media.tumblr.com/tumblr_ltp1izbOd71qzpy7ko1_r1_500.gifv",
        "https://64.media.tumblr.com/c3794f85dee18225304d9bdce03f57c3/tumblr_mud8niZYup1rsdpaso1_500.gifv",
        "https://64.media.tumblr.com/6697bf7acd11019a797b7099ce35006f/tumblr_o4e0erPFXs1rsdpaso1_500.gif",
        "https://i.pinimg.com/originals/f2/a6/bf/f2a6bf50228f8e056b47ae56aae7862a.gif",
        "https://i.pinimg.com/originals/b6/83/78/b683780882e8225f6014ab21f91434ed.gif",
        "https://64.media.tumblr.com/ed365c1d78ccb7c86818d0b4fe397fa2/tumblr_n4m762IKW61rsdpaso1_400.gifv",
        "https://media4.giphy.com/media/iIkZ9Wr3Nmoso/giphy.gif?cid=ecf05e47ol3e5sckreptpthz493cruwqbeqk7u03rewgbdc2&rid=giphy.gif",
        "https://64.media.tumblr.com/tumblr_memc7wbtjK1rsdpaso1_640.gifv",
        "https://media0.giphy.com/media/d1jHu2CAaRRG8/giphy.gif",
        "https://64.media.tumblr.com/6dcad26d4e71b6429b0a4bec17ca357c/tumblr_ps0s1dDRTa1rsdpaso1_500.gifv"
    ];

    let size = description.length;
    let random = Math.floor(size * Math.random());
    document.getElementById('image').src=description[random];
    let para = document.querySelector('.calculator_display');
    para.value = "You Just Divided By Zero!";
}
// If button is equal //
function handleOperator(nextOperator) {
    const { firstNum, displayValue, operator } = calculator;
    // 'parseFloat' so that the strings become numbers //
    const inputValue = parseFloat(displayValue);
    if (operator && calculator.secondNum) {
        calculator.operator = nextOperator;
        console.log(calculator);
    }
    // Check if firstNum is null and inputValue is not a 'NaN' value //
    if (firstNum === null && !isNaN(inputValue)) {
        // update firstNum property to equal inputValue //
        calculator.firstNum = inputValue;
    } else if (operator) {
        // If operator is true firstNum becomes displayValue //
        const result = operate(firstNum, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        // operate() runs when another number is pressed //
        calculator.firstNum = result;
    }
    // secondNum is set to true which indicates that firstNum //
    // has been entered and the next number will equal the secondNum //
    // operator is set to a function parameter which is set to target.value //
    calculator.secondNum = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}
// Math equations //
function operate(firstNum, secondNum, operator) {
    if(operator === 'exponent') {
        return power(firstNum, secondNum);
    }
    if(operator === 'multiply') {
        return multiply(firstNum, secondNum);
    }
    if(operator === 'divide') {
        return divide(firstNum, secondNum);
    }
    if(operator === 'add') {
        return add(firstNum, secondNum);
    }
    if(operator === 'subtract') {
        return subtract(firstNum, secondNum);
    }
    function power(firstNum, secondNum) {
        return firstNum ** secondNum;
    }
    function multiply(firstNum, secondNum) {
        return firstNum * secondNum;
    }
    function divide(firstNum, secondNum) {
        if (secondNum === 0) {
            return zero();
        } else {
            return firstNum / secondNum;
        }
    }
    function add(firstNum ,secondNum) {
        return firstNum + secondNum;
    }
    function subtract(firstNum, secondNum) {
        return firstNum - secondNum;
    }
    return secondNum;
}
// Clear //
function clearCalculator() {
    calculator.displayValue = '';
    calculator.firstNum = null;
    calculator.secondNum = false;
    calculator.operator = null;
    document.getElementById('image').src="";
    console.log(calculator);
}
// Delete //
function backSpace() {
    const display = document.querySelector('.calculator_display');
    display.value = display.value.slice(0, -1);
    calculator.displayValue = calculator.displayValue.slice(0, -1);
    console.log(calculator);
}
// Display //
function updateDisplay() {
    const display = document.querySelector('.calculator_display');
    display.value = calculator.displayValue;
}
// Listen for keys //
const keys = document.querySelector('.calculator_keys');
keys.addEventListener('click', (event) => {
    const key = event.target;

    if (!key.matches('button')) return

    // If key is an operator //
    if (key.classList.contains('operator')) {
        handleOperator(key.value);
        return updateDisplay();
    }
    // If key is a decimal //
    if (key.classList.contains('decimal')) {
        inputDecimal(key.value);
        return updateDisplay();
    }
    // If key is clear //
    if (key.classList.contains('clear')) {
        clearCalculator();
        return updateDisplay();
    }
    // If key is delete //
    if(key.classList.contains('delete')) {
        return backSpace();
    }
    // If key is a number //
    inputNum(key.value);
    updateDisplay();
});
// Keyboard Input //
document.body.addEventListener('keypress', function(event) {
    let key = event.keyCode;
    // Include all numbers //
    for (let i = 0; i < 10; i++) {
        if (key === i + 48) {
            // Copy logic of inputNum() //
            const { displayValue, secondNum } = calculator;
            if (secondNum === true) {
                calculator.displayValue = i;
                calculator.secondNum = false;
            } else {
                calculator.displayValue = displayValue === '0' ? i : displayValue + i;
            }
        }
        // Copy logic of inputDecimal() //
        if (key === 46) {
            if (calculator.displayValue === '' || calculator.secondNum === true) {
                calculator.displayValue = '0.'
                calculator.secondNum = false
            }
            if (!calculator.displayValue.includes('.')) {
                calculator.displayValue = calculator.displayValue + '.';
            }
        }
        // Copy logic of clearCalculator() //
        if (key === 99) {
            calculator.displayValue = '';
            calculator.firstNum = null;
            calculator.secondNum = false;
            calculator.operator = null;
            document.getElementById('image').src="";
        }
        // Copy logic of backSpace() //
        if (key === 100) {
            calculator.displayValue = calculator.displayValue.slice(0, -1);
        }
        // 13 = Equal [return] //
        // Copy logic of handleOperator() //
        if (key === 13) {
            const { firstNum, displayValue, operator } = calculator;
            // 'parseFloat' so that the strings become numbers //
            const inputValue = parseFloat(displayValue);
            if (operator && calculator.secondNum) {
                calculator.operator = key;
            }
            // Check if firstNum is null and inputValue is not a 'NaN' value //
            if (firstNum === null && !isNaN(inputValue)) {
                // update firstNum property to equal inputValue //
                calculator.firstNum = inputValue;
            } else if (operator) {
                // If operator is true firstNum becomes displayValue //
                const result = operate(firstNum, inputValue, operator);
                calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
                // operate() runs when another number is pressed //
                calculator.firstNum = result;
            }
            // secondNum is set to true which indicates that firstNum //
            // has been entered and the next number will equal the secondNum //
            // operator is set to event.keyCode //
            calculator.secondNum = true;
            calculator.operator = key;
        }
        // 94 = Exponent ^ //
        // 42 = Multiply * //
        // 124 = Divide | //
        // 43 = Add + //
        // 45 = Subtract - //
        // Copy logic of operate() //
        if (key === 43) {
            calculator.operator = 'add';
            calculator.secondNum = true;
            calculator.firstNum = parseFloat(calculator.displayValue);
        }
        if (key === 45) {
            calculator.operator = 'subtract';
            calculator.secondNum = true;
            calculator.firstNum = parseFloat(calculator.displayValue);
        }
        if (key === 42) {
            calculator.operator = 'multiply';
            calculator.secondNum = true;
            calculator.firstNum = parseFloat(calculator.displayValue);
        }
        if (key === 124) {
            calculator.operator = 'divide';
            calculator.secondNum = true;
            calculator.firstNum = parseFloat(calculator.displayValue);
        }
        if (key === 94) {
            calculator.operator = 'exponent';
            calculator.secondNum = true;
            calculator.firstNum = parseFloat(calculator.displayValue);
        }
        function operate(firstNum, secondNum, operator) {
            if (operator === 'exponent') {
                return firstNum ** secondNum;
            }
            if(operator === 'multiply') {
                return firstNum * secondNum;
            }
            if (operator === 'divide') {
                if (secondNum === 0) {
                    zero();
                    document.querySelector('.calculator_display') = "You Just Divided By Zero!";
                } else {
                    return firstNum / secondNum;
                }
            }
            if (operator === 'add') {
                return firstNum + secondNum;
            }
            if (operator === 'subtract') {
                return firstNum - secondNum;
            }
            return secondNum;
        }
    }//-->
    updateDisplay(event);
    console.log(event.keyCode);
    console.log(calculator);
});
