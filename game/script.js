const playerName = localStorage.getItem("playerName") || "Player";
document.querySelector("h2 span").textContent = playerName;

const Table = document.getElementById('game-table')
const ScoreDisplay = document.getElementById('score')
const Footer = document.getElementById('Footer')

const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

let score = 100

let array = []
for (let i = 0; i < 100; i++) {
    array[i] = i + 1
}

array = array.sort(() => Math.random() - 0.5)

let count = 0

for (let i = 1; i <= 10; i++) {
    let tr = document.createElement('tr')
    for (let j = 1; j <= 10; j++) {
        let td = document.createElement('td')
        td.setAttribute('id', array[count])
        td.addEventListener('click', clickHandler)
        tr.append(td)
        count++
    }
    Table.append(tr)
}

function clickHandler(e) {
    let cellValue = e.target.id
    e.target.removeEventListener('click', clickHandler)
    e.target.textContent = cellValue
    e.target.classList.add('not-allowed')
    validateClick(cellValue)
}

function validateClick(cellValue) {
    if (cellValue == 1) {
        youWin()
    }
    else if (primes.includes(parseInt(cellValue))) {
        youLose(cellValue)
    }
    else {
        showMultiples(cellValue)
    }
}

function showMultiples(cellValue) {
    score--
    ScoreDisplay.textContent = score   
    for (let i = 1; cellValue * i <= 100; i++) {
        let multiple = cellValue * i
        let cell = document.getElementById(multiple)
        cell.removeEventListener('click', clickHandler)
        cell.textContent = multiple
        cell.classList.add('not-allowed')
    }
    Footer.textContent = 'Try again.. Be sure not to click primes'
}

function youLose(cellValue) {
    let cell = document.getElementById(cellValue)
    cell.style.background = '#3a0000';
    cell.style.color = '#ff3333';
    for (let i = 1; i <= 100; i++) {
        let cell = document.getElementById(i);
        if (!cell.classList.contains('not-allowed')) {
            cell.style.background = '#1a0000';
            cell.style.color = '#ff3333';
            cell.textContent = cell.id;
            cell.classList.add('not-allowed');
            cell.removeEventListener("click", clickHandler);
        }
    }
    Footer.textContent = 'You Lose... Click Reset to try again'
}

function youWin() {
    let cell = document.getElementById('1')
    cell.style.background = '#003a00';
    cell.style.color = '#39ff14';
    showMultiples(1)
    Footer.textContent = 'You Win... Click Reset to try if your lucky again'
}