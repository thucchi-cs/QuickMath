// initialize configurations
let minX = 5;
let minY = 5;
let maxX = 10;
let maxY = 10;
let skip = true;
let triesAllowed = 5;
let allowedOperators = [];
let time = 10;
let timerOn = false;
let setMinute = 0;
let setSecond = 30;

// elements
const equationDisplay = document.querySelector('#equation');
const input = document.querySelector('#answer');
const msg = document.querySelector('#result');
const timerDisplay = document.querySelector('#timer');
const scoreDisplay = document.querySelector('#score');
const historyDisplay = document.querySelector('#history');
const btnSubmit = document.querySelector('#submit');
const btnSkip = document.querySelector('#skip');
const btnSettings = document.querySelectorAll('.open-settings');
const settingsWin = document.querySelector('#settings-window');
const resultsWin = document.querySelector('#results-window');
const endWin = document.querySelector('#end-window');
const windows = [settingsWin, resultsWin, endWin];
const btnRestart = document.querySelector('#restart');
const btnClose = document.querySelectorAll('.close');
const btnGo = document.querySelectorAll('.start');
const btnResults = document.querySelectorAll('.open-results');

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
let score = 0;
let count = 0;
let history = [];

// reset all when restart
function resetAll() {
    getConfigurations();
    resetHistory();
    getEquation();
    count = 0;
    score = 0;
    tries = 0;
    scoreDisplay.innerHTML = score + ' / ' + count;
    msg.innerHTML = '';
    input.value='';
    input.focus();
}

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

    // allowed operations
    allowedOperators = [];
    for (let i = 0; i < operators.length; i++) {
        if (document.querySelectorAll('#operations')[i].checked) {
            allowedOperators.push(operators[i]);
        }
    }
    console.log(allowedOperators);
    
    // timer
    timerOn = document.querySelector('#timer-on').checked
    if (timerOn) {
        setMinute = document.querySelector('#minute').value
        setSecond = document.querySelector('#second').value;
        time = (Number(setMinute) * 60) + Number(setSecond) + 1;
        let second = Number(setSecond);
        let minute = Number(setMinute);
        let between = (second < 10) ? ':0' : ':';
        document.querySelector('#end-time').innerHTML = minute + between + second;;
    } else {
        time = 0;
        timerDisplay.innerHTML = '';
    }
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
    document.querySelector('#tries-select').value = triesAllowed;

    // allowed operations
    for (let i = 0; i < operators.length; i++) {
        document.querySelectorAll('#operations')[i].checked = allowedOperators.includes(operators[i]);
    }

    // timer
    document.querySelector('#timer-on').checked = timerOn;
    document.querySelector('#minute').disabled = !timerOn;
    document.querySelector('#second').disabled = !timerOn;
    document.querySelector('#minute').value = setMinute;
    document.querySelector('#second').value = setSecond;
}

// problems to be saved in history
class Problem {
    // constructor
    constructor(pEquation) {
        this.equation = pEquation;
        this.answer = getAnswer();
        this.tries = [];
        this.color = null;
    }

    // add an answer to the try column
    addTries(pAnswer) {
        this.tries.push(' ' + pAnswer);
        this.getColor();
    }

    // get color based on correctness of answer
    getColor() {
        if ((this.tries[this.tries.length - 1] == ' skipped') || (this.tries[this.tries.length - 1] == ' timed out')) {
            this.color = 'orange';
        } else if (this.tries[this.tries.length - 1] == this.answer) {
            this.color = '#00cc00';
        } else {
            this.color = '#ff3030';
        }
    }
}

// add a question to the history tab
function updateHistory() {
    let thisProblem = history[history.length - 1];
    let newRow = document.createElement('tr');
    let newEquation = document.createElement('td');
    let newTries = document.createElement('td');
    let newAnswer = document.createElement('td');

    newRow.style.color = thisProblem.color;
    newEquation.innerHTML = thisProblem.equation;
    newTries.innerHTML = thisProblem.tries;
    newAnswer.innerHTML = thisProblem.answer;
    newRow.appendChild(newEquation);
    newRow.appendChild(newAnswer);
    newRow.appendChild(newTries);
    console.log(historyDisplay.firstChild);
    historyDisplay.insertBefore(newRow, historyDisplay.firstChild);
}

// delete all history when restart
function resetHistory() {
    history = [];
    while(historyDisplay.firstChild) {
        historyDisplay.removeChild(historyDisplay.lastChild);
    }
    console.log('hello')
}

