﻿//Settings
// Game Configuration: defines different rounds with bounce counts, the index for the question, and ball speed
// For example :
// bounces: 2 - ball will bounce 2 times that round , 
// questionBounceIndex: 1 - after the bounces finish the question will be asked about the 1st wall the ball touches ,
// ballSpeed: 5 - this controls the speed the ball travels at .
// To add more rounds simply add another object to the array in this format : {bounces: nr, questionBounceIndex: nr, ballSpeed: nr},
const gameConfig = {
    rounds: [
        {bounces: 2, questionBounceIndex: 1, ballSpeed: 5},
        {bounces: 6, questionBounceIndex: 3, ballSpeed: 5},
        {bounces: 5, questionBounceIndex: 2, ballSpeed: 5},
    ],
}
//End of Settings

let ball, ballX, ballY, startTime, responseTime, animationFrameId;
let ballDirectionX = Math.random() < 0.5 ? 1 : -1;
let ballDirectionY = Math.random() < 0.5 ? 1 : -1;
let bounceCount = 0;
let questionAsked = false;
let bounceTimes = [];
let isGameRunning = false;
let totalRounds = gameConfig.rounds.length;
let score =0;
let currentRound = 0;

// Set the initial position of the ball in the center of the screen
function setInitialPosition() {
    ballX = window.innerWidth / 2 - ball.offsetWidth / 2;
    ballY = window.innerHeight / 2 - ball.offsetHeight / 2;
    
    ball.style.left =`${ballX}px`;
    ball.style.top = `${ballY}px`;
}

// Move the ball around the screen and detect wall collisions
function moveBall() {
    if(!isGameRunning) return;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (ballX + ball.offsetWidth >= screenWidth) {
        ballDirectionX *= -1;
        recordBounce('right');
    } else if (ballX <= 0) {
        ballDirectionX *= -1;
        recordBounce('left');
    }
    if (ballY + ball.offsetHeight >= screenHeight) {
        ballDirectionY *= -1;
        recordBounce('bottom');
    } else if (ballY <= 0) {
        ballDirectionY *= -1;
        recordBounce('top')
    }
    ballX += ballDirectionX * gameConfig.rounds[currentRound].ballSpeed;
    ballY += ballDirectionY * gameConfig.rounds[currentRound].ballSpeed;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    animationFrameId = requestAnimationFrame(moveBall);
}

// Record the bounce event and ask a question if all bounces are completed for the current round
function recordBounce(wall) {
    bounceCount++;
    bounceTimes.push(wall);
    const currentRoundConfig = gameConfig.rounds[currentRound];
    if(bounceCount === currentRoundConfig.bounces && !questionAsked) {
        askQuestion(currentRoundConfig.questionBounceIndex);
        endRound();
    }
}

// Display the question after the required number of bounces
function askQuestion(questionBounceIndex) {
    questionAsked = true;
    startTime = Date.now();
    document.getElementById("question-text").innerText = `Which wall did the ball hit on bounce number ${questionBounceIndex}?`;
    document.getElementById("question-container").classList.remove("hidden");
}

// Handle the player's answer selection
function selectAnswer(answer){
    disableButtons();
    responseTime = (Date.now() - startTime) / 1000;
    checkAnswer(answer);
    setTimeout(() => {
        document.getElementById("question-container").classList.add("hidden");
        document.getElementById("continue-btn").classList.remove("hidden");
    }, 1500);
}

// Check if the player's answer is correct and update the score
function checkAnswer(answer){
    const currentRoundConfig = gameConfig.rounds[currentRound];
    const correctAnswer = bounceTimes[currentRoundConfig.questionBounceIndex - 1];
    highlightCorrectAnswer(correctAnswer);
    if(answer === bounceTimes[currentRoundConfig.questionBounceIndex - 1]){
        score++;
    }
    document.getElementById("score").innerText = `${score} / ${totalRounds}`;
    document.getElementById("response-time").innerText = responseTime.toFixed(2);
    
}

