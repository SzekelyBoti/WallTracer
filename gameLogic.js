//Settings
// Game Configuration: defines different rounds with bounce counts, the index for the question, and ball speed
// For example :
// bounces: 2 - ball will bounce 2 times that round , 
// questionBounceIndex: 1 - after the bounces finish the question will be asked about the 1st wall the ball touches ,
// ballSpeed: 5 - this controls the speed the ball travels at .
// To add more rounds simply add another object to the array in this format : {bounces: nr, questionBounceIndex: nr, ballSpeed: nr},
// Game Configuration (remain in gameLogic)
const gameConfig = {
    rounds: [
        {bounces: 2, questionBounceIndex: 1, ballSpeed: 5},
        {bounces: 6, questionBounceIndex: 3, ballSpeed: 5},
        {bounces: 5, questionBounceIndex: 2, ballSpeed: 5},
    ],
};
let ball, ballX, ballY, startTime, responseTime, animationFrameId;
let ballDirectionX = Math.random() < 0.5 ? 1 : -1;
let ballDirectionY = Math.random() < 0.5 ? 1 : -1;
let bounceCount = 0;
let questionAsked = false;
let bounceTimes = [];
let isGameRunning = false;
let totalRounds = gameConfig.rounds.length;
let score = 0;
let currentRound = 0;

function setInitialPosition(ball) {
    ballX = window.innerWidth / 2 - ball.offsetWidth / 2;
    ballY = window.innerHeight / 2 - ball.offsetHeight / 2;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}
function moveBall(ball) {
    if (!isGameRunning) return;

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
        recordBounce('top');
    }
    ballX += ballDirectionX * gameConfig.rounds[currentRound].ballSpeed;
    ballY += ballDirectionY * gameConfig.rounds[currentRound].ballSpeed;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    animationFrameId = requestAnimationFrame(() => moveBall(ball));
}
function recordBounce(wall) {
    bounceCount++;
    bounceTimes.push(wall);
    const currentRoundConfig = gameConfig.rounds[currentRound];
    if (bounceCount === currentRoundConfig.bounces && !questionAsked) {
        askQuestion(currentRoundConfig.questionBounceIndex);
        endRound();
    }
}
function askQuestion(questionBounceIndex) {
    questionAsked = true;
    startTime = Date.now();
    const questionText = `Which wall did the ball hit on bounce number ${questionBounceIndex}?`;
    showQuestion(questionText);
}
function selectAnswer(answer) {
    disableButtons();
    responseTime = (Date.now() - startTime) / 1000;
    checkAnswer(answer);
    setTimeout(() => {
        hideElement("question-container");
        showElement("continue-btn");
        enableButtons();
    }, 1500);
}
function checkAnswer(answer) {
    const correctAnswer = bounceTimes[gameConfig.rounds[currentRound].questionBounceIndex - 1];
    highlightCorrectAnswer(correctAnswer);
    if (answer === correctAnswer) {
        score++;
    }
    updateScore(score);
    updateResponseTime(responseTime);
}
function startGame() {
    updateRoundNumber(0, totalRounds);
    isGameRunning = true;
    resetGame();
    hideElement("continue-btn");
    hideElement("start-btn");
    moveBall(document.getElementById("ball"));
}
function resetGame() {
    score = 0;
    currentRound = 0;
    bounceCount = 0;
    bounceTimes = [];
    questionAsked = false;
    updateScore(0);
    updateRoundNumber(currentRound, totalRounds);
    updateResponseTime(0);
    hideElement("continue-btn");
    hideElement("score-screen");
    showElement("start-btn");
    setInitialPosition(document.getElementById("ball"));
}
function endRound() {
    isGameRunning = false;
    cancelAnimationFrame(animationFrameId);
}
function endGame() {
    hideElement("continue-btn");
    showFinalScore(score);
    showElement("reset-btn");
}
function startNewRound() {
    if (currentRound < totalRounds - 1 && bounceTimes.length > 0) {
        currentRound++;
        bounceCount = 0;
        bounceTimes = [];
        questionAsked = false;
        isGameRunning = true;
        hideElement("continue-btn");
        updateRoundNumber(currentRound, totalRounds);
        setInitialPosition(document.getElementById("ball"));
        moveBall(document.getElementById("ball"));
    } else {
        endGame();
    }
}





