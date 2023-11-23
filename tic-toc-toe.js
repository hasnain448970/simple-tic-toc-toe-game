let winning_positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let selectedPositions = [2, 2, 2, 2, 2, 2, 2, 2, 2];
let activePlayer = "x";
let won = false;

document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (!won) {
            changeUi(e);
    
        }
    
    });
});

function changeUi(e) {
    if (!e.target.classList.contains("icon")) {
        if (selectedPositions[e.target.dataset.id] === 2 && activePlayer === "x") {
            changeCellForPlayer(e);
            if (checkPlayerState()) {
                won = true;
                resetGame();
            } else {
                activePlayer = "0";
                setTimeout(changeCellForComputer, 500); // Delay computer move for clarity
            }
        }
    }
}

function checkPlayerState() {
    for (let i = 0; i < winning_positions.length; i++) {
        if (
            selectedPositions[winning_positions[i][0]] === "x" &&
            selectedPositions[winning_positions[i][1]] === "x" &&
            selectedPositions[winning_positions[i][2]] === "x"
        ) {
            return true;
        } else if (
            selectedPositions[winning_positions[i][0]] === "0" &&
            selectedPositions[winning_positions[i][1]] === "0" &&
            selectedPositions[winning_positions[i][2]] === "0"
        ) {
            return true;
        }
    }
    return false;
}

function changeCellForPlayer(e) {
    e.target.innerHTML = `<i class="fa-solid fa-xmark fa-2x icon"></i>`;
    selectedPositions[e.target.dataset.id] = "x";
}

function changeCellForComputer() {
    let randomPosition = generateRandom();
    while (selectedPositions[randomPosition] !== 2) {
        randomPosition = generateRandom();
    }

    let element = document.querySelector(`button[data-id="${randomPosition}"]`);
    element.innerHTML = `<i class="fa-sharp fa-solid fa-o"></i>`;
    selectedPositions[randomPosition] = "0";

    if (checkPlayerState()) {
        won = true;
        setTimeout(resetGame, 500); // Delay reset for clarity
    } else {
        activePlayer = "x";
    }
}

function generateRandom() {
    return Math.floor(Math.random() * 9);
}

function resetGame(c=0) {
    let message = document.createElement("div");
    message.innerHTML = `<div class="text-center"><h3 class="font-mono text-lg tracking-widest my-2">Player ${activePlayer} won!</h3><button class="px-2 py-1 border-none bg-slate-600 my-2">Replay</button></div>`;
    if(c==9){
    message.querySelector("h3").innerHTML="not won or lost"
    }
    document.body.append(message);
    message.querySelector("button").addEventListener("click", () => {
        location.reload();
    });
}
