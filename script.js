// initialize configurations
let minX = 5;
let minY = 5;
let maxX = 10;
let maxY = 10;
let skip = true;
let triesAllowed = 5;

// elements
const equationDisplay = document.querySelector('#equation');
const input = document.querySelector('#answer');
const msg = document.querySelector('#result');
const btnSubmit = document.querySelector('#submit');
const btnSkip = document.querySelector('#skip');
const btnSettings = document.querySelector('#settings');
const settingsWin = document.querySelector('#settings-window');
const btnRestart = document.querySelector('#restart');
const btnClose = document.querySelectorAll('.close');
const btnGo = document.querySelectorAll('.start');

// constants
const bgColor = '#000042';
const round = 100;
const operators = ['+', '-', 'x', '÷'];

// equation initializers
let tries = 0;
let x = 0;
let y = 0;
let opSymbol = operators[0];
let equation = x + ' ' + opSymbol + ' ' + y;

// get values from settings
function getConfigurations() {
    // number ranges
    minX = Number(document.querySelectorAll('.x-range')[0].value);
    maxX = Number(document.querySelectorAll('.x-range')[1].value);
    minY = Number(document.querySelectorAll('.y-range')[0].value);
    maxY = Number(document.querySelectorAll('.y-range')[1].value);

    // skip toggle
    skip = document.querySelector('#skip-toggle').checked;
    if (!skip) {
        btnSkip.classList.add('hidden');
    } else {
        btnSkip.classList.remove('hidden');
    }

    // number of tries
    triesAllowed = Number(document.querySelector('#tries-select').value);
}

// reset settings to unchanged values
function resetConfigurations() {
    // number ranges
    document.querySelectorAll('.x-range')[0].value = minX;
    document.querySelectorAll('.x-range')[1].value = maxX;
    document.querySelectorAll('.y-range')[0].value = minY;
    document.querySelectorAll('.y-range')[1].value = maxY;

    // skip toggle
    document.querySelector('#skip-toggle').checked = skip;

    // number of tries
    Number(document.querySelector('#tries-select').value) = triesAllowed;
}

// random numbers function
function random(min, max) {
    // pick number from min to max
    return Math.round(min + Math.random() * (max - min));
}

// create random equation
function getEquation() {
    // pick random numbers and operators
    x = random(minX, maxX);
    y = random(minY, maxY);
    opSymbol = operators[random(0,3)];
    
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
    if (triesAllowed == 0) {
        msg.innerHTML = 'Try again!';
        msg.style.color = 'red';
    } else {
        // skip question if go over # of tries
        if (tries < triesAllowed) {
            msg.innerHTML = (triesAllowed - tries) + ' tries left...';
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
    input.focus();
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
    input.focus();
})

// skip question
btnSkip.addEventListener('click', () => {
    changeColor('yellow');
    setTimeout(() => {changeColor(bgColor)}, 400); 
    resetEquation();
    input.focus();
})

// submit when enter is pressedd
input.addEventListener('keydown', (key) => {
    if (key.code == "Enter") {
        btnSubmit.click();
    } else if (skip && (key.code == 'ShiftLeft' || key.code == 'ShiftRight')) {
        btnSkip.click();
    }
})

// open settings window
btnSettings.addEventListener('click', () => {
    document.querySelector('#settings-window').style.display = 'block';
    document.querySelector('#settings-window').style.position = 'absolute';
})

// close windows
for (let i = 0; i < btnClose.length; i++) {
    btnClose[i].addEventListener('click', () => {
        let window = document.querySelector('#' + btnClose[i].alt);
        window.style.display = 'none';
    })
}

// close setting window
btnClose[0].addEventListener('click', () => {
    resetConfigurations();
})

// start / restart
for (let i = 0; i <btnGo.length; i++) {
    btnGo[i].addEventListener('click', () => {
        changeColor('white');
        getConfigurations();
        setTimeout(() => {changeColor(bgColor)}, 400);
        resetEquation();
        for (let j = 0; j < btnClose.length; j++) {
            btnClose[j].click();
        }
    })
}

// set direction
document.querySelector('#direction').innerHTML = "Solve the following equation. If the answer is not an integer, round to the nearest " + round + 'th.';
document.querySelector('body').style.backgroundColor = '#000042';
// get first equation
getConfigurations();
getEquation();