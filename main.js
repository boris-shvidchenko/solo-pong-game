// Stored HTML elements
const gameArea = document.getElementById("gameArea");
const startGameButton = document.getElementById("startGameButton");
const messageArea = document.getElementById("messageArea");
const gameInfo = document.getElementById("gameInfo");
const playerPad = document.getElementById("playerPad");
const ballElem = document.getElementById("ball");
const score = document.getElementById("score");
const scoreText = document.getElementById("scoreText");

// Gameplay objects and variables
let controls = {
    ArrowLeft: false,
    ArrowRight: false
};

let player = {
    speed: 5,
    score: 0,
    x: 250,
};

let ball = {
    ballSpeed: 4,
    ballX: 716,
    ballY: 696,
};

let moveBall = true;
let gameScore = 0;

// Event Listeners
startGameButton.addEventListener("click", startGame);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

// Functions
function startGame() {
    console.log("game started");
    messageArea.setAttribute("class", "remove"); // remove message area
    console.log("remove message area");
    score.removeAttribute("class", "remove");    // add score area
    console.log("score removed");
    player.start = true;
    console.log(player.start);
    player.score = 0;
    console.log(player.score);
    window.requestAnimationFrame(playGame);
    playGame();
}

function playGame() {
    ballMoves();
    if (player.start){
        if (controls.ArrowLeft && player.x > 0) {player.x -= player.speed;}
        if (controls.ArrowRight && player.x < 495) {player.x += player.speed;}   
        playerPad.style.left = player.x + "px";
        window.requestAnimationFrame(playGame);
    }
}

function ballMoves() {
    if (moveBall) {
        if (ball.ballY > -1) {
            ball.ballY -= ball.ballSpeed;
            ballElem.style.top = ball.ballY + "px"; 
        } else {
            moveBall = false;
        }
    } else {
        if (ballHit(playerPad,ballElem)) {
            scoreText.innerText = ++gameScore;
            moveBall = true;
        }         
        else if (ball.ballY > 725) {
            endGame();
        } else {
            ball.ballY += ball.ballSpeed;
            ballElem.style.top = ball.ballY + "px"; 
        }      
    }
}

function ballHit(a,b) {
    let playerPadDimension = a.getBoundingClientRect();
    let ballElemDimension = b.getBoundingClientRect();
    return !(
        (playerPadDimension.bottom < ballElemDimension.top) ||
        (playerPadDimension.top > ballElemDimension.bottom) ||
        (playerPadDimension.right < ballElemDimension.left) ||
        (playerPadDimension.left > ballElemDimension.right)
    );
}

function pressOn(e) {
    e.preventDefault();
    controls[e.key] = true;
}

function pressOff(e) {
    e.preventDefault();
    controls[e.key] = false;
}

function endGame() {
    player.start = false;
    messageArea.removeAttribute("class", "remove"); // add message area
    gameInfo.innerText = `You lost! You scored ${gameScore} points.`;
    startGameButton.style.display = "none";
    setTimeout(() => {          // after 3 seconds, reload game/page
        location.reload()
    }, 3000);
}


