let displayValue = "0";
let firstValue = "";
let secondValue = "";
let currentOperation = "";

const allButtons = document.querySelectorAll("button");
const display = document.querySelector("#display");

allButtons.forEach(button =>{
    button.addEventListener("click", () => {
        if (button.classList.contains("operand") && firstValue.length < 9 && !currentOperation){
            firstValue += button.value;
            updateDisplay(firstValue);
        } else if (button.classList.contains("reset")){
            reset();
        } else if (button.classList.contains("operand") && secondValue.length < 9 && currentOperation){
            secondValue += button.value;
            updateDisplay(secondValue);
        } else if(button.classList.contains("operator") && firstValue){
            currentOperation = button.textContent;
        }
    })
});

function updateDisplay(value){
    display.textContent = value;
}

function reset(){
    updateDisplay("0");
    firstValue = "";
    secondValue = "";
    currentOperation = "";
}