// random numbers function
function random(min, max) {
    // pick number from min to max
    return Math.round(min + Math.random() * (max - min));
}

// create random equation
function getEquation() {
    // pick random numbers and operators
    opSymbol = allowedOperators[random(0,allowedOperators.length - 1)];
    do {
        x = random(minX, maxX);
        y = random(minY, maxY);
    } while ((opSymbol == '÷') && (y == 0));
    
    // display equation
    let xDisplay = (x < 0) ? ('(' + x + ')') : (x);
    let yDisplay = (y < 0) ? ('(' + y + ')') : (y);
    equation = xDisplay + ' ' + opSymbol + ' ' + yDisplay;
    console.log(equation);
    equationDisplay.innerHTML = equation;

    // add to history list
    history.push(new Problem(equation));
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
            countScore(false);
        }
    }
}

// next question
function resetEquation() {
    msg.innerHTML = '';
    tries = 0;
    console.log(history);
    updateHistory();
    getEquation();
    input.focus();
}

// increment score every answer
function countScore(correct) {
    count += 1;
    score += correct ? 1 : 0;
    scoreDisplay.innerHTML = score + ' / ' + count;
}

// handle timer every second
function timer() {
    let pause = false;
    // check if timer should be paused - pause when a window is opened
    for (let i = 0; i < windows.length; i++) {
        if (!windows[i].classList.contains('hidden')) {
            pause = true;
            break;
        }
    }
    
    // increment timer when not paused
    if ((time > 0) && (!pause)) {
        time -= 1;

        // timer display
        let second = time % 60;
        let minute = (time - second) / 60;
        let between = (second < 10) ? ':0' : ':';
        timerDisplay.innerHTML = minute + between + second;

        // end session when time runs out
        if(time == 0) {
            history[history.length-1].addTries('timed out');
            updateHistory();
            endWin.classList.remove('hidden');
            document.querySelector('#score-display').innerHTML = scoreDisplay.innerHTML;
            input.blur();
        }
    }
}

// set up timer option in settings
function setTimerOption() {
    let minuteOption = document.querySelector('#minute');
    let secondOption = document.querySelector('#second');
    let option;
    for (let i = 0; i < 10; i++) {
        option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        minuteOption.appendChild(option);
    }
    for (let i = 0; i < 60; i++) {
        option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        secondOption.appendChild(option);
        if (i==30) {
            option.selected = true;
        }
    }
}

// enable/disable timer option
document.querySelector('#timer-on').addEventListener('click', () => {
    document.querySelector('#minute').disabled = !document.querySelector('#timer-on').checked;
    document.querySelector('#second').disabled = !document.querySelector('#timer-on').checked;
})

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
        history[history.length-1].addTries(Number(input.value));
        if (Number(input.value) == answer) {
            changeColor('#00cc00');
            setTimeout(() => {changeColor(bgColor)}, 400);
            resetEquation();
            countScore(true);
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
    changeColor('orange');
    setTimeout(() => {changeColor(bgColor)}, 400); 
    history[history.length-1].addTries('skipped');
    resetEquation();
    input.value='';
    countScore(false);
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
for(let i = 0; i < btnSettings.length; i++) {
    btnSettings[i].addEventListener('click', () => {
        document.querySelector('#settings-window').classList.remove('hidden');
        document.querySelector('#settings-window').querySelector('img').classList.remove('hidden');
        document.querySelector('#settings-results').classList.remove('hidden');
    })
}

// close windows
for (let i = 0; i < btnClose.length; i++) {
    btnClose[i].addEventListener('click', () => {
        let window = document.querySelector('#' + btnClose[i].alt);
        window.classList.add('hidden');
        let pause = false;
        for (let i = 0; i < windows.length; i++) {
            if (!windows[i].classList.contains('hidden')) {
                pause = true;
                break;
            }
        }
        if (!pause) {
            input.focus();
        }
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
        setTimeout(() => {changeColor(bgColor)}, 400);
        resetAll();
        for (let j = 0; j < btnClose.length; j++) {
            btnClose[j].click();
        }
    })
}


// open results window
for (let i = 0; i < btnResults.length; i++) {
    btnResults[i].addEventListener('click', () => {
        resultsWin.classList.remove('hidden');
    })
}

// start
document.querySelector('body').style.backgroundColor = '#000042';
setTimerOption();
resetAll();
setInterval(timer, 1000);
