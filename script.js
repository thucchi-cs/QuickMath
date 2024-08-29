// checking website
let hello = document.createElement('h1');
hello.innerHTML = "Quick Math Prac";
document.querySelector('body').appendChild(hello);


// random numbers function
// pick number from 0 to max
function random(max) {
    return Math.round(Math.random() * max);
}

// constants
const maxX = 10;
const maxY = 10;
const operators = ['+', '-', 'x', '÷'];
const equationDisplay = document.querySelector('#equation');
const input = document.querySelector('#answer');
const msg = document.querySelector('#result');
const btn = document.querySelector('Button');

// equation initializers
let x = 0;
let y = 0;
let opSymbol = operators[0];
let equation = x + ' ' + opSymbol + ' ' + y;

// create random equation
function getEquation() {
    // pick random numbers and operators
    x = random(maxX);
    y = random(maxY);
    opSymbol = operators[random(3)];

    // display equation
    equation = x + ' ' + opSymbol + ' ' + y;
    console.log(equation);
    equationDisplay.innerHTML = equation;
}

// get correct answers of equation
function getAnswer() {
    switch (operators.indexOf(opSymbol)) {
        case 0:
            return x + y;
        case 1:
            return x - y;
        case 2:
            return x * y;
        case 3:
            return x/y;
    }
}

getEquation();

// handle input when submitted
btn.addEventListener('click', () => {
    // get right answer
    let answer = getAnswer();

    // check if input is numeric
    if (isNaN(Number(input.value))) {
        msg.innerHTML = 'numbers only';
    } else {
        // reset if all good
        msg.innerHTML = '';
        getEquation();
    }
    input.value = '';
})

// submit when enter is pressedd
input.addEventListener('keydown', (key) => {
    if (key.code == "Enter") {
        document.querySelector('Button').click();
    }
})