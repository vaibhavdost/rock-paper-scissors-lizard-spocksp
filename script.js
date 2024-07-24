let userScore = 0;
let computerScore = 0;
let userName = "User";
let gameHistory = [];
let gameMode = 'rps';

const startButton = document.getElementById("start-button");
const endButton = document.getElementById("end-button");
const restartButton = document.getElementById("restart-button");
const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultP = document.getElementById("result");
const rockDiv = document.getElementById("rock");
const paperDiv = document.getElementById("paper");
const scissorsDiv = document.getElementById("scissors");
const lizardDiv = document.getElementById("lizard");
const spockDiv = document.getElementById("spock");
const finalScoreP = document.getElementById("final-score");
const historyList = document.getElementById("history-list");
const usernameInput = document.getElementById("username");
const userLabel = document.getElementById("user-label");
const gameModeSelect = document.getElementById("game-mode");
const gameTitle = document.getElementById("game-title");
const userHandImage = document.getElementById("user-image");
const computerHandImage = document.getElementById("computer-image");

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'flex';
}

function getComputerChoice() {
    const choices = gameMode === 'rps' ? ['rock', 'paper', 'scissors'] : ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function convertToWord(choice) {
    switch(choice) {
        case 'rock':
            return "Rock";
        case 'paper':
            return "Paper";
        case 'scissors':
            return "Scissors";
        case 'lizard':
            return "Lizard";
        case 'spock':
            return "Spock";
    }
}

function updateHandImages(userChoice, computerChoice) {
    userHandImage.src = `images/${userChoice}.png`;
    computerHandImage.src = `images/${computerChoice}.png`;
}

function win(userChoice, computerChoice) {
    userScore++;
    userScoreSpan.innerHTML = userScore;
    resultP.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)}. ${userName} wins!`;
    gameHistory.push(`${userName} chose ${convertToWord(userChoice)}, Computer chose ${convertToWord(computerChoice)}: ${userName} wins!`);
    updateHistory();
}

function lose(userChoice, computerChoice) {
    computerScore++;
    computerScoreSpan.innerHTML = computerScore;
    resultP.innerHTML = `${convertToWord(computerChoice)} beats ${convertToWord(userChoice)}. Computer wins.`;
    gameHistory.push(`${userName} chose ${convertToWord(userChoice)}, Computer chose ${convertToWord(computerChoice)}: Computer wins.`);
    updateHistory();
}

function draw(userChoice, computerChoice) {
    resultP.innerHTML = `It's a draw! Both chose ${convertToWord(userChoice)}.`;
    gameHistory.push(`${userName} chose ${convertToWord(userChoice)}, Computer chose ${convertToWord(computerChoice)}: It's a draw.`);
    updateHistory();
}

function updateHistory() {
    historyList.innerHTML = "";
    gameHistory.forEach(record => {
        const li = document.createElement("li");
        li.textContent = record;
        historyList.appendChild(li);
    });
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    updateHandImages(userChoice, computerChoice);
    switch (userChoice + computerChoice) {
        case 'rockscissors':
        case 'rocklizard':
        case 'paperrock':
        case 'paperspock':
        case 'scissorspaper':
        case 'scissorslizard':
        case 'lizardspock':
        case 'lizardpaper':
        case 'spockscissors':
        case 'spockrock':
            win(userChoice, computerChoice);
            break;
        case 'rockpaper':
        case 'rockspock':
        case 'paperscissors':
        case 'paperlizard':
        case 'scissorsrock':
        case 'scissorsspock':
        case 'lizardrock':
        case 'lizardscissors':
        case 'spockpaper':
        case 'spocklizard':
            lose(userChoice, computerChoice);
            break;
        default:
            draw(userChoice, computerChoice);
            break;
    }
}

function main() {
    rockDiv.addEventListener('click', function () {
        game("rock");
    });

    paperDiv.addEventListener('click', function () {
        game("paper");
    });

    scissorsDiv.addEventListener('click', function () {
        game("scissors");
    });

    lizardDiv.addEventListener('click', function () {
        game("lizard");
    });

    spockDiv.addEventListener('click', function () {
        game("spock");
    });

    startButton.addEventListener('click', function () {
        userName = usernameInput.value || "User";
        userLabel.textContent = `${userName}: `;
        gameMode = gameModeSelect.value;
        gameTitle.textContent = gameMode === 'rps' ? "Rock Paper Scissors" : "Rock Paper Scissors Lizard Spock";
        document.querySelectorAll('.rpsls-only').forEach(element => {
            element.style.display = gameMode === 'rps' ? 'none' : 'inline-block';
        });
        showPage('game-page');
    });

    endButton.addEventListener('click', function () {
        finalScoreP.innerHTML = `${userName}: ${userScore} - Computer: ${computerScore}`;
        showPage('score-page');
    });

    restartButton.addEventListener('click', function () {
        userScore = 0;
        computerScore = 0;
        userScoreSpan.innerHTML = userScore;
        computerScoreSpan.innerHTML = computerScore;
        resultP.innerHTML = "Make your move!";
        gameHistory = [];
        updateHistory();
        showPage('start-page');
    });
}

main();
