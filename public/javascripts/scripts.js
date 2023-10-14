const cellElelments = document.querySelectorAll("[data-cell]");
const board = document.querySelectorAll("[data-board]");
const winnningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winingMessage = document.querySelector("[data-winning-message]");
const restarButton = document.querySelector("[data-restar-button]");

let isCircleTurn;

const winnningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    for (const cell of cellElelments) {
        cell.addEventListener("click", handleClick, {once: true});
    }
    isCircleTurn = false;

    board.classList.add("x");
    winingMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
    if(isDraw) {
        winnningMessageTextElement.innerHTML = "Empate!"
    } else {
        winnningMessageTextElement.innerHTML = isCircleTurn ?
           "O Venceu!" 
           : "X Venceu!"; 
    }
    winingMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
    return winnningCombinations.some(combination => {
        return combination.every(index => {
            return cellElelments[index].classList.contains(currentPlayer);
        })
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    board.classList.remove("circle")
    board.classList.remove("x")

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
};

const handleClick = (e) => {
    // Colocar a marca X ou Circulo
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    // Verificar por vitória
const isWin = checkForWin(classToAdd);
    if (isWin) {
        endGame(false);
    }

    // Verificar por empate

    // Mudar símbolo
    swapTurns();
};

startGame();

restarButton.addEventListener("click", startGame);