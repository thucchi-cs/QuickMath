// constants
const maxX = 10;
const maxY = 10;
const operators = ['+', '-', 'x', '÷'];
const equationDisplay = document.querySelector('#equation');
const input = document.querySelector('#answer');
const msg = document.querySelector('#result');
const btnSubmit = document.querySelector('#submit');
const btnSkip = document.querySelector('#skip');
const bgColor = '#000042';
let triesAllowed = 5;
let tries = 0;
let round = 100;

// equation initializers
let x = 0;
let y = 0;
let opSymbol = operators[0];
let equation = x + ' ' + opSymbol + ' ' + y;

// random numbers function
// pick number from 0 to max
function random(max) {
    return Math.round(Math.random() * max);
}

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
            return Math.round((x/y) * round) / round;
    }
}

// update number of tries
function checkTries() {
    tries += 1
    // do nothing if tries is unlimited
    if (triesAllowed == 'unlimited') {
        msg.innerHTML = 'Try again!';
        msg.style.color = 'red';
    } else {
        // skip question if go over # of tries
        if (tries < triesAllowed) {
            msg.innerHTML = (triesAllowed - tries) + ' tries left';
            msg.style.color = 'red';
        } else {
            resetEquation();
        }
    }
}

// next question
function resetEquation() {
    msg.innerHTML = '';
    tries = 0;
    getEquation();
}

// change background color
function changeColor(color) {
    document.querySelector('body').style.backgroundColor = color;
}

// handle input when submitted
btnSubmit.addEventListener('click', () => {
    // get right answer
    let answer = getAnswer();
    console.log(answer);
    // check if input is numeric
    if (isNaN(Number(input.value))) {
        msg.innerHTML = 'Numbers only!';
        msg.style.color = bgColor;
        console.log(bgColor);
        setTimeout(() => {msg.style.color = 'red'}, 100);
    } else {
        // check right answer
        if (Number(input.value) == answer) {
            changeColor('#00cc00');
            setTimeout(() => {changeColor(bgColor)}, 400);
            resetEquation();
        } else {
            // give tries for wrong answers
            changeColor('red');
            setTimeout(() => {changeColor(bgColor)}, 400); 
            checkTries();
        }
    }
    input.value = '';
})

// skip question
btnSkip.addEventListener('click', () => {
    changeColor('yellow');
    setTimeout(() => {changeColor(bgColor)}, 400); 
    resetEquation();
})

// submit when enter is pressedd
input.addEventListener('keydown', (key) => {
    if (key.code == "Enter") {
        btnSubmit.click();
    } else if (key.code == 'ShiftLeft' || key.code == 'ShiftRight') {
        btnSkip.click();
    }
})


// set direction
document.querySelector('#direction').innerHTML = "Solve the following equation. If the answer is not an integer, round to the nearest " + round + 'th.';
// get first equation
getEquation();