// Stored HTML elements
const gameArea = document.getElementById("gameArea");
const startGameButton = document.getElementById("startGameButton");
const messageArea = document.getElementById("messageArea");
const playerPad = document.getElementById("playerPad");
const ballElem = document.getElementById("ball");
const score = document.getElementById("score");

// Gameplay objects
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

// Event Listeners
startGameButton.addEventListener("click", startGame);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

// Functions
function startGame() {
    messageArea.setAttribute("class", "remove"); // remove message area
    score.removeAttribute("class", "remove");    // add score area
    player.start = true;
    player.score = 0;
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
    // ball.ballY -= ball.ballSpeed;
    // ballElem.style.top = ball.ballY + "px";

    if (ball.ballY >= -1) {
        ball.ballY -= ball.ballSpeed;
        ballElem.style.top = ball.ballY + "px"; 
    } else if (ball.ballY === -1){
        console.log("true");
        ball.ballY += ball.ballSpeed;
        ballElem.style.top = ball.ballY + "px"; 
    }
}

function pressOn(e) {
    e.preventDefault();
    controls[e.key] = true;
}

function pressOff(e) {
    e.preventDefault();
    controls[e.key] = false;
}
