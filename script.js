const ball = document.getElementById("ball");
let ballX = window.innerWidth / 2 - ball.offsetWidth / 2;
let ballY = window.innerHeight / 2 - ball.offsetHeight / 2;
let ballDirectionX = Math.random() < 0.5 ? 1 : -1;
let ballDirectionY = Math.random() < 0.5 ? 1 : -1;

let bounceCount = 0;
let questionAsked = false;
let bounceTimes = [];

//Settings
const ballSpeed = 10;
const totalRounds = 3;
const bouncesPerRound = 5;
const questionBounceIndex = 1;
//settings

let score =0;
let currentRound = 1;
let totalPossibleScore = totalRounds;
let startTime;
let responseTime;

function setInitialPosition() {
    ball.style.left =`${ballX}px`;
    ball.style.top = `${ballY}px`;
}
function moveBall() {
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

    requestAnimationFrame(moveBall);
}
function recordBounce(wall) {
    bounceCount++;
    bounceTimes.push(wall);
    if(bounceCount === questionBounceIndex && !questionAsked) {
        askQuestion();
    }
    if(bounceCount === bouncesPerRound){
        endRound();
    }
}
function askQuestion() {
    questionAsked = true;
    startTime = Date.now();
    const questionText = `Which wall did the ball bounce off on the ${questionBounceIndex}th bounce?`;
    setTimeout(() => {
        const answer = prompt(questionText + " (Enter 'left' , 'right' , 'bottom' , 'top')");
        responseTime = (Date.now() - startTime) / 1000;
        checkAnswer(answer);
    }, 100);
}
function checkAnswer(answer){
    const correctAnswer = bounceTimes[questionBounceIndex - 1];
    if(answer === 'left' || answer === 'right' || answer === 'bottom' || answer === 'top') {
        const isCorrect = answer.toLowerCase() === correctAnswer;
        if(isCorrect) {
            score++;
        }
        console.log(`Round ${currentRound}: Answer was ${isCorrect ? 'correct' : 'incorrect'}`);
        console.log(`Time taken to answer: ${responseTime} seconds`);
       
    } else {
        console.log(`Round ${currentRound}: Answer was ${correctAnswer}`);
        console.log(`Time taken to answer: ${responseTime} seconds`);
    }
}
function endRound(){
    console.log(`Round ${currentRound} finished!`)
    console.log(`Score so far: ${score}/${totalPossibleScore}`);

    if (currentRound < totalRounds) {
        setTimeout(startNewRound, 2000);
    } else {
        console.log(`Game Over! Final Score: ${score}/${totalPossibleScore}`);
    }
}
function startNewRound(){
    currentRound++;
    bounceCount = 0;
    bounceTimes = [];
    questionAsked = false;
    
    ballX = window.innerWidth / 2 - ball.offsetWidth / 2;
    ballY = window.innerHeight / 2 - ball.offsetHeight / 2;
    
    setInitialPosition();
    
}

//setInitialPosition();
moveBall();