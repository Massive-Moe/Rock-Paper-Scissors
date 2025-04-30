const choices = ["rock", "paper", "scissors"];
const results = document.querySelector("#results");
const computer = document.querySelector(".computer");
const dots = document.querySelectorAll(".dots span");
const overlay = document.querySelector(".overlay");
const overlay_winner_text = document.querySelector("#winner-text")
overlay.style.display = 'none';

let rounds = 0;
let playerPoints = 0;
let computerPoints = 0;

function replaceChar(origString, replaceChar, index) {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);
      
    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice == computerChoice) {
        return 0;
    }

    if (playerChoice == "rock") {
        if (computerChoice == "scissors"){
            playerPoints++;
            return 1; // player wins
        } else { 
            computerPoints++;
            return -1;// computer wins
        }
    }

    if (playerChoice == "paper") {
        if (computerChoice == "rock") {
            playerPoints++;
            return 1; // player wins
        } else {
            computerPoints++;
            return -1; // computer wins
        }
    }

    if (playerChoice == "scissors") {
        if (computerChoice == "paper") {
            playerPoints++;
            return 1; // player wins
        } else {
            computerPoints++;
            return -1; // computer wins
        }
    }
}

function reset() {
    overlay.style.display = 'none';
    playerPoints = 0;
    computerPoints = 0;
    rounds = 0;
    dots.forEach(dot => {
        dot.textContent = "◦";
        dot.style.color = "black";
    });
    computer.style.visibility = 'hidden';
    results.style.visibility = 'hidden';
}

function playRound(event) {
    const playerChoice = event.currentTarget.getAttribute("id");
    buttons.forEach((button) => {
        button.style.outlineColor = "transparent";
    });
    event.currentTarget.style.outlineColor = "lightblue";

    computer.style.visibility = 'visible';
    results.style.visibility = 'visible';
    const computerChoice = choices[getRandomInt(3)];
    // Capitalize first letter of text
    computer.querySelector("h2").textContent = `Computer chooses: ${replaceChar(computerChoice, computerChoice[0].toUpperCase(), 0)}`;
    computer.querySelector("img").src = `resources/${computerChoice}.webp`;
    
    const winner = getWinner(playerChoice, computerChoice);
    if (winner == 0) {
        results.style.color = "green";
        results.textContent = "DRAW";
        return;
    } else if (winner == 1) {
        results.style.color = "blue";
        dots.item(rounds).style.color = "blue";
        results.textContent = "PLAYER POINT";
    } else if (winner == -1) {
        results.style.color = "red";
        dots.item(rounds).style.color = "red";
        results.textContent = "COMPUTER POINT";
    }
    dots.item(rounds).textContent = "•";
    rounds++;

    if (playerPoints == 3 || computerPoints == 3){
        // Make overlay visible
        overlay.style.display = 'flex';
        if (playerPoints == 3) {
            overlay_winner_text.textContent = "YOU WIN!"
        } else {
            overlay_winner_text.textContent = "YOU LOSE!"
        }
    }
}

reset()

overlay.addEventListener("click", reset)
const buttons = document.querySelectorAll(".buttons button");
buttons.forEach((button) => {
    button.addEventListener("click", playRound);
});
