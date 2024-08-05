let displayValue = "0";
let firstValue = "";
let secondValue = "";
let currentOperation = "";
let result = "";

const allButtons = document.querySelectorAll("button");
const display = document.querySelector("#display");

allButtons.forEach(button =>{
    button.addEventListener("click", (e) => {
        if (button.classList.contains("operand") && firstValue.length < 9 && !currentOperation){
            firstValue += button.value;
            updateDisplay(firstValue);
        } else if (button.classList.contains("reset")){
            reset();
        } else if (button.classList.contains("operand") && secondValue.length < 9 && currentOperation){
            secondValue += button.value;
            updateDisplay(secondValue);
        } else if(button.classList.contains("operator") && firstValue){
            currentOperation = button.value;
            resetOperatorButton();
            highlightOperator(button);
        } else if (button.classList.contains("delete-left") && !currentOperation && firstValue){
            firstValue = firstValue.slice(0,-1);
            firstValue.length === 0 ? updateDisplay(0) : updateDisplay(firstValue);
        } else if (button.classList.contains("delete-left") && currentOperation && secondValue){
            secondValue = secondValue.slice(0,-1);
            secondValue.length === 0 ? updateDisplay(0) : updateDisplay(secondValue);
        } else if (button.classList.contains("show-result") && currentOperation && (firstValue&&secondValue)){
            operate(firstValue,secondValue,currentOperation);
            resultSoftReset();
            resetOperatorButton();
        } else if (button.classList.contains("reverse-signal")&& !currentOperation && firstValue){
            firstValue = reverseSignal(firstValue);
            updateDisplay(firstValue);
        } else if (button.classList.contains("reverse-signal") && (secondValue && currentOperation)){
            secondValue = reverseSignal(secondValue);
            updateDisplay(secondValue);
        } else if (button.classList.contains("dot") && (firstValue.length < 9 && !currentOperation && !firstValue.includes("."))){
            firstValue = addDot(firstValue);
            updateDisplay(firstValue);
        } else if (button.classList.contains("dot") && (secondValue.length < 9 && currentOperation && !secondValue.includes("."))){
            secondValue = addDot(secondValue);
            updateDisplay(secondValue);
        }
    })
});

function updateDisplay(value){
    display.textContent = value;
}

function reset(){
    updateDisplay("0");
    resetOperatorButton();
    firstValue = "";
    secondValue = "";
    currentOperation = "";
    result = "";
}

function highlightOperator(button){
currentOperation === button.textContent ? button.style.backgroundColor = "#ddd" :  button.style.backgroundColor = "#ccc";
}

function resetOperatorButton(){
    allButtons.forEach((button) => {
        if (button.classList.contains("operator")){
            button.style.backgroundColor = "#ccc";
        }
    });
}

function operate(value1, value2, operator){
    value1 = Number(value1);
    value2 = Number(value2);

    switch (operator) {
        case "+":
            result = value1 + value2;
            break;
        case "-":
            result = value1 - value2;
            break;
        case "*":
            result = value1 * value2;
            break;
        case "/":
            result = value1/value2;
            break;
    }

}

function resultSoftReset(){
    updateDisplay(result.toString());
    secondValue = "";
    currentOperation = "";
    firstValue = result.toString();
}

function reverseSignal(value){
    value = Number(value);
    value *= -1;
    return value.toString();
}

function addDot(value){
    if (!value){
        return (value+"0.");
    } else {
        return value+".";
    }
}