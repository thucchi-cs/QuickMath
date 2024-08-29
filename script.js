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

// create random equation
function getEquation() {
    // pick random numbers and operators
    let x = random(maxX);
    let y = random(maxY);
    let op = operators[random(3)];

    // display equation
    let equation = x + ' ' + op + ' ' + y;
    console.log(equation);
    equationDisplay.innerHTML = equation;
}

getEquation();

// clear input when sumbitted
btn.addEventListener('click', () => {
    let inpt = document.querySelector('input');
    inpt.value = '';
    console.log('clear');
})

// submit when enter is pressedd
input.addEventListener('keydown', (key) => {
    if (key.code == "Enter") {
        document.querySelector('Button').click();
        console.log('enter');
    }
})