// Start the game, resetting the score and other game parameters
function startGame(){
    document.getElementById("round-number").innerText = `1 / ${totalRounds}`;
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("continue-btn").classList.add("hidden");
    isGameRunning = true;
    enableButtons()
    resetGame();
    moveBall();
}

// Reset the game state and score for a new game
function resetGame(){
    
    document.getElementById("score-screen").classList.add("hidden");
    document.getElementById("reset-btn").classList.add("hidden");
    score = 0;
    currentRound = 0;
    bounceCount = 0;
    bounceTimes = [];
    questionAsked = false;
    document.getElementById("score").innerText = "0";
    document.getElementById("round-number").innerText = `1 / ${totalRounds}`;
    document.getElementById("response-time").innerText = "0";
    document.getElementById("continue-btn").classList.add("hidden");
    setInitialPosition();
    //document.getElementById("start-btn").classList.remove("hidden");
}

// End the current round and stop the ball movement
function endRound(){
    isGameRunning = false;
    cancelAnimationFrame(animationFrameId);
}

function endGame(){
    document.getElementById("continue-btn").classList.add("hidden");
    document.getElementById("score-screen").classList.remove("hidden");
    document.getElementById("final-score").innerText = `Your Final Score: ${score} / ${totalRounds}`;
    document.getElementById("reset-btn").classList.remove("hidden");
}

// Start a new round if possible or reset the game if all rounds are completed
function startNewRound(){
    if(currentRound < totalRounds -1 && bounceTimes.length > 0){
        enableButtons();
        currentRound++;
        bounceCount = 0;
        bounceTimes = [];
        questionAsked = false;
        isGameRunning = true;
        document.getElementById("continue-btn").classList.add("hidden")
        document.getElementById("round-number").innerText = `${currentRound + 1}/ ${totalRounds}`;
        setInitialPosition();
        moveBall();
    } else {
        endGame(); 
    }
}
// Highlight correct answer
function highlightCorrectAnswer(correctAnswer) {
    document.querySelectorAll("#keyboard button").forEach((button) => {
        let buttonText = button.textContent.trim().toLowerCase();
        if (buttonText === correctAnswer.toLowerCase()) {
            button.classList.add("correct-answer");
        }
    });
    setTimeout(() => {
        document.querySelectorAll("#keyboard button").forEach((button) => {
            button.classList.remove("correct-answer");
        });
    }, 1500);
}

// Disable the answer buttons during the question period
function disableButtons(){
    const buttons = document.querySelectorAll('#keyboard button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Enable the answer buttons once the question is asked
function enableButtons(){
    const buttons = document.querySelectorAll('#keyboard button');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// Event listeners for the game UI elements
document.addEventListener('DOMContentLoaded', () => {
    ball = document.getElementById("ball");
    const fullscreenButton = document.getElementById("fullscreen-btn");
    const helpButton = document.getElementById("help-btn");
    const closeButton = document.getElementById("close-btn");
    const exitFsButton = document.getElementById("exitFs-btn");
    fullscreenButton.addEventListener("click", () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }    
    });
    exitFsButton.addEventListener("click", () => {
        if(document.fullscreenElement){
            document.exitFullscreen();
        }
    })
    function isInFullScreen() {
        return document.fullscreenElement;
    }
    function toggleFullscreenButtonVisibility() {
        if (isInFullScreen()) {
            fullscreenButton.style.display = "none";
            exitFsButton.style.display = "inline-block";
        } else {
            fullscreenButton.style.display = "inline-block";
            exitFsButton.style.display = "none";
        }
    }
    helpButton.addEventListener("click", function() {
        document.getElementById("instructions-modal").style.display = "flex";
    });

    closeButton.addEventListener("click", function() {
        document.getElementById("instructions-modal").style.display = "none";
    });
    document.addEventListener('fullscreenchange', toggleFullscreenButtonVisibility);
    toggleFullscreenButtonVisibility();
    document.getElementById("reset-btn").addEventListener("click", () => {
        document.getElementById("start-btn").classList.remove("hidden");
        resetGame();
    });
});
