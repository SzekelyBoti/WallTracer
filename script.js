const ball = document.getElementById("ball");
let ballX, ballY;
let ballDirectionX = Math.random() < 0.5 ? 1 : -1;
let ballDirectionY = Math.random() < 0.5 ? 1 : -1;

let bounceCount = 0;
let questionAsked = false;
let bounceTimes = [];
let isGameRunning = false;

//Settings
const ballSpeed = 10;
const totalRounds = 3;
const bouncesPerRound = 5;
const questionBounceIndex = 2;
//settings

let score =0;
let currentRound = 1;
let startTime, responseTime;
let animationFrameId;
function setInitialPosition() {
    ballX = window.innerWidth / 2 - ball.offsetWidth / 2;
    ballY = window.innerHeight / 2 - ball.offsetHeight / 2;
    
    ball.style.left =`${ballX}px`;
    ball.style.top = `${ballY}px`;
}
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
    ballX += ballDirectionX * ballSpeed;
    ballY += ballDirectionY * ballSpeed;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    animationFrameId = requestAnimationFrame(moveBall);
}
function recordBounce(wall) {
    bounceCount++;
    bounceTimes.push(wall);
    if(bounceCount === bouncesPerRound && !questionAsked) {
        askQuestion();
        endRound();
    }
}
function askQuestion() {
    questionAsked = true;
    startTime = Date.now();
    document.getElementById("question-text").innerText = `Which wall did the ball touch on bounce nr ${questionBounceIndex}?`;
    document.getElementById("question-container").classList.remove("hidden");
}
function selectAnswer(answer){
    disableButtons();
    responseTime = (Date.now() - startTime) / 1000;
    checkAnswer(answer);
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("continue-btn").classList.remove("hidden");
}
function checkAnswer(answer){
    if(answer === bounceTimes[questionBounceIndex - 1]){
        score++;
    }
    document.getElementById("score").innerText = `${score} / ${totalRounds}`;
    document.getElementById("response-time").innerText = responseTime.toFixed(2);
}

function startGame(){
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("continue-btn").classList.add("hidden");
    isGameRunning = true;
    enableButtons()
    resetGame();
    moveBall();
}
function resetGame(){
    score = 0;
    currentRound = 1;
    bounceCount = 0;
    bounceTimes = [];
    questionAsked = false;
    document.getElementById("score").innerText = "0";
    document.getElementById("round-number").innerText = `1 / ${totalRounds}`;
    document.getElementById("response-time").innerText = "0";
    document.getElementById("continue-btn").classList.add("hidden");
    setInitialPosition()
}
function endRound(){
    isGameRunning = false;
    cancelAnimationFrame(animationFrameId);
}
function startNewRound(){
    if(currentRound < totalRounds && bounceTimes.length > 0){
        enableButtons();
        currentRound++;
        bounceCount = 0;
        bounceTimes = [];
        questionAsked = false;
        isGameRunning = true;
        document.getElementById("continue-btn").classList.add("hidden")
        document.getElementById("round-number").innerText = `${currentRound} / ${totalRounds}`;
        setInitialPosition();
        moveBall();
    }else{
        document.getElementById("continue-btn").classList.add("hidden");
        document.getElementById("start-btn").style.display = "inline-block";
        isGameRunning = false;
        setInitialPosition();
        resetGame();
    }
}
function disableButtons(){
    const buttons = document.querySelectorAll('#keyboard button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}
function enableButtons(){
    const buttons = document.querySelectorAll('#keyboard button');
    buttons.forEach(button => {
        button.disabled = false;
    });
}