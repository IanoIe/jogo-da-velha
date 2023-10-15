const cellElelments = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winnningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winingMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restar-button]");

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
    isCircleTurn = false;    
    
    for (const cell of cellElelments) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true});
    }

    setBoardHoverClass()
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

const checkForDraw = () => {
    return [...cellElelments].every((cell) => {
       return cell.classList.contains("x") || cell.classList.contains("circle");
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    setBoardHoverClass();
};

const handleClick = (e) => {
    // Colocar a marca X ou Circulo
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    // Verificar por vitória
    const isWin = checkForWin(classToAdd);
    
    // Verificar por empate
    const isDraw = checkForDraw();
    
    if (isWin) {
        endGame(false);
    } else if (isDraw){
        endGame(true)
    }
    // Mudar símbolo
    swapTurns();
};

startGame();

restartButton.addEventListener("click", startGame);