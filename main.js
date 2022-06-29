// Stored HTML elements
const gameArea = document.getElementById("gameArea");
const startGameButton = document.getElementById("startGameButton");
const messageArea = document.getElementById("messageArea");
const playerPad = document.getElementById("playerPad");

// Gameplay objects
let controls = {
    ArrowLeft: false,
    ArrowRight: false
}

let player = {
    speed: 5,
    score: 0,
    x: 250
};



// Event Listeners
startGameButton.addEventListener("click", startGame);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);


// Functions
function startGame() {
    
    messageArea.setAttribute("class", "messageAreaRemove"); // remove message area

    player.start = true;
    player.score = 0;

    window.requestAnimationFrame(playGame);

    playGame();

}

function playGame() {

    let gameAreaBox = gameArea.getBoundingClientRect();

    if (player.start){
        // console.log("true");
        
        if (controls.ArrowLeft && player.x > gameAreaBox.width) {player.x -= player.speed;}
        if (controls.ArrowRight && player.x <= gameAreaBox.width) {player.x += player.speed;}

       
        playerPad.style.left = player.x + "px";

        window.requestAnimationFrame(playGame);
    }

}

function pressOn(e) {
    e.preventDefault()
    controls[e.key] = true;
}

function pressOff(e) {
    e.preventDefault()
    controls[e.key] = false;
}