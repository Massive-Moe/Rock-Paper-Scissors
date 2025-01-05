const choices = ["rock", "paper", "scissors"];
const results = document.querySelector("#results");
const computer = document.querySelector(".computer");
const dots = document.querySelectorAll(".dots span");
console.log(dots.item(0).textContent);

let rounds = 0;

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
            return 1; // player wins
        } else { 
            return -1;// computer wins
        }
    }

    if (playerChoice == "paper") {
        if (computerChoice == "rock") {
            return 1; // player wins
        } else {
            return -1; // computer wins
        }
    }

    if (playerChoice == "scissors") {
        if (computerChoice == "paper") {
            return 1; // player wins
        } else {
            return -1; // computer wins
        }
    }
}

function playRound(event) {
    if (rounds >= 5) {
        rounds = 0;
        dots.forEach(dot => {
            dot.textContent = "◦";
            dot.style.color = "black";
        });
    }

    const playerChoice = event.currentTarget.getAttribute("id");
    buttons.forEach((button) => {
        button.style.outlineColor = "transparent";
    });
    event.currentTarget.style.outlineColor = "lightblue";
    const computerChoice = choices[getRandomInt(3)];
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
        results.textContent = "YOU WIN";
    } else if (winner == -1) {
        results.style.color = "red";
        dots.item(rounds).style.color = "red";
        results.textContent = "YOU LOSE";
    }
    dots.item(rounds).textContent = "•";
    rounds++;
}

const buttons = document.querySelectorAll(".buttons button");
buttons.forEach((button) => {
    button.addEventListener("click", playRound);
});
