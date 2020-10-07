
const calc ={
    screenValue: "0",
    operand1: null,
    enterOperand2: false,
    operator: null,
};
h1 = document.querySelector('h1');
h1.textContent = 'The Odin Project: Basic Calculator by Cendevs'

function valueInput(data){
    const screenValue = calc.screenValue;
    const enterOparand2 = calc.enterOperand2;
    //const { screenValue } = calc;
    if(enterOparand2 === true){
        calc.screenValue = data;
        calc.enterOperand2 = false;
    }else{
        calc.screenValue = screenValue === '0' ? data : screenValue + data;
    }
    console.log(calc)
}

function backSpace(){
   calc.screenValue.value = calc.screenValue.value.slice(0, -1); 
}


function decimalPoint(dot){
    if(!calc.screenValue.includes(dot)){
        calc.screenValue += dot;
    }
}

function operation(next){
    const operand1 = calc.operand1; 
    const screenValue = calc.screenValue; 
    const operator = calc.operator;
    
    const input = parseFloat(screenValue);

    if(operator && calc.enterOperand2){
        calc.operator = next;
        console.log(calc)
        return;
    }
    
    if(operand1 === null && !isNaN(input)){
        calc.operand1 = input;
    }else if(operator){
        const res = calculation(operand1, input, operator);
        calc.screenValue = `${parseFloat(res.toFixed(7))}`;
        calc.operand1 = res;
    }
    calc.enterOperand2 = true;
    calc.operator = next;
    console.log(calc);
}

function calculation(operand1, operand2, operator){
    if(operator === '+'){
        return add(operand1, operand2);   
    }else if(operator === '-'){
        return subtract(operand1, operand2);
    }else if(operator === '*'){
        return multiply(operand1, operand2);
    }else if(operator === '/'){
        return divide(operand1, operand2);
    }
    return operand2;

}

function add(a, b){
    return a + b;

}
function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}

function clearMemory(){
    calc.screenValue = '0';
    calc.operand1 = null;
    calc.enterOperand2 = false;
    calc.operator = null;
    console.log(calc);
}

function screenDisplay(){
    const display = document.querySelector('#calcScreen');
    display.value = calc.screenValue;
}
screenDisplay();


const buttons = document.querySelector('.keys-grid');
buttons.addEventListener('click', (event)=>{
    const target = event.target;
    
    if(!target.matches('button')){
        return;
    }

    if(target.classList.contains('operator')){
        operation(target.value)
        screenDisplay()
        console.log('operator', target.value)
        return;
    }

    if(target.classList.contains('decimal')){
        decimalPoint(target.value);
        screenDisplay();
        console.log('decimal', target.value)
        return;
    }

    if(target.classList.contains('reset')){
        clearMemory(target.value);
        screenDisplay();
        console.log('reset', target.value)
        return;
    }

    if(target.classList.contains('del')){
        backSpace(target.value);
        screenDisplay();
        console.log('del', target.value)
        return;
    }

    valueInput(target.value);
    screenDisplay();
    console.log('digit', target.value);
});



