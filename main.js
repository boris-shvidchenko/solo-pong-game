// Stored HTML elements
const gameArea = document.getElementById("gameArea");
const startGameButton = document.getElementById("startGameButton");
const gameTitle =document.getElementById("title");
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
    ballX: 290,
    ballY: 696,
};

let moveBallVert = true;
let moveBallHor = true;
let gameScore = 0;

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
    if (moveBallVert) {                                 // ball moves up
        if (ball.ballY > -1) {
            ball.ballY -= ball.ballSpeed;
            ballElem.style.top = ball.ballY + "px"; 
            ballHitWall();
        } else {
            moveBallVert = false;
        }
    } else {                    
        if (ballHitPad(playerPad,ballElem)) {          // ball touches player pad
            scoreText.innerText = ++gameScore;
            if (parseInt(scoreText.innerText) % 20 == 0) {ball.ballSpeed += 1;} // increase ball speed every 20 rounds 
            moveBallVert = true;
        }         
        else if (ball.ballY > 725) {                   // ball touches floor
            endGame();
        } else {                                       // ball moves down
            ball.ballY += ball.ballSpeed;
            ballElem.style.top = ball.ballY + "px"; 
            ballHitWall();
        }      
    }
}

function ballHitPad(a,b) {
    let playerPadDimension = a.getBoundingClientRect();
    let ballElemDimension = b.getBoundingClientRect();
    return !(
        (playerPadDimension.bottom < ballElemDimension.top) ||
        (playerPadDimension.top > ballElemDimension.bottom) ||
        (playerPadDimension.right < ballElemDimension.left) ||
        (playerPadDimension.left > ballElemDimension.right)
    );
}

function ballHitWall() {
    if ((moveBallHor) && (ball.ballX > 0)) {      
        ball.ballX -= ball.ballSpeed;
        ballElem.style.left = ball.ballX + "px";
    } else if ((moveBallHor) && (ball.ballX = 1)) {
        moveBallHor = false;
    } else if ((!moveBallHor) && (ball.ballX < 580 )) {
        ball.ballX += ball.ballSpeed;
        ballElem.style.left = ball.ballX + "px";
    } else if ((!moveBallHor) && (ball.ballX = 575)) {
        moveBallHor = true;
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

function endGame() {
    player.start = false;
    messageArea.removeAttribute("class", "remove"); // add message area
    gameInfo.innerHTML = `You lost! <br> Your score: ${gameScore}`;
    gameInfo.style.fontSize = "2em";
    startGameButton.style.display = "none";
    gameTitle.style.display = "none";
    setTimeout(() => {          // after 3 seconds, reload game/page
        location.reload()
    }, 3500);
}




